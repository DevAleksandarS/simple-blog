import { Outlet, useLocation, useNavigate } from "react-router";
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
            <Button
              variant="light"
              size="sm"
              radius="none"
              className="px-3 py-2 h-full w-full rounded-lg justify-start"
            >
              <UserIcon className="w-8 h-8 stroke-white" />
              <p className="m-0 prose prose-lg prose-invert">Aleksandar S.</p>
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
