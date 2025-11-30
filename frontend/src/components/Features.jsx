import { motion } from 'framer-motion';
import { Lock, FileText, Bell, Clock, ShieldCheck, Heart, Users } from 'lucide-react';

const features = [
    {
        icon: Lock,
        title: "Encrypted Vault",
        description: "Store passwords, documents, and secure notes with military-grade encryption."
    },
    {
        icon: Users,
        title: "Beneficiary Management",
        description: "Easily add and manage trusted contacts who will inherit your digital assets."
    },
    {
        icon: Bell,
        title: "Life Check System",
        description: "Periodic verification emails to ensure you are active and well."
    },
    {
        icon: Clock,
        title: "Timed Release",
        description: "Set specific time delays for asset release after confirmation."
    },
    {
        icon: ShieldCheck,
        title: "Verifiable Security",
        description: "Zero-knowledge architecture means we can't see your data even if we wanted to."
    },
    {
        icon: Heart,
        title: "Emotional Legacy",
        description: "Leave personal messages and memories for your loved ones."
    }
];

const Features = () => {
    return (
        <section className="py-24 bg-slate-900 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Why Choose Digital Death Locker?
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Comprehensive tools to manage your digital afterlife with security and ease.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 group"
                        >
                            <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                                <feature.icon className="w-6 h-6 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
