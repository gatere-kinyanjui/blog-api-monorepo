"use client";

import { useEffect, useState } from "react";
require("dotenv").config();

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/";
// const URL = "http://localhost:8000/posts";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch(BACKEND_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP error on reader app! Status : ${response.status}`
          );
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
        setMessage(data);
      })
      .catch((error: any) => {
        console.error("Error fetching data on the reader app: ", error);
        setMessage("Failed to load data from backend app");
      });
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Blog Reader App
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        {message}
      </p>
      <a
        href="#"
        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      >
        Learn more
        <svg
          className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  );
}
