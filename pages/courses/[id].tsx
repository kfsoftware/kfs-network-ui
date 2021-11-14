import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useEffect } from "react";
import CourseDetail from "../../components/CourseDetail";
import CourseHeader from "../../components/CourseHeader";
import Header from "../../components/Header";
import PageSkeleton from "../../components/Skeleton";

import { useCourse, useCourses, useLectures } from "../../hooks/courses";

export default function CourseDetailPage() {
  const router = useRouter();
  const { id: courseId } = router.query;
  const { course, loading } = useCourse(courseId as string);
  console.log(course, loading);

  const { lectures, loading: lecturesLoading } = useLectures(
    courseId as string
  );
  return (
    <>
      <Head>
        <title>Course</title>
      </Head>
      <div className="bg-white">
        {loading || !course ? (
          <div className="max-w-2xl mx-auto lg:max-w-7xl lg:px-8">
            <PageSkeleton />
          </div>
        ) : (
          <>
            <CourseHeader course={course!} />
            <div className="max-w-2xl mx-auto lg:max-w-7xl lg:px-8">
              {lectures && <CourseDetail lectures={lectures} course={course} />}
            </div>
          </>
        )}
      </div>
    </>
  );
}
