import { NextUIProvider } from "@nextui-org/system";
import { Routes, Route, useNavigate, useHref } from "react-router";
import DefaultPage from "./pages/DefaultPage";
import AuthPage from "./pages/admin/AuthPage";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate} useHref={useHref}>
      <Routes>
        <Route index path="/" element={<DefaultPage />} />

        <Route path="admin" element={<AuthPage />} />

        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </NextUIProvider>
  );
}

export default App;
