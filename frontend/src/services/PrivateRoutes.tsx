import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './LandingPage'

const PrivateRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
        </Routes>
    )
}

export default PrivateRoutes