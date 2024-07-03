import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ITask } from "../../App";
import Task from "./Task";

interface IColumnProps {
  tasks: ITask[];
}

export default function Column(props: IColumnProps) {
  const { tasks } = props;

  return (
    <div className="p-4 bg-slate-200 rounded-md">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} title={task.title} />
        ))}
      </SortableContext>
    </div>
  );
}
