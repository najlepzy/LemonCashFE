import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { TASK_MANAGER_TEXT } from "@utils/constants";
import { DateFilter } from "@components/index";

describe("DateFilter Component", () => {
  const setFilterDate = vi.fn();
  const filterDate = "2025-02-10";

  it("renders label and input with correct value", () => {
    render(
      <DateFilter filterDate={filterDate} setFilterDate={setFilterDate} />
    );
    expect(
      screen.getByLabelText(`${TASK_MANAGER_TEXT.DATE_LABEL}:`)
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue(filterDate)).toBeInTheDocument();
  });

  it("calls setFilterDate on input change", () => {
    render(
      <DateFilter filterDate={filterDate} setFilterDate={setFilterDate} />
    );
    const input = screen.getByLabelText(`${TASK_MANAGER_TEXT.DATE_LABEL}:`);
    fireEvent.change(input, { target: { value: "2025-02-11" } });
    expect(setFilterDate).toHaveBeenCalledWith("2025-02-11");
  });
});
