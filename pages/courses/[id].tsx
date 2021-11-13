import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useEffect } from "react";
import CourseDetail from "../../components/CourseDetail";
import CourseHeader from "../../components/CourseHeader";
import Header from "../../components/Header";

import { useCourse, useCourses, useLectures } from "../../hooks/courses";

export default function CourseDetailPage() {
  const router = useRouter();
  const { id: courseId } = router.query;
  const { course, loading } = useCourse(courseId as string);
  console.log(course, loading);

  const { lectures, loading: lecturesLoading } = useLectures(
    courseId as string
  );
  return loading || !course ? (
    <p>Loading..</p>
  ) : (
    <>
      <Head>
        <title>Course</title>
      </Head>
      <div className="bg-white">
        {/* <Header /> */}
        <CourseHeader course={course!} />
        <div className="max-w-2xl mx-auto lg:max-w-7xl lg:px-8">
          {lectures && <CourseDetail lectures={lectures} course={course} />}
          {/* <h2 id="products-heading" className="sr-only">
            Course
          </h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            Name: {course?.name} <br />
            Owner: {course?.owner} <br />
            Category: {course?.category} <br />
            <img
              src={course?.imageUrl}
              alt={course?.name}
              className="w-full h-full object-center object-cover group-hover:opacity-75"
            />
            {lecturesLoading ? (
              <p>Loading lectures...</p>
            ) : (
              <ul>
                {lectures?.map((lecture) => (
                  <li key={lecture.id}>{lecture.name}</li>
                ))}
              </ul>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}
