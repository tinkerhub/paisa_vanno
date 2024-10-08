import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/context/services/TrpcProvider";
import StoreProvider from "@/providers/redux/StoreProvider";
import { Toaster } from "react-hot-toast";
import { PaymentProvider } from "@/providers/payment";
import { db } from "@/db";
import { ConfettieProvider } from "@/components/firstDesign/ConfettiTest";

const DMsans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TinkerHub | Donations",
  description: "Tinkerhub Donation tracking live!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const InitialPaymentData = await db.payments.findFirst({
    orderBy: {
      id: "desc",
    },
  });
  return (
    <html lang="en">
      <body className={`${DMsans.className} overflow-hidden`}>
        <ConfettieProvider>
          <Providers>
            <StoreProvider>
              <PaymentProvider InitialPaymentData={InitialPaymentData}>
                <Toaster />
                {children}
              </PaymentProvider>
            </StoreProvider>
          </Providers>
        </ConfettieProvider>
      </body>
    </html>
  );
}
