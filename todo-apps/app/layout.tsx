"use client";
import { Nunito } from "next/font/google";
import Particles from "@/components/ui/particle-background";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

const nunito = Nunito({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} relative`}>
        <QueryClientProvider client={queryClient}>
          {children}
          <Particles
            className="absolute -z-50 inset-0 w-full h-full"
            quantity={500}
            ease={80}
            color="#000"
            refresh
          />
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  );
}
