import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import prisma from '../../../prisma_client';

const stripe = new Stripe("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", {
  apiVersion: '2024-06-20',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const buffer = async (readable: any) => {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    if (!sig) {
        return res.status(400).send('Webhook Error: Missing Stripe signature');
      }

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, "whsec_odkRvb0Rvz7GnvdFos5taMk22lswOjnQ");
    } catch (err:any) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      // For handling the initial purchase of a subscription
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;

        const customer = await stripe.customers.retrieve(customerId);
        const customerEmail = (customer as Stripe.Customer).email;

        if (customerEmail) {
          await prisma.user.update({
            where: { email: customerEmail },
            data: {
              membershipType: 'purchased',
              subscriptionStart: new Date(),
            },
          });
        }

        break;

      // For handling subscription cancellations
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        const deletedCustomerId = deletedSubscription.customer as string;

        const deletedCustomer = await stripe.customers.retrieve(deletedCustomerId);
        const deletedCustomerEmail = (deletedCustomer as Stripe.Customer).email;

        if (deletedCustomerEmail) {
          await prisma.user.update({
            where: { email: deletedCustomerEmail },
            data: {
              membershipType: 'free',
              subscriptionStart: null,
            },
          });
        }

        break;

      // For handling failed payment attempts during subscription renewals
      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        const failedCustomerId = failedInvoice.customer as string;

        const failedCustomer = await stripe.customers.retrieve(failedCustomerId);
        const failedCustomerEmail = (failedCustomer as Stripe.Customer).email;

        if (failedCustomerEmail) {
            await prisma.user.update({
            where: { email: failedCustomerEmail },
            data: {
                membershipType: 'free',
                subscriptionStart: null,
            },
            });
        }

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}