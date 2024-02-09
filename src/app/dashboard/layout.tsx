"use client";

import Image from "next/image";
import logoAccent from "../../../public/logo-accent.png";
import Link from "next/link";
import { BiSolidCalendar, BiSolidCategory } from "react-icons/bi";
import { MdInsertChart, MdNotificationsNone } from "react-icons/md";
import { HiMiniTicket } from "react-icons/hi2";
import {
  IoDocumentText,
  IoNotifications,
  IoSettingsSharp,
} from "react-icons/io5";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import userAvatar from "../../../public/user-avatar.png";
import { FiMenu } from "react-icons/fi";
import { FcCancel } from "react-icons/fc";
import { RxCross1 } from "react-icons/rx";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  if (session.status !== "loading" && !session.data?.user) {
    console.log("session at dashboard", session);
    redirect("/");
  }
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState<string>("Dashboard");
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setCurrentUrl(pathname?.split("/dashboard")[1]);
  }, [pathname]);

  useEffect(() => {
    if (currentUrl === "") {
      setHeading("Dashboard");
    } else if (currentUrl === "/upload") {
      setHeading("Upload CSV");
    } else if (currentUrl === "/invoice") {
      setHeading("Invoice");
    } else if (currentUrl === "/schedule") {
      setHeading("Schedule");
    } else if (currentUrl === "/calendar") {
      setHeading("Calendar");
    } else if (currentUrl === "/notifications") {
      setHeading("Notifications");
    } else if (currentUrl === "/setting") {
      setHeading("Settings");
    }
  }, [currentUrl]);

  let userImage: any;
  if (session.data?.user?.image) {
    userImage = session.data.user.image;
  } else {
    userImage = userAvatar;
  }

  return (
    <main className="flex h-screen">
      <nav className="fixed top-0 flex w-full flex-row flex-nowrap justify-between bg-[var(--primary-color)] lg:hidden">
        <div className="flex items-center justify-center gap-3 px-4 py-6 text-[24px] font-semibold">
          <div
            onClick={() => setToggleSidebar((prev) => !prev)}
            className="cursor-pointer"
          >
            <FiMenu />
          </div>
          <div>
            <Image
              src={logoAccent}
              alt="BASE company logo"
              width={26}
              height={26}
            />
          </div>
          <div>Base</div>
        </div>
        <div className="flex items-center justify-end gap-4 px-4 py-6 text-[24px] font-semibold">
          <Link href="/dashboard/notifications">
            <MdNotificationsNone />
          </Link>
          <div className="relative flex items-center justify-center gap-2 rounded-full">
            <Image
              onClick={() => setOpen((prev) => !prev)}
              src={userImage}
              alt="user profile picture"
              width={36}
              height={36}
              className="cursor-pointer rounded-full"
            />
            {open && (
              <div className="absolute right-1 top-12 flex items-center justify-center rounded-[.625rem] bg-[var(--primary-color)] p-4 text-[var(--text-secondary-color)] shadow hover:text-[var(--accent-color)]">
                <form action={actions.signOut}>
                  <button className="text-nowrap rounded-[.625rem] bg-slate-400 px-2 py-1 text-[1rem] text-[var(--text-primary-color)] hover:bg-[var(--accent-color)] hover:text-white">
                    Sign Out
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </nav>
      <aside
        className={`absolute ${toggleSidebar ? "left-0" : "left-[-240px]"} z-20 block h-full min-w-[13.625rem] rounded-r-[20px] bg-white shadow transition-all lg:hidden`}
      >
        <div className="flex w-full flex-row items-center justify-between gap-[1rem] px-4 py-[2.1875rem] text-[24px] font-semibold">
          <div className="flex flex-nowrap gap-2">
            <Image
              src={logoAccent}
              alt="BASE company logo"
              width={42}
              height={42}
            />
            Base
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setToggleSidebar(false)}
          >
            <RxCross1 />
          </div>
        </div>
        <ul className="text-[1rem] text-[var(--text-secondary-color)]">
          <Link href="/dashboard">
            <li
              className={`${currentUrl === "" ? "bg-gradient-to-r from-[rgb(172,169,255,.5)] to-white to-25% text-[var(--accent-color)]" : ""} mb-[.75rem] flex h-[2.5rem] flex-row items-center justify-start gap-3 px-8  hover:text-[var(--accent-color)]`}
            >
              <BiSolidCategory className="text-[1.5rem]" />
              Dashboard
            </li>
          </Link>
          <Link href="/dashboard/upload">
            <li
              className={`${currentUrl === "/upload" ? "bg-gradient-to-r from-[rgb(172,169,255,.5)] to-white to-25% text-[var(--accent-color)]" : ""} mb-[.75rem] flex h-[2.5rem] flex-row items-center justify-start gap-3 px-8  hover:text-[var(--accent-color)]`}
            >
              <MdInsertChart className="text-[1.5rem]" />
              Upload
            </li>
          </Link>
          <Link href="/dashboard/invoice">
            <li
              className={`${currentUrl === "/invoice" ? "bg-gradient-to-r from-[rgb(172,169,255,.5)] to-white to-25% text-[var(--accent-color)]" : ""} mb-[.75rem] flex h-[2.5rem] flex-row items-center justify-start gap-3 px-8  hover:text-[var(--accent-color)]`}
            >
              <HiMiniTicket className="text-[1.5rem]" />
              Invoice
            </li>
          </Link>
          <Link href="/dashboard/schedule">
            <li
              className={`${currentUrl === "/schedule" ? "bg-gradient-to-r from-[rgb(172,169,255,.5)] to-white to-25% text-[var(--accent-color)]" : ""} mb-[.75rem] flex h-[2.5rem] flex-row items-center justify-start gap-3 px-8  hover:text-[var(--accent-color)]`}
            >
              <IoDocumentText className="text-[1.5rem]" />
              Schedule
            </li>
          </Link>
          <Link href="/dashboard/calendar">
            <li
              className={`${currentUrl === "/calendar" ? "bg-gradient-to-r from-[rgb(172,169,255,.5)] to-white to-25% text-[var(--accent-color)]" : ""} mb-[.75rem] flex h-[2.5rem] flex-row items-center justify-start gap-3 px-8  hover:text-[var(--accent-color)]`}
            >
              <BiSolidCalendar className="text-[1.5rem]" />
              Calendar
            </li>
          </Link>
          <Link href="/dashboard/notifications">
            <li
              className={`${currentUrl === "/notifications" ? "bg-gradient-to-r from-[rgb(172,169,255,.5)] to-white to-25% text-[var(--accent-color)]" : ""} mb-[.75rem] flex h-[2.5rem] flex-row items-center justify-start gap-3 px-8  hover:text-[var(--accent-color)]`}
            >
              <IoNotifications className="text-[1.5rem]" />
              Notifications
            </li>
          </Link>
          <Link href="/dashboard/setting">
            <li
              className={`${currentUrl === "/setting" ? "bg-gradient-to-r from-[rgb(172,169,255,.5)] to-white to-25% text-[var(--accent-color)]" : ""} mb-[.75rem] flex h-[2.5rem] flex-row items-center justify-start gap-3 px-8  hover:text-[var(--accent-color)]`}
            >
              <IoSettingsSharp className="text-[1.5rem]" />
              Settings
            </li>
          </Link>
        </ul>
      </aside>
      <aside className="hidden min-w-[13.625rem] bg-white lg:block">
        <div className="flex w-full flex-row items-center justify-center gap-[1rem] py-[2.1875rem] text-[24px] font-semibold">
          <Image
            src={logoAccent}
            alt="BASE company logo"
            width={42}
            height={42}
          />
          Base
        </div>
        <ul className="text-[1rem] text-[var(--text-secondary-color)]">
          <Link href="/dashboard">
            <li
              className={`${currentUrl === "" ? "bg-gradient-to-r from-[rgb(172,169,255,.5)] to-white to-25% text-[var(--accent-color)]" : ""} mb-[.75rem] flex h-[2.5rem] flex-row items-center justify-start gap-3 px-8  hover:text-[var(--accent-color)]`}
            >
              <BiSolidCategory className="text-[1.5rem]" />
              Dashboard
            </li>
          </Link>
          <Link href="/dashboard/upload">
            <li
              className={`${currentUrl === "/upload" ? "bg-gradient-to-r from-[rgb(172,169,255,.5)] to-white to-25% text-[var(--accent-color)]" : ""} mb-[.75rem] flex h-[2.5rem] flex-row items-center justify-start gap-3 px-8  hover:text-[var(--accent-color)]`}
            >
              <MdInsertChart className="text-[1.5rem]" />
              Upload
            </li>
          </Link>
          <Link href="/dashboard/invoice">
            <li
              className={`${currentUrl === "/invoice" ? "bg-gradient-to-r from-[rgb(172,169,255,.5)] to-white to-25% text-[var(--accent-color)]" : ""} mb-[.75rem] flex h-[2.5rem] flex-row items-center justify-start gap-3 px-8  hover:text-[var(--accent-color)]`}
            >
              <HiMiniTicket className="text-[1.5rem]" />
              Invoice
            </li>
          </Link>
          <Link href="/dashboard/schedule">
            <li
              className={`${currentUrl === "/schedule" ? "bg-gradient-to-r from-[rgb(172,169,255,.5)] to-white to-25% text-[var(--accent-color)]" : ""} mb-[.75rem] flex h-[2.5rem] flex-row items-center justify-start gap-3 px-8  hover:text-[var(--accent-color)]`}
            >
              <IoDocumentText className="text-[1.5rem]" />
              Schedule
            </li>
          </Link>
          <Link href="/dashboard/calendar">
            <li
              className={`${currentUrl === "/calendar" ? "bg-gradient-to-r from-[rgb(172,169,255,.5)] to-white to-25% text-[var(--accent-color)]" : ""} mb-[.75rem] flex h-[2.5rem] flex-row items-center justify-start gap-3 px-8  hover:text-[var(--accent-color)]`}
            >
              <BiSolidCalendar className="text-[1.5rem]" />
              Calendar
            </li>
          </Link>
          <Link href="/dashboard/notifications">
            <li
              className={`${currentUrl === "/notifications" ? "bg-gradient-to-r from-[rgb(172,169,255,.5)] to-white to-25% text-[var(--accent-color)]" : ""} mb-[.75rem] flex h-[2.5rem] flex-row items-center justify-start gap-3 px-8  hover:text-[var(--accent-color)]`}
            >
              <IoNotifications className="text-[1.5rem]" />
              Notifications
            </li>
          </Link>
          <Link href="/dashboard/setting">
            <li
              className={`${currentUrl === "/setting" ? "bg-gradient-to-r from-[rgb(172,169,255,.5)] to-white to-25% text-[var(--accent-color)]" : ""} mb-[.75rem] flex h-[2.5rem] flex-row items-center justify-start gap-3 px-8  hover:text-[var(--accent-color)]`}
            >
              <IoSettingsSharp className="text-[1.5rem]" />
              Settings
            </li>
          </Link>
        </ul>
      </aside>
      <div className="h-full w-full">
        <nav className="flex w-full justify-between">
          <h1 className="px-4 py-6 text-[24px] font-semibold">{heading}</h1>
          <div className="flex items-center justify-end gap-4 px-4 py-6 text-[24px] font-semibold">
            <Link href="/dashboard/notifications">
              <MdNotificationsNone />
            </Link>
            <div className="relative flex items-center justify-center gap-2 rounded-full">
              <Image
                onClick={() => setOpen((prev) => !prev)}
                src={userImage}
                alt="user profile picture"
                width={36}
                height={36}
                className="cursor-pointer rounded-full"
              />
              {open && (
                <div className="absolute right-1 top-12 flex items-center justify-center rounded-[.625rem] bg-[var(--primary-color)] p-4 text-[var(--text-secondary-color)] shadow hover:text-[var(--accent-color)]">
                  <form action={actions.signOut}>
                    <button className="text-nowrap rounded-[.625rem] bg-slate-400 px-2 py-1 text-[1rem] text-[var(--text-primary-color)] hover:bg-[var(--accent-color)] hover:text-white">
                      Sign Out
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </nav>
        <section className="min-h-[calc(100%-84px)] w-full">{children}</section>
      </div>
    </main>
  );
}
