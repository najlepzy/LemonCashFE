import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TASK_MODAL_TEXT } from "@utils/constants";
import TaskModal from "@components/taskManager/taskModal";

describe("TaskModal Component", () => {
  const defaultProps = {
    isEditing: false,
    title: "Test Title",
    description: "Test Description",
    onClose: vi.fn(),
    onSave: vi.fn(),
    setTitle: vi.fn(),
    setDescription: vi.fn(),
  };

  it("displays the correct title based on isEditing prop", () => {
    render(<TaskModal {...defaultProps} />);
    expect(
      screen.getByRole("heading", { name: TASK_MODAL_TEXT.NEW_TITLE })
    ).toBeInTheDocument();
  });

  it("calls onClose when Escape key is pressed", () => {
    render(<TaskModal {...defaultProps} />);
    const modalContainer = screen.getByRole("dialog").querySelector(".modal")!;
    fireEvent.keyDown(modalContainer, { key: "Escape", code: "Escape" });
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onSave when Enter key is pressed without shift", () => {
    render(<TaskModal {...defaultProps} />);
    const modalContainer = screen.getByRole("dialog").querySelector(".modal")!;
    fireEvent.keyDown(modalContainer, {
      key: "Enter",
      code: "Enter",
      shiftKey: false,
    });
    expect(defaultProps.onSave).toHaveBeenCalled();
  });

  it("executes setTitle and setDescription on input changes", () => {
    render(<TaskModal {...defaultProps} />);
    const titleInput = screen.getByLabelText(TASK_MODAL_TEXT.TITLE_LABEL);
    const descInput = screen.getByLabelText(TASK_MODAL_TEXT.DESCRIPTION_LABEL);
    fireEvent.change(titleInput, { target: { value: "New Title" } });
    fireEvent.change(descInput, { target: { value: "New Description" } });
    expect(defaultProps.setTitle).toHaveBeenCalledWith("New Title");
    expect(defaultProps.setDescription).toHaveBeenCalledWith("New Description");
  });

  it("closes the modal when clicking on the overlay", () => {
    render(<TaskModal {...defaultProps} />);
    fireEvent.click(screen.getByRole("dialog"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
