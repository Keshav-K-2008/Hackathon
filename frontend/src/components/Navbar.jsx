import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-slate-900/50 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="p-2 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg">
                        <Lock className="w-6 h-6 text-white" />
                    </div>
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
                        Digital Death Locker
                    </span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Link
                        to="/login"
                        className="text-white hover:text-indigo-400 font-medium px-4 py-2 transition-colors duration-200"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-800 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all duration-200 shadow-lg shadow-indigo-500/30"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
