import { renderHook, act } from "@testing-library/react";
import { initialColumns } from "@config/initialData";
import { useColumns } from "@hooks/index";

describe("useColumns", () => {
  it("reorders tasks within a column", () => {
    const { result } = renderHook(() => useColumns(initialColumns));
    act(() => {
      result.current.reorderWithinColumn("column-1", 0, 1, "task1");
    });
    expect(result.current.columns["column-1"].taskIds).toEqual(
      expect.arrayContaining(["task1"])
    );
  });

  it("moves task between columns", () => {
    const customInitial = {
      "column-1": { id: "column-1", title: "To Do", taskIds: ["task1"] },
      "column-2": { id: "column-2", title: "In Progress", taskIds: [] },
      "column-3": { id: "column-3", title: "Done", taskIds: [] },
    };
    const { result } = renderHook(() => useColumns(customInitial));
    act(() => {
      result.current.moveTaskBetweenColumns(
        "column-1",
        "column-2",
        0,
        0,
        "task1"
      );
    });
    expect(result.current.columns["column-1"].taskIds).toEqual([]);
    expect(result.current.columns["column-2"].taskIds).toEqual(["task1"]);
  });

  it("adds a task to a column", () => {
    const { result } = renderHook(() => useColumns(initialColumns));
    act(() => {
      result.current.addTaskToColumn("column-1", "taskNew");
    });
    expect(result.current.columns["column-1"].taskIds).toContain("taskNew");
  });

  it("removes a task from a column", () => {
    const customInitial = {
      "column-1": {
        id: "column-1",
        title: "To Do",
        taskIds: ["task1", "task2"],
      },
    };
    const { result } = renderHook(() => useColumns(customInitial));
    act(() => {
      result.current.removeTaskFromColumn("column-1", "task1");
    });
    expect(result.current.columns["column-1"].taskIds).not.toContain("task1");
  });
});
