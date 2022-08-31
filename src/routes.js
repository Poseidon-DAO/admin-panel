import { Navigate, Routes, Route } from "react-router-dom";

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

export default function Router() {
  return (
    <Routes>
      <Route element={<LogoOnlyLayout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="/app" element={<DashboardLayout />}>
        <Route path="dashboard" element={<DashboardApp />} />
        <Route path="accessibility" element={<Accessibility />} />
        <Route path="polls" element={<Polls />} />
        <Route path="transfer" element={<Transfer />} />
        <Route path="airdrop" element={<Airdrop />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="forbidden" element={<NotAllowed />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
