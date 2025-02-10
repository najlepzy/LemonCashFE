import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TASK_MANAGER_TEXT } from "@utils/constants";
import TaskManagerHeader from "@components/taskManager/main/taskManagerHeader";

vi.mock("@config/lazyLoader", () => ({
  LazyDateFilter: ({}: {
    filterDate: string;
    setFilterDate: (val: string) => void;
  }) => <div data-testid="lazy-date-filter" />,
}));

describe("TaskManagerHeader Component", () => {
  const setFilterDate = vi.fn();
  const handleOpenModal = vi.fn();
  const filterDate = "2025-02-10";

  it("renders title, subtitle and lazy date filter", () => {
    render(
      <TaskManagerHeader
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        isCollaborator={false}
        handleOpenModal={handleOpenModal}
      />
    );
    expect(screen.getByText(TASK_MANAGER_TEXT.TITLE)).toBeInTheDocument();
    expect(screen.getByText(TASK_MANAGER_TEXT.SUBTITLE)).toBeInTheDocument();
    expect(screen.getByTestId("lazy-date-filter")).toBeInTheDocument();
  });

  it("renders add task button when not collaborator", () => {
    render(
      <TaskManagerHeader
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        isCollaborator={false}
        handleOpenModal={handleOpenModal}
      />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleOpenModal).toHaveBeenCalled();
  });

  it("does not render add task button when collaborator", () => {
    render(
      <TaskManagerHeader
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        isCollaborator={true}
        handleOpenModal={handleOpenModal}
      />
    );
    expect(screen.queryByRole("button")).toBeNull();
  });
});
