import Logo from "../assets/logo.svg?react";
import { ChildrenPropInterface } from "../interfaces/ChildrenProp.interface";

function AdminAuthLayout({ children }: ChildrenPropInterface) {
  return (
    <main className="flex h-screen bg-zinc-900">
      <div className="grid place-items-center px-5 py-10 overflow-y-auto w-full md:w-1/2 lg:w-2/6">
        <div className="z-10">
          <Logo className="mx-auto" />
          <div className="border bg-zinc-900 border-zinc-700 rounded-xl px-6 py-8 mx-auto mt-5 max-w-96 w-full">
            {children}
          </div>
        </div>
      </div>

      <div className="bg-auth-img bg-no-repeat bg-center bg-cover h-full absolute opacity-5 w-full md:opacity-100 md:static md:w-1/2 lg:w-4/6"></div>
    </main>
  );
}

export default AdminAuthLayout;
