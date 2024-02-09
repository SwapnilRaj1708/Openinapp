import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

export default function RowData({ item, index }: { item: any; index: number }) {
  const [toggleSelect, setToggleSelect] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  //   toggle toggleSelect to false when clicked outside the dropdown using a event listener
  //   useEffect(() => {
  //     if (toggleSelect) {
  //       document.addEventListener("click", () => {
  //         setToggleSelect(false);
  //       });
  //     }

  //     return () => {
  //       document.removeEventListener("click", () => {
  //         setToggleSelect(false);
  //       });
  //     };
  //   }, [toggleSelect]);

  return (
    <div
      key={index}
      className="mb-4 flex flex-row flex-nowrap gap-2 bg-[var(--primary-color)]"
    >
      {item.map((i: string, idx: number) =>
        idx !== 3 && idx !== 4 && idx !== 1 ? (
          <span
            className={`${idx === 0 ? "w-8 min-w-8" : ""} ${idx === 1 ? "w-[12.5rem] min-w-[12.5rem]" : ""} ${idx === 2 ? "w-[10rem] min-w-[10rem]" : ""} ${idx === 3 ? "w-[12rem] min-w-[12rem]" : ""} ${idx === 4 ? "w-[20rem] min-w-[20rem]" : ""} flex items-start justify-center p-4`}
            key={idx}
          >
            {i}
          </span>
        ) : idx === 3 ? (
          <div
            key={idx}
            className="relative flex w-[12rem] min-w-[12rem] items-start justify-center gap-1 p-4"
          >
            <div
              onClick={() => setToggleSelect((prev) => !prev)}
              className="flex w-fit cursor-pointer items-center justify-center gap-1 text-nowrap rounded-lg border border-solid px-3 py-1"
            >
              Select Tags
              <IoIosArrowDown className="text-[var(--text-light-grey)]" />
            </div>
            {toggleSelect && (
              <ul className="absolute top-14 z-10 flex max-h-[205px] w-[133.73px] flex-col gap-1 overflow-auto rounded-lg bg-[var(--primary-color)] p-2 shadow">
                {i.split(",").map((tag: string, index: number) => (
                  <li
                    key={index}
                    value={tag}
                    onClick={() => {
                      if (selectedTags.includes(tag)) {
                        setSelectedTags((prev) =>
                          prev.filter((item) => item !== tag),
                        );
                      } else {
                        setSelectedTags((prev) => [...prev, tag]);
                      }
                    }}
                    className="flex h-[40px] w-full cursor-pointer items-center justify-center rounded-lg bg-[rgb(245,245,245)] p-4"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : idx === 1 ? (
          <a
            href={`https://www.${i}`}
            className="flex w-[12.5rem] min-w-[12.5rem] items-start justify-start p-4 text-[var(--link-color)] hover:underline"
            key={idx}
          >
            {i}
          </a>
        ) : (
          <div
            key={idx}
            className="flex w-[20rem] min-w-[20rem] flex-wrap items-start
            justify-start gap-2 p-4 ps-2 pt-5"
          >
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="flex flex-row flex-nowrap items-center justify-center gap-1 rounded-[4px] bg-[var(--accent-color)] px-2 py-2 text-[12px] text-white"
              >
                {tag}{" "}
                <RxCross2
                  onClick={() => {
                    setSelectedTags((prev) =>
                      prev.filter((item) => item !== tag),
                    );
                  }}
                  className="cursor-pointer text-[14px]"
                />
              </span>
            ))}
          </div>
        ),
      )}
    </div>
  );
}
