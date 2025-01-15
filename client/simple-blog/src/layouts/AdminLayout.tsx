import { Outlet, useLocation, useNavigate } from "react-router";
import ThreeDotsIcon from "../assets/three-dots-icon.svg?react";
import UserIcon from "../assets/user-icon.svg?react";
import DashboardIcon from "../assets/dashboard-icon.svg?react";
import FileIcon from "../assets/file-icon.svg?react";
import { Button } from "@nextui-org/button";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <main className="flex h-screen">
      <div className="prose prose-lg prose-invert bg-zinc-900 h-full w-1/5 border-r border-zinc-700 flex flex-col">
        <div className="p-3">
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

        <div className="flex items-center border-t border-zinc-700 mt-auto">
          <div className="w-full flex items-center gap-1 p-3">
            <UserIcon className="w-10 h-10 fill-white" />
            <p className="m-0">Aleksandar S.</p>
          </div>

          <div className="h-full border-l border-zinc-700">
            <Button
              variant="light"
              size="sm"
              radius="none"
              className="p-3 h-full"
            >
              <ThreeDotsIcon className="w-10 h-10 stroke-white" />
            </Button>
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
