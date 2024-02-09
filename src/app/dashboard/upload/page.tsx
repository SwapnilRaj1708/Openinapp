import UploadData from "./UploadData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload",
};

export default function Upload() {
  return (
    <div className="flex h-full w-full flex-col bg-[var(--bg-color)] p-4 pt-[4.5rem]">
      <h1 className="px-4 pb-6 text-[24px] font-semibold lg:hidden">
        Upload CSV
      </h1>
      <UploadData />
    </div>
  );
}
