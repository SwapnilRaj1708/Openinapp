import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoice",
};

export default async function Invoice() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="flex h-[25rem] w-full flex-col items-center justify-center pt-[4.5rem] text-[1.75rem]">
      No bills due
    </div>
  );
}
