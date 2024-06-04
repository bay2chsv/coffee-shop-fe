import { useRouter } from "next/router";
import ProtectedRoute from "./auth/ProtectRoute";
import Dashboard from "./dashboard/Dashboard";
import { AdminListItems, EmployeeListItems, ManagerListItems } from "./dashboard/Listitems";

export default function Layout({ children }) {
  const router = useRouter();
  const isAdminDashboardPath = router.pathname.startsWith("/admin");
  const isMangerDashboardPath = router.pathname.startsWith("/manager");
  const isEmployeeDashboardPath = router.pathname.startsWith("/employee");

  const pathsToCheck = ["/manageinfohub", "/404", "/unauthorized"];

  const isMatchingPath = pathsToCheck.some((path) => {
    return router.pathname.startsWith(path) || router.pathname.includes(path);
  });
  if (isMangerDashboardPath) {
    return (
      <ProtectedRoute requiredRole={["admin", "manager"]}>
        <Dashboard name="Manger Dashboard" list={<ManagerListItems />}>
          {children}
        </Dashboard>
      </ProtectedRoute>
    );
  }
  if (isEmployeeDashboardPath) {
    return (
      <ProtectedRoute requiredRole={["admin", "manager", "employee"]}>
        <Dashboard name="Employee Dashboard" list={<EmployeeListItems />}>
          {children}
        </Dashboard>
      </ProtectedRoute>
    );
  }
  if (isAdminDashboardPath) {
    return (
      <ProtectedRoute requiredRole={["admin"]}>
        <Dashboard name="Admin Dashboard" list={<AdminListItems />}>
          {children}
        </Dashboard>
      </ProtectedRoute>
    );
  }
  if (isMatchingPath) {
    return <main>{children}</main>;
  }

  return (
    <>
      <main>{children}</main>
    </>
  );
}
