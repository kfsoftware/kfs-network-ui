import {
  useAccountBalance,
  useAssetBalance,
  usePolkadotExtension,
} from "@substra-hooks/core";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
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
            <span>
              Balance: {balancePayload?.balanceFormatted}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            {courses?.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <a className="group">
                  <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
                    <img
                      src={course.imageUrl}
                      alt={course.name}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                    <h3>{course.name}</h3>
                    {/* <p>{course.price}</p> */}
                  </div>
                  <p className="mt-1 text-sm italic text-gray-500">
                    {/* {course.description} */}
                  </p>
                </a>
              </Link>
            ))}
            {/* {products.map((product) => (
              <a key={product.id} href={product.href} className="group">
                <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                </div>
                <p className="mt-1 text-sm italic text-gray-500">
                  {product.description}
                </p>
              </a>
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
}
