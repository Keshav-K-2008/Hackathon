import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';

function Landingpage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-indigo-500/30">
      <Navbar />
      <main>
        <Hero />
        <Features />

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-600/10 -z-10" />
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Secure Your Legacy?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands who trust us with their digital inheritance. Start your free trial today.
            </p>
            <a
              href="/signup"
              className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:scale-105"
            >
              Create Free Account
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Landingpage;