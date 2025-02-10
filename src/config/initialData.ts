import { Column } from "@interface/tasks/interfaces";

export const initialColumns: Record<string, Column> = {
  "column-1": {
    id: "column-1",
    title: "To Do",
    taskIds: ["task-1", "task-2"],
  },
  "column-2": {
    id: "column-2",
    title: "In Progress",
    taskIds: [],
  },
  "column-3": {
    id: "column-3",
    title: "Done",
    taskIds: ["task-3"],
  },
};