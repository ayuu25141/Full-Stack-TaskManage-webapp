
function Nav() {
  return (
    <nav className="bg-dark p-4 shadow-lg">
      <div className="container mx-auto flex flex-row justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-white font-bold text-xl">
        NextTask
        </div>

        {/* Navigation Links */}
        <div className="flex flex-row gap-8">
          {/* Features Dropdown */}
          <div className="relative group">
            <button className="text-white hover:text-blue-400 transition-colors duration-300 flex items-center gap-1">
              Features
         
            </button>
            {/* Dropdown Menu (hidden by default) */}
        
          </div>

          {/* Usecase Dropdown */}
          <div className="relative group">
            <button className="text-white hover:text-blue-400 transition-colors duration-300 flex items-center gap-1">
              Usecase
         
            </button>
            {/* Dropdown Menu (hidden by default) */}
         
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex flex-row gap-4">
          <a
            href="http://localhost:5173/register"
            className="px-4 py-2 text-white hover:bg-blue-600 rounded-lg transition-colors duration-300"
          >
            Signup
          </a>
          <a
            href="http://localhost:5173/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
