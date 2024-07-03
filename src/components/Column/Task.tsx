import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ITask } from "../../App";

export default function Task(props: ITask) {
  const { id, title } = props;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white rounded-md w-full p-4 flex items-center justify-start gap-4 touch-none my-4"
    >
      <input type="checkbox" className="h-5 w-5" />
      <p>{title}</p>
    </div>
  );
}
