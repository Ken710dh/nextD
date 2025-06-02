'use client';
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { ApolloProvider } from '@apollo/client';
import client from "@/lib/apolo/client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
          <ApolloProvider client={client}>
            {children}
          </ApolloProvider>
      </body>
    </html>
  )
}
