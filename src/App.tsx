import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { FaCheckSquare } from "react-icons/fa";
import Column from "./components/Column/Column";

type TId = number | string;

export interface ITask {
  id: TId;
  title: string;
}

export default function App() {
  const [tasks, setTasks] = useState<ITask[]>([
    { id: 1, title: "Push rank ML sampai immortal" },
    { id: 2, title: "Ngoding sampai mata perih" },
    { id: 3, title: "Istirahat sampai lelah" },
  ]);

  const getTaskPosition = (id: TId) =>
    tasks.findIndex((task) => task.id === id);

  const addTask = (title: string) => {
    setTasks((tasks) => {
      return [
        ...tasks,
        {
          id: new Date().getTime(),
          title,
        },
      ];
    });
  };

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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center gap-3 my-5">
        <h1 className="text-3xl text-center font-bold">My Tasks</h1>
        <FaCheckSquare className="text-4xl text-green-600" />
      </div>
      <DndContext
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <Column tasks={tasks} addTask={addTask} />
      </DndContext>
    </div>
  );
}
