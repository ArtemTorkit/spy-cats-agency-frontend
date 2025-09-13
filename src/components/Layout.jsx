export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className=" flex flex-col items-center justify-center gap-4 p-6">
        {children}
      </main>
    </div>
  );
}
