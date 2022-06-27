import { useNavigate, useParams } from "react-router-dom";
import { useGetLessonsQuery } from "../graphql/schema";
import { Lesson } from "./Lesson";

export function Sidebar() {
  const { data } = useGetLessonsQuery();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  if (!data) {
    return (
      <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
        <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
          Cronograma de Aulas
        </span>
      </aside>
    );
  }

  const { slug: slugFirstLesson } = data.lessons[0];

  if (!slug) navigate(`/event/lesson/${slugFirstLesson}`);

  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de Aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map((lesson) => {
          return (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              slug={lesson.slug}
              avaliableAt={new Date(lesson.availableAt)}
              type={lesson.lessonType}
            />
          );
        })}
      </div>
    </aside>
  );
}
