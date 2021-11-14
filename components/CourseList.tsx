import Link from "next/link";
import React, { useEffect } from "react";

import { useCourses } from "../hooks/courses";
import PageSkeleton from "./Skeleton";

export default function CourseList() {
  const { courses, loading } = useCourses();

  return (
    <>
      {loading ? (
        <PageSkeleton />
      ) : (
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
        </div>
      )}
    </>
  );
}
