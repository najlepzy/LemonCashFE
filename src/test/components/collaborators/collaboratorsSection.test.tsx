import CollaboratorsSection from "@components/collab/collaboratorSection";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@config/lazyLoader", () => ({
  LazyCollaboratorList: () => <div data-testid="lazy-collaborator-list" />,
  LazyCollaboratorModal: () => <div data-testid="lazy-collaborator-modal" />,
}));

describe("CollaboratorsSection", () => {
  const props = {
    collabInvite: { ownerName: "Owner" },
    handleAcceptInvite: vi.fn(),
    handleRejectInvite: vi.fn(),
    isCollaborator: false,
    collabOwnerName: "",
    handleExitCollaboration: vi.fn(),
    collaborators: [{ id: "1", email: "a@example.com", name: "Alice" }],
    openCollaboratorModal: vi.fn(),
    removeCollaborator: vi.fn(),
    isCollaboratorModalOpen: false,
    collaboratorInput: "Test",
    setCollaboratorInput: vi.fn(),
    saveCollaborator: vi.fn(),
    closeCollaboratorModal: vi.fn(),
    collaboratorInputRef: {
      current: { focus: vi.fn() },
    } as unknown as React.RefObject<HTMLInputElement>,
  };

  it("renders CollaboratorInviteModal when collabInvite exists", () => {
    render(<CollaboratorsSection {...props} />);
    expect(screen.getByText(/owner/i)).toBeTruthy();
  });

  it("renders collaborating section when isCollaborator is true", () => {
    const newProps = {
      ...props,
      isCollaborator: true,
      collabOwnerName: "Owner",
    };
    render(<CollaboratorsSection {...newProps} />);
    expect(
      screen.getByRole("button", { name: /leave collaboration/i })
    ).toBeTruthy();
  });

  it("renders LazyCollaboratorList when not collaborator", () => {
    render(<CollaboratorsSection {...props} />);
    expect(screen.getByTestId("lazy-collaborator-list")).toBeTruthy();
  });

  it("renders LazyCollaboratorModal when isCollaboratorModalOpen is true", () => {
    render(
      <CollaboratorsSection {...{ ...props, isCollaboratorModalOpen: true }} />
    );
    expect(screen.getByTestId("lazy-collaborator-modal")).toBeTruthy();
  });
});
