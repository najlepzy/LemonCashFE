
import Spinner from "@components/loader/spinner";
import { lazy, Suspense, ComponentType } from "react";

const lazyWithDelay = <T extends { default: ComponentType<any> }>(
  factory: () => Promise<T>,
  delay: number = 500
) =>
  lazy(() =>
    Promise.all([
      factory(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]).then(([moduleExports]) => moduleExports)
  );

const TaskModal = lazyWithDelay(
  () => import("@components/taskManager/taskModal")
);
const CollaboratorModal = lazyWithDelay(
  () => import("@components/collab/collaboratorModal")
);
const TaskColumn = lazyWithDelay(
  () => import("@components/taskManager/taskColumn")
);
const TaskCard = lazyWithDelay(
  () => import("@components/taskManager/taskCard")
);
const CollaboratorList = lazyWithDelay(
  () => import("@components/collab/collaboratorList")
);
const DateFilter = lazyWithDelay(
  () => import("@components/taskManager/dateFilter")
);

const withSuspense =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) =>
    (
      <Suspense fallback={<Spinner />}>
        <Component {...props} />
      </Suspense>
    );

export const LazyTaskModal = withSuspense(TaskModal);
export const LazyCollaboratorModal = withSuspense(CollaboratorModal);
export const LazyTaskColumn = withSuspense(TaskColumn);
export const LazyTaskCard = withSuspense(TaskCard);
export const LazyCollaboratorList = withSuspense(CollaboratorList);
export const LazyDateFilter = withSuspense(DateFilter);