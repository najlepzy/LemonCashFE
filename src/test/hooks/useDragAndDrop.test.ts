import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import type { DragEndEvent } from "@dnd-kit/core";
import { useDragAndDrop } from "@hooks/index";

describe("useDragAndDrop", () => {
  let updateTaskStatus: any,
    reorderWithinColumn: any,
    moveTaskBetweenColumns: any,
    fakeSocket: any;
  const senderId = 999;
  beforeEach(() => {
    updateTaskStatus = vi.fn();
    reorderWithinColumn = vi.fn();
    moveTaskBetweenColumns = vi.fn();
    fakeSocket = { emit: vi.fn() };
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("calls updateTaskStatus and reorderWithinColumn when same column", () => {
    const event = {
      active: {
        id: "task1",
        data: { current: { droppableId: "column-1", index: 0 } },
      },
      over: { data: { current: { droppableId: "column-1", index: 2 } } },
    } as unknown as DragEndEvent;
    const { result } = renderHook(() =>
      useDragAndDrop({
        updateTaskStatus,
        reorderWithinColumn,
        moveTaskBetweenColumns,
        socket: fakeSocket,
        senderId,
      })
    );
    result.current.onDragEnd(event);
    expect(updateTaskStatus).toHaveBeenCalledWith("task1", "TODO");
    expect(reorderWithinColumn).toHaveBeenCalledWith("column-1", 0, 2, "task1");
    expect(fakeSocket.emit).toHaveBeenCalledWith("task-moved", {
      taskId: "task1",
      sourceColumnId: "column-1",
      destinationColumnId: "column-1",
      sourceIndex: 0,
      destinationIndex: 2,
      newStatus: "TODO",
      senderId,
    });
    const scrollIntoViewMock = vi.fn();
    vi.spyOn(document, "getElementById").mockReturnValue({
      scrollIntoView: scrollIntoViewMock,
    } as unknown as HTMLElement);
    vi.advanceTimersByTime(100);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "center",
    });
  });
  it("calls updateTaskStatus and moveTaskBetweenColumns when different columns", () => {
    const event = {
      active: {
        id: "task2",
        data: { current: { droppableId: "column-1", index: 1 } },
      },
      over: { data: { current: { droppableId: "column-2", index: 0 } } },
    } as unknown as DragEndEvent;
    const { result } = renderHook(() =>
      useDragAndDrop({
        updateTaskStatus,
        reorderWithinColumn,
        moveTaskBetweenColumns,
        socket: fakeSocket,
        senderId,
      })
    );
    result.current.onDragEnd(event);
    expect(updateTaskStatus).toHaveBeenCalledWith("task2", "IN_PROGRESS");
    expect(moveTaskBetweenColumns).toHaveBeenCalledWith(
      "column-1",
      "column-2",
      1,
      0,
      "task2"
    );
    expect(fakeSocket.emit).toHaveBeenCalledWith("task-moved", {
      taskId: "task2",
      sourceColumnId: "column-1",
      destinationColumnId: "column-2",
      sourceIndex: 1,
      destinationIndex: 0,
      newStatus: "IN_PROGRESS",
      senderId,
    });
  });
  it("does nothing if destination is invalid", () => {
    const event = {
      active: {
        id: "task3",
        data: { current: { droppableId: "column-1", index: 0 } },
      },
      over: null,
    } as unknown as DragEndEvent;
    const { result } = renderHook(() =>
      useDragAndDrop({
        updateTaskStatus,
        reorderWithinColumn,
        moveTaskBetweenColumns,
        socket: fakeSocket,
        senderId,
      })
    );
    result.current.onDragEnd(event);
    expect(updateTaskStatus).not.toHaveBeenCalled();
    expect(reorderWithinColumn).not.toHaveBeenCalled();
    expect(moveTaskBetweenColumns).not.toHaveBeenCalled();
    expect(fakeSocket.emit).not.toHaveBeenCalled();
  });
});
