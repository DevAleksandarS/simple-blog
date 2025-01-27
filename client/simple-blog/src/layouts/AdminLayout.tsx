import { Outlet, useLocation, useNavigate } from "react-router";
import UserIcon from "../assets/user-icon.svg?react";
import DashboardIcon from "../assets/dashboard-icon.svg?react";
import FileIcon from "../assets/file-icon.svg?react";
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { sendReq } from "../utils/CustomAxios.utils";
import { UserLogoutInterface } from "../interfaces/ServerResponse.interface";
import { ServerRoutesEnum } from "../enums/ServerRoutes.enum";
import { RoutesNavigatorEnum } from "../enums/Routes.enum";
import { ToastVarientEnum } from "../enums/ToastComponent.enum";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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

  return (
    <main className="flex h-screen">
      <div className="prose prose-lg prose-invert p-3 bg-zinc-900 h-full w-1/5 border-r border-zinc-700 flex flex-col">
        <div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                navigate("/admin/dashboard");
              }}
              className={`p-3 rounded-lg flex items-center gap-2 ${
                isActive("/admin/dashboard")
                  ? "bg-zinc-50/10"
                  : "hover:bg-zinc-50/5"
              }`}
            >
              <DashboardIcon className="stroke-white w-8 h-8" />
              Dashboard
            </button>

            <button
              onClick={() => {
                navigate("/admin/blogs");
              }}
              className={`p-3 rounded-lg flex items-center gap-2 ${
                isActive("/admin/blogs")
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
              placement="right"
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
      </div>

      <div className="bg-zinc-950 h-full w-4/5 p-5">
        <Outlet />
      </div>
    </main>
  );
}

export default AdminLayout;
