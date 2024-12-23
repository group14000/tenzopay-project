import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
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
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" className="text-gray-300 hover:text-white">
                        Sign In
                    </Button>
                    <Button>GET STARTED</Button>
                </div>
            </div>
        </nav>
    )
}

export default Header