import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import * as hooks from "@hooks/index";
import {
  TasksProvider,
  useTasksContext,
} from "@context/taskContext/taskContext";

const mockTasksReturn = {
  tasks: {
    "1": {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      createdAt: new Date().toISOString(),
      completed: false,
      status: "TODO",
    },
  },
  setTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
  toggleTaskCompletion: vi.fn(),
  updateTaskStatus: vi.fn(),
};

const DummyComponent = () => {
  const { tasks } = useTasksContext();
  return <div data-testid="tasks-count">{Object.keys(tasks).length}</div>;
};

describe("TasksProvider and useTasksContext integration", () => {
  it("provides context to child components", () => {
    vi.spyOn(hooks, "useTasks").mockReturnValue(mockTasksReturn);
    render(
      <TasksProvider>
        <DummyComponent />
      </TasksProvider>
    );
    expect(screen.getByTestId("tasks-count").textContent).toBe("1");
  });

  it("throws error when useTasksContext is used outside of TasksProvider", () => {
    expect(() => render(<DummyComponent />)).toThrow(
      "useTasksContext must be used inside TasksProvider"
    );
  });
});
