import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ExtendedTaskColumnProps } from "@interface/tasks/interfaces";
import { TaskColumn } from "@components/index";

vi.mock("@dnd-kit/core", () => ({
  useDroppable: () => ({ setNodeRef: vi.fn() }),
  useDraggable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: { x: 0, y: 0 },
    isDragging: false,
  }),
}));

const defaultProps: ExtendedTaskColumnProps = {
  column: { id: "col1", title: "Column 1", taskIds: ["1"] },
  tasks: {
    "1": {
      id: "1",
      title: "Task 1",
      description: "Task 1 Description",
      createdAt: "2025-02-10T00:00:00.000Z",
      completed: false,
      status: "TODO",
    },
  },
  onEdit: vi.fn(),
  onDelete: vi.fn(),
  filterDate: "2025-02-10",
  isCollaborator: false,
};

describe("TaskColumn Component", () => {
  it("renders column title and task card when date matches", () => {
    render(<TaskColumn {...defaultProps} />);
    expect(screen.getByText("Column 1")).toBeInTheDocument();
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("does not render task card when date does not match", () => {
    render(<TaskColumn {...{ ...defaultProps, filterDate: "2025-02-11" }} />);
    expect(screen.getByText("Column 1")).toBeInTheDocument();
    expect(screen.queryByRole("article")).toBeNull();
  });
});
