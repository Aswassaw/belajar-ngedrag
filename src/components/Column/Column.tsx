import { useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ITask } from "../../App";
import Task from "./Task";

interface IColumnProps {
  addTask: (title: string) => void;
  tasks: ITask[];
}

export default function Column(props: IColumnProps) {
  const { tasks, addTask } = props;

  const [input, setInput] = useState("");

  return (
    <div className="p-4 bg-slate-200 rounded-md max-w-2xl mx-auto">
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="rounded-md"
        />
        <button
          onClick={() => {
            if (input.trim()) {
              addTask(input);
              setInput("");
            } else {
              alert("Isi Dulu!");
            }
          }}
          className="bg-white py-1 px-2 rounded-md"
        >
          Add Task
        </button>
      </div>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} title={task.title} />
        ))}
      </SortableContext>
    </div>
  );
}
