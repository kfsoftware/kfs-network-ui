import { ICourse, ILecture } from "../hooks/courses";

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: "Calvin Hawkins",
    email: "calvin.hawkins@example.com",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Kristen Ramos",
    email: "kristen.ramos@example.com",
    image:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Ted Fox",
    email: "ted.fox@example.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
interface ICourseDetailProps {
  course: ICourse;
  lectures: ILecture[];
}
export default function CourseDetail({ course, lectures }: ICourseDetailProps) {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {lectures.map((lecture) => (
        <li key={lecture.id} className="py-4 flex">
          {/* <img className="h-10 w-10 rounded-full" src={lecture.image} alt="" /> */}
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{lecture.name}</p>
            {/* <p className="text-sm text-gray-500">{lecture.}</p> */}
          </div>
        </li>
      ))}
    </ul>
  );
}
