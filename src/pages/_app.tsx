import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../auth/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SidebarProvider } from '../auth/SidebarContext';


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