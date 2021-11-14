import { ICourse } from "../hooks/courses";

/* This example requires Tailwind CSS v2.0+ */
interface ICourseHeaderProps {
  course: ICourse;
}
export default function CourseHeader({ course }: ICourseHeaderProps) {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
            COURSE
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {course.name}
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            {course.description}
          </p>
        </div>
      </div>
    </div>
  );
}
