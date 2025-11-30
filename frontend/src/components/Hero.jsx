import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Key, Users } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8">
                        Secure Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            Digital Legacy
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Ensure your digital assets, passwords, and memories are safely passed on to your loved ones when the time comes.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/signup"
                            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:scale-105"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            to="/login"
                            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-gray-300 border border-gray-700 rounded-full hover:bg-white/5 transition-all duration-200 hover:text-white"
                        >
                            Log In
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {[
                        { icon: Shield, title: "Bank-Grade Security", desc: "AES-256 encryption ensures your data remains private." },
                        { icon: Users, title: "Trusted Beneficiaries", desc: "Designate who receives access to specific assets." },
                        { icon: Key, title: "Smart Triggers", desc: "Automated release protocols based on your conditions." }
                    ].map((item, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                            <item.icon className="w-10 h-10 text-indigo-400 mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400">{item.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
