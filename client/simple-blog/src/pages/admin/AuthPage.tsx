function AuthPage() {
  return (
    <main className="flex h-screen bg-zinc-900">
      <div className="w-2/6 px-5 py-3">
        <div className="border border-zinc-700 rounded-xl px-6 py-4">
          <p className="text-zinc-100 font-semibold text-2xl">Login</p>
        </div>
      </div>

      <div className="bg-auth-img bg-no-repeat bg-center bg-cover h-full w-4/6"></div>
    </main>
  );
}

export default AuthPage;
