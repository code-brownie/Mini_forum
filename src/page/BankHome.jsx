import React, { useState, useEffect } from 'react';

const BankHomePage = () => {
    const [bankData, setBankData] = useState(null);

    useEffect(() => {
        fetchBankData();
    }, []);

    const fetchBankData = async () => {
        try {
            const response = await fetch('http://localhost:5000/bankHome');
            if (!response.ok) {
                throw new Error('Failed to fetch bank data');
            }
            const data = await response.json();
            setBankData(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand font-weight-bold" href="/bankHome">Bank Platform</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/showAccountsforBank">Show Account</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/showBank">My Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Log out</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container mt-5">
                {bankData && (
                    <div>
                        <h3 style={{ fontWeight: 'bold' }}>Welcome</h3>
                        <p><strong>Bank ID:</strong> {bankData.bankID}</p>
                        <p><strong>Bank Admin ID:</strong> {bankData.bankadminID}</p>
                        <p><strong>Name:</strong> {bankData.name}</p>
                        <p><strong>Password:</strong> {bankData.password}</p>
                        <p><strong>Country:</strong> {bankData.country}</p>
                        <p><strong>Reserves:</strong> {bankData.reserves}</p>
                        <p><strong>Currency:</strong> {bankData.currency}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BankHomePage;
