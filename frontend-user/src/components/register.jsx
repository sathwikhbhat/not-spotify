import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import { useState } from "react";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            toast.error("Please fill in all fields");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }

        setTimeout(() => {
            console.log("User registered:", { email, password });
            setLoading(false);
        }, 1000);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="flex items-center justify-center mb-6">
                        <img src={assets.logo} alt="Not Spotify logo" className="w-16 h-16" />
                        <h1 className="ml-3 text-3xl font-bold text-white">Not Spotify</h1>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>
                    <p className="text-gray-300">
                        Discover fresh tracks and podcasts crafted for you...
                    </p>
                </div>
                {/* Registration Form */}
                <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                                Email Address
                            </label>
                            <input type="text"
                                name="email"
                                id="email"
                                autoComplete="email"
                                required
                                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 
                                            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent 
                                            transition-all duration-200"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                                Password
                            </label>
                            <input type="password"
                                name="password"
                                id="password"
                                autoComplete="new-password"
                                required
                                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 
                                            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent 
                                            transition-all duration-200"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-2">
                                Confirm Password
                            </label>
                            <input type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                autoComplete="new-password"
                                required
                                className="block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 
                                            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent 
                                            transition-all duration-200"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {/* Submit Button */}
                        <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 
                                            hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 
                                            disabled:opacity-50 transform hover:scale-105 cursor-pointer transition-all duration-200">
                            Register
                        </button>
                    </form>
                    {/* Switch to Login */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Already have an account? {' '}
                            <button className="text-green-400 hover:text-green-300 font-medium transition-colors cursor-pointer">
                                Log in here
                            </button>
                        </p>
                    </div>
                    {/* Terms and Conditions */}
                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                            By registering, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;