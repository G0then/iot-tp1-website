import Navbar from "@/components/Navbar/Navbar";
import { ToastNotification } from "@/components/Notification/Notification";
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "IOT Platform | UAlg",
  description: "IOT Platform by UAlg",
  icons: {
    icon: "/ualgIcon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="IOT Platform | UAlg" />
        <link href="/ualgIcon.png" rel="icon" />
      </head>
      <body>
        {/* <Providers> */}
        <Navbar />
        {children}
        {/* </Providers> */}
        <ToastNotification />
      </body>
    </html>
  );
}
