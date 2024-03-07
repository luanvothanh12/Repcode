import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../auth/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, 
      refetchOnWindowFocus: false, 
      // Add other global configurations here
    },
  },
});

function App({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;