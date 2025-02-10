import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import * as hooks from "@hooks/index";
import TaskManagerContent from "@components/taskManager/main/taskManagerContent";

vi.mock("@context/taskContext/taskContext", () => ({
  useTasksContext: () => ({
    tasks: {
      "1": {
        id: "1",
        title: "Test Task",
        description: "Test Desc",
        createdAt: "2025-02-10T00:00:00.000Z",
        completed: false,
        status: "TODO",
      },
    },
    createTask: vi.fn(),
    updateTask: vi.fn(),
    deleteTask: vi.fn(),
    updateTaskStatus: vi.fn(),
    setTasks: vi.fn(),
  }),
}));

vi.mock("@config/lazyLoader", () => ({
  LazyTaskModal: () => <div data-testid="lazy-task-modal" />,
  LazyDateFilter: () => <div data-testid="lazy-date-filter" />,
  LazyTaskColumn: () => <div data-testid="lazy-task-column" />,
}));

vi.mock("./taskManagerHeader", () => ({
  __esModule: true,
  default: () => (
    <header>
      <h1 className="task-manager-title">Task Manager</h1>
      <p className="task-manager-subtitle">
        Manage and organize your tasks on a drag &amp; drop board
      </p>
      <div data-testid="lazy-date-filter" />
      <div className="sticky-header">
        <button className="add-task-button">Create New Task</button>
      </div>
    </header>
  ),
}));

vi.mock("./taskBoard", () => ({
  __esModule: true,
  default: () => (
    <div className="columns-container">
      <div data-testid="lazy-task-column" />
    </div>
  ),
}));

vi.mock("@components/collab/collaboratorSection", () => ({
  __esModule: true,
  default: () => <div data-testid="collaborators-section" />,
}));

vi.mock("@hooks/index", () => ({
  useAutoFocus: vi.fn(() => ({})),
  useBackendTasks: vi.fn(() => {}),
  useCollaboratorModal: vi.fn(() => ({
    isCollaboratorModalOpen: false,
    collaboratorInput: "",
    openCollaboratorModal: vi.fn(),
    closeCollaboratorModal: vi.fn(),
    saveCollaborator: vi.fn(),
    setCollaboratorInput: vi.fn(),
  })),
  useCollaborators: vi.fn(() => ({
    collaborators: [],
    addCollaborator: vi.fn(),
    removeCollaborator: vi.fn(),
    setCollaborators: vi.fn(),
  })),
  useColumns: vi.fn(() => ({
    columns: { col1: { id: "col1", title: "Test Column", taskIds: ["1"] } },
    reorderWithinColumn: vi.fn(),
    moveTaskBetweenColumns: vi.fn(),
    addTaskToColumn: vi.fn(),
    removeTaskFromColumn: vi.fn(),
    setColumns: vi.fn(),
  })),
  useDragAndDrop: vi.fn(() => ({
    onDragEnd: vi.fn(),
  })),
  useExitCollaboration: vi.fn(() => vi.fn()),
  useInvitationActions: vi.fn(() => ({
    acceptInvite: vi.fn(),
    rejectInvite: vi.fn(),
  })),
  useLogout: vi.fn(() => vi.fn()),
  useScrollToBottom: vi.fn(() => {}),
  useSocket: vi.fn(() => ({})),
  useTaskModal: vi.fn(() => ({
    isModalOpen: false,
    isEditingTask: false,
    editTaskId: null,
    titleInput: "Test Title",
    descInput: "Test Desc",
    openModal: vi.fn(),
    closeModal: vi.fn(),
    saveTask: vi.fn(),
    setTitleInput: vi.fn(),
    setDescInput: vi.fn(),
  })),
}));

describe("TaskManagerContent Component", () => {
  it("renders header, collaborators section, board and logout button", () => {
    const { container } = render(<TaskManagerContent />);
    expect(
      screen.getByRole("heading", { name: /task manager/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("collaborators-section")).toBeInTheDocument();
    expect(container.querySelector(".columns-container")).toBeInTheDocument();
    const logoutButton = container.querySelector(".logout-button");
    expect(logoutButton).toBeInTheDocument();
  });

  it("renders lazy task modal when isModalOpen is true", () => {
    vi.spyOn(hooks, "useTaskModal").mockReturnValue({
      isModalOpen: true,
      isEditingTask: false,
      editTaskId: null,
      titleInput: "Test Title",
      descInput: "Test Desc",
      openModal: vi.fn(),
      closeModal: vi.fn(),
      saveTask: vi.fn(),
      setTitleInput: vi.fn(),
      setDescInput: vi.fn(),
    });
    render(<TaskManagerContent />);
    expect(screen.getByTestId("lazy-task-modal")).toBeInTheDocument();
  });

  it("calls logout when logout button is clicked", () => {
    const mockLogout = vi.fn();
    vi.spyOn(hooks, "useLogout").mockReturnValue(mockLogout);
    const { container } = render(<TaskManagerContent />);
    const logoutButton = container.querySelector(".logout-button");
    expect(logoutButton).toBeInTheDocument();
    if (logoutButton) fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });
});
