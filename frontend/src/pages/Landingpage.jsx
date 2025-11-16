// Landing page component
import { Link } from 'react-router-dom';

function Landingpage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Navigation */}
      <nav className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">🔒 Digital Death Locker</div>
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-white hover:text-gray-200 font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Secure Your Digital Legacy
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
          Protect and pass on your important digital assets, passwords, and instructions to your loved ones when the time comes.
        </p>
        <Link
          to="/signup"
          className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition inline-block"
        >
          Get Started Free
        </Link>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 text-white">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-2xl font-bold mb-3">Encrypted Storage</h3>
            <p className="text-gray-100">
              All your sensitive data is encrypted with military-grade AES-256 encryption before storage.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 text-white">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-2xl font-bold mb-3">Manage Beneficiaries</h3>
            <p className="text-gray-100">
              Add trusted people who will receive your digital legacy when you're gone.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 text-white">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-2xl font-bold mb-3">Automated Notifications</h3>
            <p className="text-gray-100">
              When activated, your beneficiaries automatically receive notifications about their legacy items.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center text-white">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              1
            </div>
            <h4 className="font-bold mb-2">Sign Up</h4>
            <p className="text-gray-100">Create your secure account</p>
          </div>
          <div className="text-center text-white">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              2
            </div>
            <h4 className="font-bold mb-2">Add Assets</h4>
            <p className="text-gray-100">Store passwords, notes, instructions</p>
          </div>
          <div className="text-center text-white">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              3
            </div>
            <h4 className="font-bold mb-2">Add Beneficiaries</h4>
            <p className="text-gray-100">Choose who receives what</p>
          </div>
          <div className="text-center text-white">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              4
            </div>
            <h4 className="font-bold mb-2">Activate When Ready</h4>
            <p className="text-gray-100">Send your legacy to loved ones</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Legacy?</h2>
          <p className="text-lg mb-8">
            Join thousands who trust us with their digital inheritance
          </p>
          <Link
            to="/signup"
            className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition inline-block"
          >
            Create Free Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-white py-8 border-t border-white border-opacity-20">
        <p>&copy; 2024 Digital Death Locker. Built with ❤️ for your peace of mind.</p>
      </footer>
    </div>
  );
}

export default Landingpage;