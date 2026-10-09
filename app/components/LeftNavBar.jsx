"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const sections = [
  {
    title: "Browse",
    links: [
      { href: "/", label: "Home", icon: HomeOutlinedIcon },
      { href: "/feed", label: "Your feed", icon: DynamicFeedOutlinedIcon },
      { href: "/all", label: "Communities", icon: GroupsOutlinedIcon },
    ],
  },
  {
    title: "Contribute",
    links: [
      { href: "/create", label: "Create post", icon: AddCircleOutlineOutlinedIcon },
    ],
  },
];

export default function LeftNavBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(40);
    const timer = setTimeout(() => setProgress(100), 150);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <LoadingBar
        color="#ea580c"
        progress={progress}
        height={2}
        onLoaderFinished={() => setProgress(0)}
      />
      <nav className="card p-3">
        {sections.map((section) => (
          <div key={section.title} className="mb-3 last:mb-0">
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.links.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`nav-link ${active ? "nav-link-active" : ""}`}
                    >
                      <Icon sx={{ fontSize: 18 }} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </>
  );
}
