import { CollaboratorList } from "@components/index";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("CollaboratorList", () => {
  const props = {
    collaborators: [
      { id: "1", email: "alice@example.com", name: "Alice" },
      { id: "2", email: "bob@example.com", name: "Bob" },
      { id: "3", email: "charlie@example.com", name: "Charlie" },
      { id: "4", email: "dave@example.com", name: "Dave" },
    ],
    onOpenModal: vi.fn(),
    onDelete: vi.fn(),
  };

  it("renders visible collaborators and additional count", () => {
    render(<CollaboratorList {...props} />);
    const list = screen.getByRole("list");
    expect(list).toBeTruthy();
    expect(screen.getByText("+1")).toBeTruthy();
  });

  it("calls onOpenModal when add collaborator button is clicked", () => {
    render(<CollaboratorList {...props} />);
    const button = screen.getByRole("button", {
      name: /add new collaborator/i,
    });
    fireEvent.click(button);
    expect(props.onOpenModal).toHaveBeenCalled();
  });

  it("calls onDelete when delete button is clicked", () => {
    render(<CollaboratorList {...props} />);
    const deleteButton = screen.getAllByTitle(/remove collaborator/i)[0];
    fireEvent.click(deleteButton);
    expect(props.onDelete).toHaveBeenCalledWith("1");
  });
});
