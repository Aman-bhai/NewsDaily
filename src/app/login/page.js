

"use client";

import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import PopUp from "../components/PopUp";
import { useRouter } from 'next/navigation';
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logInProgress, setLogInProgress] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggedIn(false);
    setLogInProgress(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error("Login error:", result.error);
      setLogInProgress(false);
      return;
    }

    setLoggedIn(true);
    setLogInProgress(false);
    router.push("/");
  };

  return (
    <>
      {status === "authenticated" && loggedIn ? (
        <PopUp  title="Already Logged In!" text="Go To HomePage" link="/" linkText="Click" />
      ) : (
        <div className="min-h-screen bg-gray-200 dark:bg-gray-800 dark:text-gray-300 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-300">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 max-w dark:text-gray-400">
              {" "}Or
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 pl-1 dark:text-gray-300 dark:hover:text-gray-100 ">
                create an account
              </Link>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white dark:bg-gray-400 py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      disabled={logInProgress}
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      disabled={logInProgress}
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={logInProgress}
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm mb-2">
                    <span className="px-2 bg-gray-100 dark:bg-gray-400 text-gray-500 dark:text-gray-700">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                  >
                    <div className="flex items-center justify-center">
                      <FaGoogle />
                      <span className="ml-2">Google</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;

