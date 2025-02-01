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
import { OverlayLoadingProvider } from "./contexts/LoadingOverlayContext";
import LoaderOverlayComponent from "./components/LoaderOverlayComponent";
import BlogsPage from "./pages/admin/BlogsPage";
import { RoutesEnum } from "./enums/Routes.enum";

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
        <OverlayLoadingProvider>
          <Routes>
            <Route index element={<DefaultPage />} />

            <Route path={RoutesEnum.ADMIN} element={<AdminAuthLayout />}>
              <Route index element={<AuthPage />} />
              <Route path={RoutesEnum.INIT} element={<InitPage />} />
            </Route>

            <Route path={RoutesEnum.ADMIN} element={<AdminLayout />}>
              <Route path={RoutesEnum.DASHBOARD} element={<DashboardPage />} />
              <Route path={RoutesEnum.BLOGS} element={<BlogsPage />} />
            </Route>
          </Routes>

          <LoaderOverlayComponent />
        </OverlayLoadingProvider>
      </NextUIProvider>
    </SnackbarProvider>
  );
}

export default App;
