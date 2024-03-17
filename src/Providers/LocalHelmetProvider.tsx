import { HelmetProvider } from "react-helmet-async";

export default function LocalHelmetProvider({ children }: any) {
  return <HelmetProvider>{children}</HelmetProvider>;
}
