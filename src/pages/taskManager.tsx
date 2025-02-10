import React from "react";
import { TasksProvider } from "@context/taskContext/taskContext";
import TaskManagerContent from "@components/taskManager/main/taskManagerContent";

const TaskManager: React.FC = () => {
  return (
    <TasksProvider>
      <TaskManagerContent />
    </TasksProvider>
  );
};

export default TaskManager;