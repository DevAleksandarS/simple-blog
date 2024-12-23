import Logo from "../assets/logo.svg?react";
import { ChildrenPropInterface } from "../interfaces/ChildrenProp.interface";

function AdminAuthLayout({ children }: ChildrenPropInterface) {
  return (
    <main className="flex h-screen bg-zinc-900">
      <div className="flex flex-col justify-center gap-5 w-2/6 px-5 py-3">
        <Logo className="mx-auto" />
        <div className="border border-zinc-700 rounded-xl px-6 py-4 mx-auto max-w-96 w-full">
          {children}
        </div>
      </div>

      <div className="bg-auth-img bg-no-repeat bg-center bg-cover h-full w-4/6"></div>
    </main>
  );
}

export default AdminAuthLayout;
