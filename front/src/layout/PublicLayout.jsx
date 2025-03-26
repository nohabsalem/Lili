import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from './PublicLayout/Header';
import Footer from './PublicLayout/Footer';

const PublicLayout = () => {
    return (
        <div>
            <Header />
            <main className=" my-20"><Outlet /></main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
