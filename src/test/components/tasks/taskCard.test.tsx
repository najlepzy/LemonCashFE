
import { TaskCard } from "@components/index";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";


vi.mock("@dnd-kit/core", () => ({
  useDraggable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: { x: 0, y: 0 },
    isDragging: false,
  }),
}));

describe("TaskCard Component", () => {
  const task = {
    id: "1",
    title: "Task 1",
    description: "Task 1 Description",
    createdAt: "2025-02-10T00:00:00.000Z",
    completed: false,
    status: "TODO",
  };
  const onEdit = vi.fn();
  const onDelete = vi.fn();
  const columnId = "col1";

  it("renders task title and description", () => {
    render(
      <TaskCard
        task={task}
        index={0}
        onEdit={onEdit}
        onDelete={onDelete}
        columnId={columnId}
        isCollaborator={false}
      />
    );
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 1 Description")).toBeInTheDocument();
  });

  it("calls onEdit and onDelete on button clicks when not collaborator", () => {
    render(
      <TaskCard
        task={task}
        index={0}
        onEdit={onEdit}
        onDelete={onDelete}
        columnId={columnId}
        isCollaborator={false}
      />
    );
    const editButton = screen.getByRole("button", {
      name: /Edit task: Task 1/i,
    });
    const deleteButton = screen.getByRole("button", {
      name: /Delete task: Task 1/i,
    });
    fireEvent.click(editButton);
    fireEvent.click(deleteButton);
    expect(onEdit).toHaveBeenCalledWith("1");
    expect(onDelete).toHaveBeenCalledWith("1", columnId);
  });

  it("does not render buttons when isCollaborator is true", () => {
    render(
      <TaskCard
        task={task}
        index={0}
        onEdit={onEdit}
        onDelete={onDelete}
        columnId={columnId}
        isCollaborator={true}
      />
    );
    expect(
      screen.queryByRole("button", { name: /Edit task: Task 1/i })
    ).toBeNull();
    expect(
      screen.queryByRole("button", { name: /Delete task: Task 1/i })
    ).toBeNull();
  });
});
