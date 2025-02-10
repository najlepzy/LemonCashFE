import { render, screen } from "@testing-library/react";
import TaskManager from "@pages/taskManager";

vi.mock("@components/taskManager/main/taskManagerContent", () => {
  return {
    default: () => <div>Task Manager Content</div>,
  };
});

describe("TaskManager", () => {
  it("renders TaskManagerContent within TasksProvider", () => {
    render(<TaskManager />);
    expect(screen.getByText("Task Manager Content")).toBeTruthy();
  });
});