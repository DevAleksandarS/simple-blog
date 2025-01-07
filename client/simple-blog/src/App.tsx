import { NextUIProvider } from "@nextui-org/system";
import { Routes, Route, useNavigate, useHref } from "react-router";
import DefaultPage from "./pages/DefaultPage";
import AuthPage from "./pages/admin/AuthPage";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import InitPage from "./pages/admin/InitPage";
import { SnackbarProvider } from "notistack";
import ToastComponent from "./components/ToastComponent";
import AdminAuthLayout from "./layouts/AdminAuthLayout";

function App() {
  const navigate = useNavigate();

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={3000}
      Components={{
        default: ToastComponent,
        success: ToastComponent,
        error: ToastComponent,
        warning: ToastComponent,
        info: ToastComponent,
      }}
      classes={{
        root: "custom-notistack",
      }}
      dense={true}
      preventDuplicate={true}
    >
      <NextUIProvider navigate={navigate} useHref={useHref}>
        <Routes>
          <Route index element={<DefaultPage />} />

          <Route path="admin" element={<AdminAuthLayout />}>
            <Route index element={<AuthPage />} />
            <Route path="init" element={<InitPage />} />
          </Route>

          <Route path="admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </NextUIProvider>
    </SnackbarProvider>
  );
}

export default App;
