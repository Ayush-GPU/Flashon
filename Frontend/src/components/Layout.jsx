export default function Layout({
  children,
  isAuthenticated,
  isPremium,
  onLogout,
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* LOGO */}
          <h1 className="text-2xl font-bold text-gray-900">
            Flash<span className="text-blue-600">On</span>
          </h1>

          {/* STATUS */}
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <span
                className={`text-sm font-semibold ${
                  isPremium ? "text-green-600" : "text-gray-500"
                }`}
              >
                {isPremium ? "Premium" : "Free"}
              </span>
            )}

            {isAuthenticated && (
              <button
                onClick={() => {
                  if (confirm("Log out of FlashOn?")) onLogout();
                }}
                className="text-sm text-gray-500 hover:underline"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-8">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t">
        <div className="max-w-5xl mx-auto px-6 py-4 text-sm text-gray-500">
          © {new Date().getFullYear()} FlashOn
        </div>
      </footer>
    </div>
  );
}
