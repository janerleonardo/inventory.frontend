import type { Metadata } from "next";

import { Header } from "app/components/shared/Header";
import { Footer } from "app/components/shared/Fooder";
import { Menu } from "app/components/shared/Menu";
import  "./global.modules.css";



export const metadata: Metadata = {
  title: "Inventory  System",
  description: "Smart inventories, efficient businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
    <html lang="en">
      <body>
        <Header />

        <div className="layout-wrapper">
          <Menu />
          <main className="content">{children}</main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
