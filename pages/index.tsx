import {
  useAccountBalance,
  useAssetBalance,
  usePolkadotExtension,
} from "@substra-hooks/core";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import CourseList from "../components/CourseList";
import Header from "../components/Header";

import { useCourses } from "../hooks/courses";

export default function Example() {
  const { accounts, w3enable, w3Enabled } = usePolkadotExtension();
  console.log("ACCOUNTS", accounts);

  const balancePayload = useAccountBalance(accounts?.[0]?.address || "");
  console.log("BALANCE", balancePayload);

  useEffect(() => {
    if (!w3Enabled) {
      w3enable();
    }
  }, [w3enable, w3Enabled]);

  const { courses } = useCourses();

  return (
    <>
      <Head>
        <title>Courses</title>
      </Head>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between text-center">
            <h2 className="text-4xl mb-4 font-bold " id="products-heading">
              Courses
            </h2>
            <span>Balance: {balancePayload?.balanceFormatted}</span>
          </div>
          <CourseList />
        </div>
      </div>
    </>
  );
}
