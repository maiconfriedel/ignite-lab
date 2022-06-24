import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

interface LessonProps {
  title: string;
  slug: string;
  avaliableAt: Date;
  type: "live" | "class";
}

export function Lesson(props: LessonProps) {
  const isLessonAvaliable = isPast(props.avaliableAt);

  const { slug } = useParams<{ slug: string }>();

  const isActiveLesson = slug === props.slug;

  return (
    <Link
      to={isLessonAvaliable ? `/event/lesson/${props.slug}` : "#"}
      className="group"
    >
      <span className="text-gray-300">
        {format(props.avaliableAt, "EEEE' • 'd ' de 'MMMM' • 'k'h'mm", {
          locale: ptBr,
        })}
      </span>
      <div
        className={classNames(
          " rounded border border-gray-500 p-4 mt-2 ",
          { "bg-green-500": isActiveLesson },
          { "group-hover:border-green-500": isLessonAvaliable },
          { "group-hover:border-gray-400": !isLessonAvaliable }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvaliable ? (
            <span
              className={classNames(
                "text-sm font-medium flex items-center gap-2",
                { "text-blue-500": !isActiveLesson },
                { "text-white": isActiveLesson }
              )}
            >
              <CheckCircle size={20} /> Conteúdo Liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} /> Em Breve
            </span>
          )}
          <span
            className={classNames(
              "text-xs rounded px-2 py-[0.125rem] text-white border  font-bold",
              { "border-white": isActiveLesson },
              { "border-green-300": !isActiveLesson }
            )}
          >
            {props.type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>
        <strong
          className={classNames(
            "mt-5 block font-bold",
            {
              "text-white": isActiveLesson,
            },
            { "text-gray-200": !isActiveLesson }
          )}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  );
}
