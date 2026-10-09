import "./globals.css";
import NavBar from "./components/NavBar";
import LeftNavBar from "./components/LeftNavBar";
import { Providers } from "./components/provider/Provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ProfileView from "./components/ProfileView";

export const metadata = {
  title: "Reddit Clone",
  description: "Professional community discussions",
};

export const viewport = {
  themeColor: "#f4f6f8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          <div className="shell grid gap-6 pb-12 pt-20 xl:grid-cols-[220px_minmax(0,1fr)_260px]">
            <aside className="hidden xl:block">
              <div className="sticky top-20">
                <LeftNavBar />
              </div>
            </aside>
            <main className="min-w-0 w-full">{children}</main>
            <aside className="hidden xl:block">
              <div className="sticky top-20 space-y-4">
                <ProfileView />
              </div>
            </aside>
          </div>
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
