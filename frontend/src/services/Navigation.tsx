import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { tokens } = useSelector((state: RootState) => state.auth);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm border-b border-gray-800">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8">
                            <svg viewBox="0 0 24 24" className="text-primary w-full h-full">
                                <path
                                    fill="currentColor"
                                    d="M12 0L24 12L12 24L0 12L12 0ZM12 3.79L3.79 12L12 20.21L20.21 12L12 3.79Z"
                                />
                            </svg>
                        </div>
                        <span className="text-white font-semibold text-xl">Tenzopay</span>
                    </Link>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/pricing" className="text-gray-300 hover:text-white">
                        Pricing
                    </Link>
                    <Link to="/resources" className="text-gray-300 hover:text-white">
                        Resources
                    </Link>
                    <Link to="/community" className="text-gray-300 hover:text-white">
                        Community
                    </Link>
                    <Link to="/start" className="text-gray-300 hover:text-white">
                        Start Now
                    </Link>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <Link to={tokens ? "/account" : "/login"}>
                        <Button variant="ghost" className="text-gray-300 hover:text-white">
                            {tokens ? "Account" : "Sign In"}
                        </Button>
                    </Link>

                    <Link to="/home">
                        <Button>GET STARTED</Button>
                    </Link>
                </div>
                {/* Mobile menu toggle */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-300 hover:text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
            {/* Mobile menu dropdown */}
            {isOpen && (
                <div className="md:hidden bg-black/90 p-4 space-y-4">
                    <Link to="/pricing" className="block text-gray-300 hover:text-white">
                        Pricing
                    </Link>
                    <Link to="/resources" className="block text-gray-300 hover:text-white">
                        Resources
                    </Link>
                    <Link to="/community" className="block text-gray-300 hover:text-white">
                        Community
                    </Link>
                    <Link to="/start" className="block text-gray-300 hover:text-white">
                        Start Now
                    </Link>
                    <div className="space-y-2">
                        <Link to={tokens ? "/account" : "/login"}>
                            <Button variant="ghost" className="w-full text-gray-300 hover:text-white">
                                {tokens ? "Account" : "Sign In"}
                            </Button>
                        </Link>
                        <Button className="w-full">GET STARTED</Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;
