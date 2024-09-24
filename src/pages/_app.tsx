import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../auth/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SidebarProvider } from '../auth/SidebarContext';
import { loadStripe } from '@stripe/stripe-js';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; 




const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, 
      refetchOnWindowFocus: false, 
      refetchOnMount: true, 
      // Add other global configurations here
    },
  },
});

const stripePromise = loadStripe("pk_live_51PW1jS06HFVFBMwTmbH1pixNhHoJFa4p1BIC9dcV7ZNffCodUAtNbexeGPg5O9bO1CC5NaNk5bY42Up5eHrL3OQ900BDHT1eWN"); 

function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleStop);
    Router.events.on('routeChangeError', handleStop);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleStop);
      Router.events.off('routeChangeError', handleStop);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </SidebarProvider>
    </QueryClientProvider>
  );
}

export default App;