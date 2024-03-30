import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

export default function UseQueryProvider({ children }: any) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
