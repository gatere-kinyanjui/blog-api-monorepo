"use client";

import { useEffect, useState } from "react";
require("dotenv").config();

interface IPost {
  id: number;
  title: string;
  content: string;
  published: boolean;
  author_id: number;
  created_at: Date;
  updated_at: Date;
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/posts";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>();

  useEffect(() => {
    fetch(BACKEND_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP error on reader app! Status : ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((error: any) => {
        console.error("Error fetching data on the reader app: ", error);
        // setPosts("Failed to load data from backend app");
      });
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-black dark:text-white">
        Blog Reader App
      </h1>
      <>
        {posts ? (
          <>
            {posts.map((post) => {
              return (
                <div key={post.id}>
                  <h3>{post.title}</h3>
                  <p className="mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                    {post.content}
                  </p>
                </div>
              );
            })}
          </>
        ) : (
          <p className="mb-6 text-lg font-normal text-red-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Failed to load posts from backend app!
          </p>
        )}
      </>

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
