import prisma from "../../../prisma_client"; 
import { startOfYear, differenceInCalendarDays } from 'date-fns';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { userEmail } = req.body;

    try {
      // Fetch the user and their current contribution history
      const user = await prisma.user.findUnique({
        where: { email: userEmail },
      });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      let contributionHistory: any = user.contributionHistory || {};
      
      // Ensure we're working with local time, not UTC
      const now = new Date();
      now.setHours(0, 0, 0, 0); // Set the time to the start of the current day in local time
      
      const currentYear = now.getFullYear();

      // Calculate the day of the year (1 to 365, or 366 for leap years)
      const startOfYearLocal = startOfYear(now);
      const dayOfYear = differenceInCalendarDays(now, startOfYearLocal);

      // If there's no contribution array for the current year, initialize it
      if (!contributionHistory[currentYear]) {
        contributionHistory[currentYear] = isLeapYear(currentYear) ? Array(366).fill(0) : Array(365).fill(0);
      }

      // Increment the contribution count for today
      contributionHistory[currentYear][dayOfYear] += 1;

      // Update the user record in the database
      await prisma.user.update({
        where: { email: userEmail },
        data: { contributionHistory },
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Failed to update contribution history:', error);
      res.status(500).json({ error: 'Failed to update contribution history' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Helper function to check if a year is a leap year
const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};
