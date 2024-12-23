import { AppDispatch, RootState } from '@/app/store';
import Account from '@/components/account/Account';
import { validateToken } from '@/components/features/auth/validateTokenSlice';
import Home from '@/components/pages/home/Home';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

const PrivateRoutes: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { isValid } = useSelector((state: RootState) => state.validateToken);
    const isAuthenticated = Boolean(localStorage.getItem('mainToken'));

    useEffect(() => {
        dispatch(validateToken());
    }, [dispatch]);

    useEffect(() => {
        if (isValid === false) {
            navigate('/login');
        }
    }, [isValid, navigate]);

    return isValid && isAuthenticated ? (
        <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/account' element={<Account />} />
        </Routes>
    ) : null;
};

export default PrivateRoutes;