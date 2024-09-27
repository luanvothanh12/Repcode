import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../auth/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SidebarProvider } from '../auth/SidebarContext';
import { loadStripe } from '@stripe/stripe-js';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; 
import posthog from 'posthog-js'; 
import { PostHogProvider } from 'posthog-js/react'; 

NProgress.configure({ showSpinner: false });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, 
      refetchOnWindowFocus: false, 
      refetchOnMount: true, 
    },
  },
});

const stripePromise = loadStripe("your-stripe-key-here"); 

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {

    if (typeof window !== 'undefined') {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        person_profiles: 'identified_only',
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug();
        },
      });
    }

    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleStop);
    Router.events.on('routeChangeError', handleStop);

    // Track page views with PostHog
    const handleRouteChange = (url: string) => {
      console.log(`Tracking pageview for: ${url}`); // Debug log
      posthog.capture('$pageview', { url });
    };
    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleStop);
      Router.events.off('routeChangeError', handleStop);
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AuthProvider>
          <PostHogProvider client={posthog}>
            <Component {...pageProps} />
          </PostHogProvider>
        </AuthProvider>
      </SidebarProvider>
    </QueryClientProvider>
  );
}

export default App;
