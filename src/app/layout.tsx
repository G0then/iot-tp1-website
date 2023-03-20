import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "IOT Platform | UAlg",
  description: "IOT Platform by UAlg",
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
        <meta name="description" content="Google clone created by Next js 13" />
        <link href="/ualgIcon.png" rel="icon" />
      </head>
      <body>
        {/* <Providers> */}
          <Navbar />
          {children}
        {/* </Providers> */}
      </body>
    </html>
  );
}
