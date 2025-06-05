'use client';
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { ApolloProvider } from '@apollo/client';
import client from "@/lib/apolo/client";
import { ScrollProvider } from "@/contexts/ScrollContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <ScrollProvider>
          <ApolloProvider client={client}>
            {children}
          </ApolloProvider>
        </ScrollProvider>
      </body>
    </html>
  )
}
