'use client';
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { ApolloProvider } from '@apollo/client';
import client from "@/lib/apolo/client";
import { ScrollProvider } from "@/contexts/ScrollContext";
import Sidebar from "@/components/sidebar";
import Toastify from "@/components/toastify";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ScrollProvider>
          <ApolloProvider client={client}>
            <div className="flex"> <Sidebar />
              {children}</div>
          <Toastify/>
          </ApolloProvider>
        </ScrollProvider>
      </body>
    </html>
  )
}
