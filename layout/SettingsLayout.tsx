"use client";
import React, { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Container from "@/components/shared/Container";
import MainBreadcrumb from "@/components/shared/MainBreadcrumb";
import { useLang } from "@/hooks/useLang";
import Animate from "@/components/shared/Animate";
import { fade, fadeDu1 } from "@/lib/animation";
import Link from "next/link";
import Ticket from "@/components/icons/Ticket";
import User from "@/components/icons/User";
import Security from "@/components/icons/Security";
import Logout from "@/components/icons/Logout";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLang();

  const menuItems = [
    {
      id: "my-tickets",
      label: "My Tickets",
      icon: <Ticket />,
      path: "/my-tickets",
    },
    {
      id: "my-info",
      label: "My Info",
      icon: <User />,
      path: "/my-info",
    },
    {
      id: "change-password",
      label: "Change Password",
      icon: <Security />,
      path: "/change-password",
    },
  ];

  const getCurrentPage = () => {
    if (pathname?.includes("/my-info")) return "my-info";
    if (pathname?.includes("/change-password")) return "change-password";
    return "my-tickets";
  };

  const currentPage = getCurrentPage();

  return (
    <div className="min-h-screen pt-28">
      <Container>
        <div className="py-6">
          <MainBreadcrumb
            page={
              currentPage === "my-info"
                ? "My Info"
                : currentPage === "change-password"
                ? "Change Password"
                : "My Tickets"
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 pb-10 pt-3">
          {/* Sidebar */}
          <Animate variants={fade}>
            <div className=" border border-neutral-800 rounded-2xl">
              {/* User Info */}
              <div className="flex items-center gap-3 border-b border-neutral-800 p-5">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-black text-xs">
                  MA
                </div>
                <div>
                  <div>Mohamed Ali</div>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="space-y-2 p-5">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;

                  console.log(currentPage, item.id);
                  console.log("isActive", isActive);

                  return (
                    <Link
                      href={`${item.path}`}
                      key={item.id}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor ${
                        isActive
                          ? "bg-neutral-950 text-white"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-950/50"
                      }`}
                    >
                      {Icon}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* Logout */}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:text-red-400 hover:bg-neutral-950/50 transition-all mt-4 cursor-pointer">
                  <Logout className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </Animate>

          {/* Main Content */}
          <Animate variants={fadeDu1}>
            <div className="border border-neutral-800 rounded-2xl px-6 py-8">

            {children}
            </div>
            </Animate>
        </div>
      </Container>
    </div>
  );
}
