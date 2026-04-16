export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">

      {/* Left panel */}
      <div className="hidden lg:flex w-[45%] bg-[#0f0f1a] flex-col justify-center px-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-3">AuthApp</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            A secure authentication system built with the MERN stack. Your data is protected with JWT and bcrypt encryption.
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
          <div className="w-2 h-2 rounded-full bg-gray-700"></div>
          <div className="w-2 h-2 rounded-full bg-gray-700"></div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

    </div>
  );
}