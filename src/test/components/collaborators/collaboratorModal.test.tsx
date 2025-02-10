import { CollaboratorModal } from "@components/index";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

const inputElement = document.createElement("input");
inputElement.focus = vi.fn();

const props = {
  collaboratorInput: "Test",
  setCollaboratorInput: vi.fn(),
  onSave: vi.fn(),
  onClose: vi.fn(),
  inputRef: { current: inputElement },
};

describe("CollaboratorModal", () => {
  it("renders modal with heading, input and buttons", () => {
    render(<CollaboratorModal {...props} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /invite collaborator/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("Test");
    expect(
      screen.getByRole("button", { name: /close collaborator modal/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save collaborator/i })
    ).toBeInTheDocument();
  });

  it("calls onSave on Enter keydown", () => {
    render(<CollaboratorModal {...props} />);
    const modalDiv = document.querySelector(".modal");
    if (modalDiv) {
      fireEvent.keyDown(modalDiv, { key: "Enter", code: "Enter" });
    }
    expect(props.onSave).toHaveBeenCalled();
  });

  it("calls onClose on Escape keydown", () => {
    render(<CollaboratorModal {...props} />);
    const modalDiv = document.querySelector(".modal");
    if (modalDiv) {
      fireEvent.keyDown(modalDiv, { key: "Escape", code: "Escape" });
    }
    expect(props.onClose).toHaveBeenCalled();
  });

  it("calls setCollaboratorInput on input change", () => {
    render(<CollaboratorModal {...props} />);
    const textbox = screen.getByRole("textbox");
    fireEvent.change(textbox, { target: { value: "New" } });
    expect(props.setCollaboratorInput).toHaveBeenCalledWith("New");
  });

  it("calls onClose when clicking on overlay", () => {
    const { container } = render(<CollaboratorModal {...props} />);
    const overlay = container.firstChild;
    if (overlay) {
      fireEvent.click(overlay);
    }
    expect(props.onClose).toHaveBeenCalled();
  });
});
