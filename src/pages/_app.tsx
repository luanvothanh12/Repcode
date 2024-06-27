import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../auth/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SidebarProvider } from '../auth/SidebarContext';
import { loadStripe } from '@stripe/stripe-js';



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