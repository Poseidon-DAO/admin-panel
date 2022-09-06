import { Navigate, Routes, Route, useLocation } from "react-router-dom";

import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";

import Accessibility from "./pages/Accessibility";
import Login from "./pages/Login";
import NotAllowed from "./pages/NotAllowed";
import NotFound from "./pages/Page404";
import DashboardApp from "./pages/DashboardApp";
import Polls from "./pages/Polls";
import Airdrop from "./pages/Airdrop";
import Transfer from "./pages/Transfer";
import Settings from "./pages/Settings";

export const sectionsTitles = {
  dashboard: "Welcome back",
  accessibility: "Accessibility's available functions",
  polls: "List of polls",
  transfer: "Transfer tokens",
  airdrop: "Create Airdrop",
  settings: "Settings",
};

export default function Router() {
  const { pathname } = useLocation();
  const [, , exactPath] = pathname.split("/");
  const sectionTitle = sectionsTitles[exactPath];

  return (
    <Routes>
      <Route element={<LogoOnlyLayout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route
        path="/app"
        element={<DashboardLayout activeSectionTitle={sectionTitle} />}
      >
        <Route
          path="dashboard"
          element={<DashboardApp sectionTitle={sectionTitle} />}
        />
        <Route
          path="accessibility"
          element={<Accessibility sectionTitle={sectionTitle} />}
        />
        <Route path="polls" element={<Polls sectionTitle={sectionTitle} />} />
        <Route
          path="transfer"
          element={<Transfer sectionTitle={sectionTitle} />}
        />
        <Route
          path="airdrop"
          element={<Airdrop sectionTitle={sectionTitle} />}
        />
        <Route
          path="settings"
          element={<Settings sectionTitle={sectionTitle} />}
        />
      </Route>

      <Route path="forbidden" element={<NotAllowed />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
