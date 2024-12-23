import React, { ReactNode } from 'react';
// import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* <div className="h-screen">
                <Sidebar />
            </div> */}
            <div className="flex flex-col flex-grow h-screen overflow-hidden">
                <Header />
                <main className="flex-grow p-4 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;