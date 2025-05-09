import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "TailAdmin",
  description: "Admin Dashboard Template",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
