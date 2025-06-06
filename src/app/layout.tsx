'use client';
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { ApolloProvider } from '@apollo/client';
import client from "@/lib/apolo/client";
import { ScrollProvider } from "@/contexts/ScrollContext";
import Sidebar from "@/components/sidebar";

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
            <div className="flex"> <Sidebar />
              {children}</div>

          </ApolloProvider>
        </ScrollProvider>
      </body>
    </html>
  )
}
