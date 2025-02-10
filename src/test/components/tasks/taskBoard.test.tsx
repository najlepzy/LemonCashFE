import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TaskBoard from "@components/taskManager/main/taskBoard";

vi.mock("@config/lazyLoader", () => ({
  LazyTaskColumn: () => <div data-testid="lazy-task-column" />,
  LazyTaskCard: () => <div data-testid="lazy-task-card" />,
}));

vi.mock("@dnd-kit/core", () => ({
  DndContext: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DragOverlay: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="drag-overlay">{children}</div>
  ),
  useDroppable: () => ({ setNodeRef: vi.fn() }),
  useDraggable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: { x: 0, y: 0 },
    isDragging: false,
  }),
}));

describe("TaskBoard Component", () => {
  const columns = {
    col1: { id: "col1", title: "Column 1", taskIds: ["1"] },
  };
  const tasks = {
    "1": {
      id: "1",
      title: "Task 1",
      description: "Task 1 Description",
      createdAt: "2025-02-10T00:00:00.000Z",
      completed: false,
      status: "TODO",
    },
  };
  const filterDate = "2025-02-10";
  const handleDragStart = vi.fn();
  const handleDragEnd = vi.fn();
  const handleOpenModal = vi.fn();
  const handleDeleteTask = vi.fn();

  it("renders lazy task columns", () => {
    render(
      <TaskBoard
        columns={columns}
        tasks={tasks}
        filterDate={filterDate}
        activeTaskId={null}
        isCollaborator={false}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        handleOpenModal={handleOpenModal}
        handleDeleteTask={handleDeleteTask}
      />
    );
    expect(screen.getAllByTestId("lazy-task-column").length).toBe(
      Object.keys(columns).length
    );
  });

  it("renders lazy task card in drag overlay when activeTaskId is set", () => {
    render(
      <TaskBoard
        columns={columns}
        tasks={tasks}
        filterDate={filterDate}
        activeTaskId="1"
        isCollaborator={false}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        handleOpenModal={handleOpenModal}
        handleDeleteTask={handleDeleteTask}
      />
    );
    expect(screen.getByTestId("lazy-task-card")).toBeInTheDocument();
  });
});
