import React, { useState } from 'react';
import { useLoginMutation } from '../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { login } from '../redux/features/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await loginUser({ email, password }).unwrap();
            dispatch(login({ user: response.user, token: response.token }));
            navigate(response.user.role === 'admin' ? '/dashboard' : '/lessons');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
                {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-6 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition duration-300 ease-in-out"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
                        Signup here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
