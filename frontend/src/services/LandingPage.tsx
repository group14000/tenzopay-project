import React from 'react'
import { Button } from '@/components/ui/button'
import NotificationCard from '@/components/pages/NotificationCard'
import Navigation from './Navigation'

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white w-full">
            <Navigation/>
            <main className="container mx-auto px-4 pt-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                            Everything you need...
                            <br />
                            We step forward for you
                        </h1>
                        <p className="text-gray-400 text-lg max-w-lg">
                            Now plan every bit of your transaction and management
                            <br />
                            Replace your old skool notepads
                        </p>
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-amber-200 to-amber-100 text-black hover:opacity-90 transition-opacity"
                        >
                            Try it FREE
                        </Button>
                    </div>
                    <div className="lg:ml-auto">
                        <NotificationCard />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default LandingPage