import React, { createContext, useContext } from "react";

import { UseTasksReturn } from "@interface/tasks/interfaces";
import { useTasks } from "@hooks/index";

const TasksContext = createContext<UseTasksReturn | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const tasksData = useTasks();
  return (
    <TasksContext.Provider value={tasksData}>{children}</TasksContext.Provider>
  );
};

export const useTasksContext = (): UseTasksReturn => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasksContext must be used inside TasksProvider");
  }
  return context;
};