import { xxhashAsHex, blake2AsHex } from "@polkadot/util-crypto";
import { useAccountBalance, useApiProvider } from "@substra-hooks/core";
import { useEffect, useState } from "react";
export interface ICourse {
  id: string;
  name: string;
  owner: string;
  category: string;
  imageUrl: string;
  description: string;
}
export interface ILecture {
  id: string;
  name: string;
  contents: string;
}
export function useLectures(courseId: string) {
  const apiProvider = useApiProvider("local");
  const [lectures, setLectures] = useState<ILecture[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function init() {
      if (apiProvider) {
        const firstPart = `${
          xxhashAsHex("Courses", 128).substr(2) +
          xxhashAsHex("Lectures", 128).substr(2)
        }`;
        const courseIdHash = xxhashAsHex(courseId).substr(2);
        const key = `0x${firstPart + courseIdHash + courseId.substr(2)}`;
        const keys = await apiProvider.rpc.state.getKeysPaged(key, 20);
        const lectureIds: string[] = [];
        keys.forEach((item) => {
          const keyItem = item.toHuman()?.toString();
          const lectureId = `0x${keyItem?.substring(keyItem.length - 64)}`;
          lectureIds.push(lectureId);
        });
        const lectures: ILecture[] = [];
        for (const lectureId of lectureIds) {
          const lecture: any = await apiProvider.query.courses.lectures(
            courseId,
            lectureId
          );
          lectures.push({
            id: courseId,
            name: lecture.value.name.toHuman(),
            contents: lecture.value.contents.toHuman(),
          });
        }
        setLectures(lectures.sort((a, b) => a.name.localeCompare(b.name)));
        setLoading(false);
      }
    }

    init();
  }, [apiProvider, courseId]);
  return {
    lectures,
    loading,
  };
}

export function useCourse(courseId: string) {
  const apiProvider = useApiProvider("local");
  const [course, setCourse] = useState<ICourse | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function init() {
      if (apiProvider) {
        const key = `0x${
          xxhashAsHex("Courses", 128).substr(2) +
          xxhashAsHex("Courses", 128).substr(2)
        }`;
        const course: any = await apiProvider.query.courses.courses(courseId);
        setCourse({
          id: courseId,
          name: course.value.name.toHuman(),
          owner: course.value.owner.toHuman(),
          category: course.value.category.toHuman(),
          imageUrl: course.value.imageUrl.toHuman(),
          description: course.value.description.toHuman(),
        });
        setLoading(false);
      }
    }

    init();
  }, [apiProvider, courseId]);
  return {
    course,
    loading,
  };
}

export function useCourses() {
  const apiProvider = useApiProvider("local");
  const [courses, setCourses] = useState<ICourse[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      if (apiProvider) {
        const key = `0x${
          xxhashAsHex("Courses", 128).substr(2) +
          xxhashAsHex("Courses", 128).substr(2)
        }`;
        const keys = await apiProvider.rpc.state.getKeysPaged(key, 20);
        const courseIds: string[] = [];
        keys.forEach((item) => {
          const keyItem = item.toHuman()?.toString();
          const courseId = `0x${keyItem?.substring(keyItem.length - 64)}`;
          courseIds.push(courseId);
        });
        const courses: ICourse[] = [];
        for (const courseId of courseIds) {
          const course: any = await apiProvider.query.courses.courses(courseId);
          courses.push({
            id: courseId,
            name: course.value.name.toHuman(),
            owner: course.value.owner.toHuman(),
            category: course.value.category.toHuman(),
            imageUrl: course.value.imageUrl.toHuman(),
            description: course.value.description.toHuman(),
          });
        }
        setCourses(courses);
        setLoading(false);
      }
    }

    init();
  }, [apiProvider]);
  return {
    courses,
    loading,
  };
}
