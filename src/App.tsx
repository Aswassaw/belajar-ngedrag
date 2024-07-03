import { useState } from "react";
import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { FaCheckSquare } from "react-icons/fa";
import Column from "./components/Column/Column";

type TId = number | string;

export interface ITask {
  id: TId;
  title: string;
}

export default function App() {
  const [tasks, setTasks] = useState<ITask[]>([
    { id: 1, title: "Manusia Api" },
    { id: 2, title: "Manusia Petir" },
    { id: 3, title: "Manusia Tanah" },
  ]);

  const getTaskPosition = (id: TId) =>
    tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) {
      console.log(`Active: ${active.id}, Over: ${over.id}, Sama Saja`);
      return;
    }

    if (over?.id) {
      setTasks((tasks) => {
        const originalPosition = getTaskPosition(active.id);
        const newPosition = getTaskPosition(over?.id);

        return arrayMove(tasks, originalPosition, newPosition);
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center gap-3 my-5">
        <h1 className="text-3xl text-center font-bold">My Tasks</h1>
        <FaCheckSquare className="text-4xl text-green-600" />
      </div>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}
