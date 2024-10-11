import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/NavBar";
import LeftNavBar from "./components/LeftNavBar";
import { Providers } from "./components/provider/Provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ProfileToggle from "./components/ProfileToggle";
import ProfileView from "./components/ProfileView";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Reddit",
  description: "Dive Into Anything",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NavBar />
          <div className="md:grid md:grid-flow-col bg-zinc-100 md:grid-cols-[18%_64%_18%]">
            <LeftNavBar />
            <div className=" hidden md:block h-[100vh]"></div>
            <div className="mt-20 bg-zinc-100">{children}</div>
            <ProfileView />
            <div className=" hidden md:block h-[100vh]"></div>
            <SpeedInsights />
          </div>
        </body>
      </Providers>
    </html>
  );
}
