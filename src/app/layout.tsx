import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/context/services/TrpcProvider";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store/store";
import StoreProvider from "@/providers/redux/StoreProvider";

const DMsans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <StoreProvider>
          <body className={DMsans.className}>{children}</body>
        </StoreProvider>
      </Providers>
    </html>
  );
}
