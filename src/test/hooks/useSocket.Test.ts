import { renderHook } from "@testing-library/react";
import { vi } from "vitest";

import { showToast } from "@config/collabToast";
import { useSocket } from "@hooks/index";

const fakeSocket = {
  on: vi.fn((event, callback) => {
    fakeSocket.callbacks[event] = callback;
  }),
  disconnect: vi.fn(),
  callbacks: {} as Record<string, Function>,
};

vi.mock("socket.io-client", () => ({
  io: vi.fn(() => fakeSocket),
}));

vi.mock("@config/collabToast", () => ({
  showToast: vi.fn(),
}));

describe("useSocket", () => {
  const userId = 123;
  let setCollabInvite: any;
  let setCollaborators: any;
  let setTasks: any;
  let setColumns: any;
  let handleExitCollaboration: any;
  let applyTaskMove: any;
  beforeEach(() => {
    vi.clearAllMocks();
    fakeSocket.callbacks = {};
    setCollabInvite = vi.fn();
    setCollaborators = vi.fn();
    setTasks = vi.fn();
    setColumns = vi.fn();
    handleExitCollaboration = vi.fn();
    applyTaskMove = vi.fn();
  });
  it("disconnects socket on unmount", () => {
    const { unmount } = renderHook(() =>
      useSocket({
        userId,
        setCollabInvite,
        setCollaborators,
        setTasks,
        setColumns,
        handleExitCollaboration,
        applyTaskMove,
      })
    );
    unmount();
    expect(fakeSocket.disconnect).toHaveBeenCalled();
  });
  it("handles collaborator-invite event", () => {
    renderHook(() =>
      useSocket({
        userId,
        setCollabInvite,
        setCollaborators,
        setTasks,
        setColumns,
        handleExitCollaboration,
        applyTaskMove,
      })
    );
    const data = { invite: "test" };
    fakeSocket.callbacks["collaborator-invite"](data);
    expect(setCollabInvite).toHaveBeenCalledWith(data);
  });
  it("handles collaborator-accepted event when ownerId matches", () => {
    renderHook(() =>
      useSocket({
        userId,
        setCollabInvite,
        setCollaborators,
        setTasks,
        setColumns,
        handleExitCollaboration,
        applyTaskMove,
      })
    );
    const data = {
      ownerId: userId,
      collaborator: { id: 456, email: "test@example.com", username: "" },
    };
    fakeSocket.callbacks["collaborator-accepted"](data);
    const updater = setCollaborators.mock.calls[0][0];
    const result = updater([]);
    expect(result).toEqual([{ id: "456", name: "test@example.com" }]);
  });
  it("handles task-created event", () => {
    renderHook(() =>
      useSocket({
        userId,
        setCollabInvite,
        setCollaborators,
        setTasks,
        setColumns,
        handleExitCollaboration,
        applyTaskMove,
      })
    );
    const createdTask = {
      id: 5,
      title: "New Task",
      description: "Task description",
      status: "TODO",
      completed: undefined,
      createdAt: "2025-02-10",
    };
    fakeSocket.callbacks["task-created"](createdTask);
    const tasksUpdater = setTasks.mock.calls[0][0];
    const newTasks = tasksUpdater({});
    expect(newTasks).toHaveProperty("5", {
      ...createdTask,
      id: "5",
      completed: false,
    });
    const columnsUpdater = setColumns.mock.calls[0][0];
    const newColumns = columnsUpdater({
      "column-1": { taskIds: [] },
      "column-2": { taskIds: [] },
      "column-3": { taskIds: [] },
    });
    expect(newColumns["column-1"].taskIds).toContain("5");
    expect(showToast).toHaveBeenCalledWith(
      "success",
      "New task created: New Task"
    );
  });
  it("handles task-updated event", () => {
    renderHook(() =>
      useSocket({
        userId,
        setCollabInvite,
        setCollaborators,
        setTasks,
        setColumns,
        handleExitCollaboration,
        applyTaskMove,
      })
    );
    const updatedTask = {
      id: 7,
      title: "Updated Task",
      description: "Updated description",
      status: "DONE",
      createdAt: "2025-02-10",
    };
    fakeSocket.callbacks["task-updated"](updatedTask);
    const tasksUpdater = setTasks.mock.calls[0][0];
    const newTasks = tasksUpdater({});
    expect(newTasks).toHaveProperty("7", {
      ...updatedTask,
      id: "7",
      completed: true,
    });
    const columnsUpdater = setColumns.mock.calls[0][0];
    const initialColumns = {
      "column-1": { id: "column-1", taskIds: [] },
      "column-2": { id: "column-2", taskIds: [] },
      "column-3": { id: "column-3", taskIds: [] },
    };
    const newColumns = columnsUpdater(initialColumns);
    expect(newColumns["column-3"].taskIds).toContain("7");
  });
  it("handles task-deleted event", () => {
    renderHook(() =>
      useSocket({
        userId,
        setCollabInvite,
        setCollaborators,
        setTasks,
        setColumns,
        handleExitCollaboration,
        applyTaskMove,
      })
    );
    fakeSocket.callbacks["task-deleted"]({ id: 10 });
    const tasksUpdater = setTasks.mock.calls[0][0];
    const newTasks = tasksUpdater({ "10": { id: "10" } });
    expect(newTasks).not.toHaveProperty("10");
    const columnsUpdater = setColumns.mock.calls[0][0];
    const initialColumns = { col1: { taskIds: ["10", "11"] } };
    const newColumns = columnsUpdater(initialColumns);
    expect(newColumns["col1"].taskIds).not.toContain("10");
  });
  it("handles collaboration-revoked event", () => {
    renderHook(() =>
      useSocket({
        userId,
        setCollabInvite,
        setCollaborators,
        setTasks,
        setColumns,
        handleExitCollaboration,
        applyTaskMove,
      })
    );
    fakeSocket.callbacks["collaboration-revoked"]();
    expect(handleExitCollaboration).toHaveBeenCalled();
  });
  it("handles collaborator-removed event", () => {
    renderHook(() =>
      useSocket({
        userId,
        setCollabInvite,
        setCollaborators,
        setTasks,
        setColumns,
        handleExitCollaboration,
        applyTaskMove,
      })
    );
    setCollaborators.mockReturnValue([{ id: "100" }, { id: "200" }]);
    fakeSocket.callbacks["collaborator-removed"]({ collaboratorId: "100" });
    const updater = setCollaborators.mock.calls[0][0];
    const result = updater([{ id: "100" }, { id: "200" }]);
    expect(result).toEqual([{ id: "200" }]);
  });
  it("handles task-moved event when senderId differs", () => {
    renderHook(() =>
      useSocket({
        userId,
        setCollabInvite,
        setCollaborators,
        setTasks,
        setColumns,
        handleExitCollaboration,
        applyTaskMove,
      })
    );
    const data = {
      senderId: "999",
      taskId: "15",
      sourceColumnId: "colA",
      destinationColumnId: "colB",
      sourceIndex: 0,
      destinationIndex: 1,
      newStatus: "IN_PROGRESS",
    };
    fakeSocket.callbacks["task-moved"](data);
    expect(applyTaskMove).toHaveBeenCalledWith(
      data.taskId,
      data.sourceColumnId,
      data.destinationColumnId,
      data.sourceIndex,
      data.destinationIndex,
      data.newStatus
    );
  });
  it("does not call applyTaskMove when senderId matches", () => {
    renderHook(() =>
      useSocket({
        userId,
        setCollabInvite,
        setCollaborators,
        setTasks,
        setColumns,
        handleExitCollaboration,
        applyTaskMove,
      })
    );
    const data = {
      senderId: userId,
      taskId: "15",
      sourceColumnId: "colA",
      destinationColumnId: "colB",
      sourceIndex: 0,
      destinationIndex: 1,
      newStatus: "IN_PROGRESS",
    };
    fakeSocket.callbacks["task-moved"](data);
    expect(applyTaskMove).not.toHaveBeenCalled();
  });
});
