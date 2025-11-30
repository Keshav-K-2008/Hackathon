import { Link } from 'react-router-dom';
import { Lock, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg">
                                <Lock className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">
                                Digital Death Locker
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Securing your digital legacy for the future. Trusted by thousands to protect what matters most.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Product</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link to="#" className="hover:text-indigo-400 transition-colors">Features</Link></li>
                            <li><Link to="#" className="hover:text-indigo-400 transition-colors">Security</Link></li>
                            <li><Link to="#" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
                            <li><Link to="#" className="hover:text-indigo-400 transition-colors">Roadmap</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link to="#" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
                            <li><Link to="#" className="hover:text-indigo-400 transition-colors">Careers</Link></li>
                            <li><Link to="#" className="hover:text-indigo-400 transition-colors">Blog</Link></li>
                            <li><Link to="#" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Legal</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link to="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="#" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
                            <li><Link to="#" className="hover:text-indigo-400 transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Digital Death Locker. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
