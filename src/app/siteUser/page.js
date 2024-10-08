"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const SiteUserPage = () => {
  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((data) => {
        setUser(data);
      });
    });
  }, []);

  const [User, setUser] = useState([]);

  return (
    <>
      <section className="py-6 bg-gray-100 text-gray-800  dark:bg-gray-800 dark:text-gray-300 min-h-screen">
        <div className="container flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
          <h1 className="text-4xl font-bold leading-none text-center sm:text-5xl">
            Our Site Users
          </h1>
          <p className="max-w-2xl text-center text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            suscipit iure sit enim id voluptates expedita fuga, ea eos in nam
            amet pariatur, tempore molestiae a harum debitis aliquid quidem?
          </p>
          <div className="flex flex-row flex-wrap-reverse justify-center">
            {User.map((item, index) => (
              <div
                className="flex flex-col justify-center m-8 text-center"
                key={index}
              >
                <Image
                  alt=""
                  className="self-center flex-shrink-0 w-24 h-24 mb-4 rounded-full dark:bg-blue-500"
                  src={`https://avatar.iran.liara.run/username?username=${encodeURIComponent(
                    item.email
                  )}`}
                  width={96}
                  height={96}
                  style={{ objectFit: "cover" }}
                />
                <p className="text-xl font-semibold leading-tight">
                  {item.name ? item.name : "N/A"}
                </p>
                <p className="dark:dark:text-gray-400 text-gray-600">
                  {" "}
                  {item.email ? item.email : "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SiteUserPage;
