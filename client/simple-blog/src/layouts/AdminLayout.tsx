import { Outlet, useLocation, useNavigate } from "react-router";
import UserIcon from "../assets/user-icon.svg?react";
import DashboardIcon from "../assets/dashboard-icon.svg?react";
import FileIcon from "../assets/file-icon.svg?react";
import MenuIcon from "../assets/menu-icon.svg?react";
import CloseIcon from "../assets/close-icon.svg?react";
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { sendReq } from "../utils/CustomAxios.util";
import { UserLogoutInterface } from "../interfaces/ServerResponse.interface";
import { ServerRoutesEnum } from "../enums/ServerRoutes.enum";
import { RoutesNavigatorEnum } from "../enums/Routes.enum";
import { ToastVarientEnum } from "../enums/ToastComponent.enum";
import ButtonComponent from "../components/ButtonComponent";
import { ButtonStyles } from "../enums/ButtonComponent.enum";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const sideNavRef = useRef<HTMLDivElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  const logout = () => {
    setLoading(true);
    sendReq<UserLogoutInterface>({
      method: "POST",
      url: ServerRoutesEnum.LOGOUT,
    })
      .then((res) => {
        if (res.data.logout) {
          navigate(RoutesNavigatorEnum.ADMIN_LOGIN, { replace: true });
          enqueueSnackbar("User successfully logged out.", {
            variant: ToastVarientEnum.SUCCESS,
          });
        } else {
          enqueueSnackbar("An error occurred. Please try again later.", {
            variant: ToastVarientEnum.ERROR,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar("An error occurred. Please try again later.", {
          variant: ToastVarientEnum.ERROR,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleSideNav = () => {
    darkOverlayRef.current?.classList.toggle("hidden");
    sideNavRef.current?.classList.toggle("translate-x-full");
  };

  const closeSideNav = () => {
    darkOverlayRef.current?.classList.add("hidden");
    sideNavRef.current?.classList.add("translate-x-full");
  };

  return (
    <div className="flex flex-col h-dvh relative overflow-y-auto overflow-x-hidden md:flex-row">
      <div className="bg-zinc-900 border-b-1 border-zinc-700 p-2 flex items-center justify-end md:hidden">
        <ButtonComponent callback={toggleSideNav} style={ButtonStyles.ICON}>
          <MenuIcon className="stroke-white w-10 !max-w-10"></MenuIcon>
        </ButtonComponent>
      </div>

      <div
        onClick={closeSideNav}
        ref={darkOverlayRef}
        id="custom-dark-overlay"
        className="absolute w-screen h-dvh bg-zinc-950/40 backdrop-blur-sm hidden md:hidden"
      ></div>

      <nav
        ref={sideNavRef}
        id="custom-side-navigation"
        className="prose prose-lg prose-invert absolute right-0 p-2 bg-zinc-900 h-full w-72 border-l border-zinc-700 flex flex-col translate-x-full transition md:p-3 md:translate-x-0 md:border-r md:relative md:w-1/3 lg:w-1/4 xl:w-1/5"
      >
        <ButtonComponent
          className="mb-3 ml-auto md:hidden"
          callback={closeSideNav}
          style={ButtonStyles.ICON}
        >
          <CloseIcon className="w-10 !max-w-10 stroke-white"></CloseIcon>
        </ButtonComponent>

        <div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                closeSideNav();
                navigate(RoutesNavigatorEnum.USER_DASHBOARD);
              }}
              className={`p-3 rounded-lg flex items-center gap-2 ${
                isActive(RoutesNavigatorEnum.USER_DASHBOARD)
                  ? "bg-zinc-50/10"
                  : "hover:bg-zinc-50/5"
              }`}
            >
              <DashboardIcon className="stroke-white w-8 h-8" />
              Dashboard
            </button>

            <button
              onClick={() => {
                closeSideNav();
                navigate(RoutesNavigatorEnum.USER_BLOGS);
              }}
              className={`p-3 rounded-lg flex items-center gap-2 ${
                isActive(RoutesNavigatorEnum.USER_BLOGS)
                  ? "bg-zinc-50/10"
                  : "hover:bg-zinc-50/5"
              }`}
            >
              <FileIcon className="stroke-white w-8 h-8" />
              Blogs
            </button>
          </div>
        </div>

        <div className="flex items-center border-t pt-3 border-zinc-700 mt-auto">
          <div className="w-full flex items-center gap-1">
            <Popover
              classNames={{
                content:
                  "prose prose-lg prose-invert bg-zinc-900 border border-zinc-700 p-1 w-36 flex flex-col gap-1",
              }}
              backdrop="blur"
            >
              <PopoverTrigger>
                <Button
                  variant="light"
                  size="sm"
                  radius="none"
                  className="px-3 py-2 h-full w-full rounded-lg justify-start"
                >
                  <UserIcon className="w-8 h-8 stroke-white" />
                  <p className="m-0 prose prose-lg prose-invert">
                    Aleksandar S.
                  </p>
                </Button>
              </PopoverTrigger>

              <PopoverContent>
                <button className="w-full py-1 rounded-lg text-lg hover:bg-zinc-50/5">
                  Settings
                </button>

                <button
                  onClick={logout}
                  className="w-full py-1 rounded-lg text-lg hover:bg-zinc-50/5"
                >
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>

      <main className="bg-zinc-950 h-full w-full p-3 md:p-5 md:w-2/3 lg:w-3/4 xl:w-4/5">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
