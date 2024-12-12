import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 min-h-screen">
            {/* Hero Section */}
            <header className="text-center text-white py-16 px-6">
                <h1 className="text-4xl md:text-6xl font-bold">日本語 Learn</h1>
                <p className="text-lg md:text-xl mt-4">
                    Master Japanese Vocabulary and Improve Your Communication Skills
                </p>
                <div className="mt-8">
                    <Link
                        to="/lessons"
                        className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
                    >
                        Start Learning
                    </Link>
                    <Link
                        to="/login"
                        className="ml-4 bg-transparent border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition"
                    >
                        Login
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="bg-white py-16 px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-8">
                    Why Choose 日本語 Learn?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Feature 1 */}
                    <div className="bg-gray-100 p-6 rounded shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-bold text-blue-600">Interactive Lessons</h3>
                        <p className="mt-4 text-gray-700">
                            Dive into structured lessons designed to enhance your vocabulary effectively.
                        </p>
                    </div>
                    {/* Feature 2 */}
                    <div className="bg-gray-100 p-6 rounded shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-bold text-blue-600">Audio Pronunciations</h3>
                        <p className="mt-4 text-gray-700">
                            Learn the correct pronunciation of each word to perfect your communication.
                        </p>
                    </div>
                    {/* Feature 3 */}
                    <div className="bg-gray-100 p-6 rounded shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-bold text-blue-600">Engaging Tutorials</h3>
                        <p className="mt-4 text-gray-700">
                            Access video tutorials to supplement your learning and stay motivated.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="bg-blue-600 text-white py-16 px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">
                    Ready to Start Your Journey?
                </h2>
                <p className="mt-4 text-lg md:text-xl">
                    Explore lessons, learn vocabulary, and master Japanese today!
                </p>
                <div className="mt-8">
                    <Link
                        to="/lessons"
                        className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
                    >
                        Explore Lessons
                    </Link>
                </div>
            </section>


        </div>
    );
};

export default HomePage;
