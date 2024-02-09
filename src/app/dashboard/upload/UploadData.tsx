"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import excel from "../../../../public/excel.png";
import Papa from "papaparse";
import { MdOutlineFileUpload } from "react-icons/md";
import Spinner from "@/components/spinner";
import RowData from "./RowData";

export default function UploadData() {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const acceptableFileTypes =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv";

  const handleClick = () => {
    if (ref.current) {
      ref.current.click();
    }
  };
  const handleFileChange = (e: any) => {
    // check file type
    if (
      e.target.files[0].type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      e.target.files[0].type !== "application/vnd.ms-excel" &&
      e.target.files[0].type !== ".csv" &&
      e.target.files[0].type !== "text/csv"
    ) {
      removeFile();
      setError(true);
      return;
    }

    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  const handleUpload = () => {
    setLoading(true);
    setTimeout(() => {
      if (file) {
        Papa.parse(file, {
          complete: function (results: any) {
            setParsedData((prev) => [...prev, ...results.data]);
          },
        });
      }
      setLoading(false);
      removeFile();
    }, 1500);
  };

  const removeFile = () => {
    if (ref.current) ref.current.value = "";
    setFile(null);
  };

  return (
    <>
      <div
        className={`${error ? "flex" : "hidden"} absolute right-5 top-5 flex rounded bg-[rgb(250,0,51)] p-4 px-8 text-white transition-all`}
      >
        Please upload a CSV type file
      </div>
      <div className="mx-auto flex h-[23rem] w-full flex-col gap-[1.3125rem] rounded-lg bg-[var(--primary-color)] p-4 md:w-[37.25rem]">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed">
          <input
            // only accept .xlsx and .csv files
            type="file"
            name="file"
            id="fileInput"
            ref={ref}
            accept={acceptableFileTypes}
            onChange={(e) => handleFileChange(e)}
            className="hidden"
          />
          <Image src={excel} alt="Excel logo" width={36} height={36} />
          <p className="text-[var(--text-light-grey)]">
            {!file ? (
              <>
                Drop your excel sheet here or{" "}
                <span
                  onClick={() => handleClick()}
                  className="cursor-pointer text-[var(--link-color)] hover:underline"
                >
                  Browse
                </span>
              </>
            ) : file.name.length > 35 ? (
              file.name.slice(0, 35) + "..."
            ) : (
              file.name
            )}
          </p>
          {file && (
            <span
              onClick={() => removeFile()}
              className="cursor-pointer text-[var(--text-alert-color)]"
            >
              Remove
            </span>
          )}
        </div>
        <button
          onClick={() => handleUpload()}
          disabled={!file}
          className="flex h-[3.5rem] items-center justify-center gap-1 rounded-lg bg-[var(--accent-color)] text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && <Spinner />}
          {!loading && (
            <>
              <MdOutlineFileUpload className="text-xl" />
              Upload
            </>
          )}
        </button>
      </div>
      {parsedData.length > 0 && (
        <div className="mx-auto mt-[6.5rem] w-full max-w-[1065px]">
          <span className=" text-[24px] font-semibold text-[var(--text-primary-color)]">
            Uploads
          </span>
          <div className="overflow-auto">
            <div className="mt-8 w-[1065px] rounded-[.625rem] bg-[rgb(245,245,245)] px-4">
              <div className="flex flex-row flex-nowrap gap-2">
                {parsedData[0].map((item: string, index: number) => (
                  <h6
                    key={index}
                    className={`${index === 0 ? "w-8 min-w-8" : ""} ${index === 1 ? "w-[12.5rem] min-w-[12.5rem]" : ""} ${index === 2 ? "w-[10rem] min-w-[10rem]" : ""} ${index === 3 ? "w-[12rem] min-w-[12rem]" : ""} ${index === 4 ? "w-[20rem] min-w-[20rem]" : ""} flex items-start justify-center p-4 capitalize`}
                  >
                    {item}
                  </h6>
                ))}
              </div>
              {parsedData.slice(1).map((item: any, index: number) => (
                <RowData key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
