// frontend/pages/_app.js
import { LogtoProvider } from "@logto/next";

export default function MyApp({ Component, pageProps }) {
  return (
    <LogtoProvider
      baseUrl="https://your-logto-tenant.logto.app"
      clientId="YOUR_LOGTO_CLIENT_ID"
      redirectUri={typeof window !== 'undefined' ? window.location.origin : ''}
    >
      <Component {...pageProps} />
    </LogtoProvider>
  );
}