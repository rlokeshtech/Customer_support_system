import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Sidebar />

      <main className="min-h-screen w-full p-4 transition-all duration-300 md:ml-72 md:w-[calc(100%-18rem)] md:p-8">
        <div className="mx-auto w-full max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}