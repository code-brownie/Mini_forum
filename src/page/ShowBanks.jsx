import React, { useState, useEffect } from 'react';

const BankInfo = () => {
    const [bank, setBank] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBankData = async () => {
            try {
                const response = await fetch('/showBank');
                if (!response.ok) {
                    throw new Error('Failed to fetch bank information.');
                }
                const data = await response.json();
                setBank(data.bank);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBankData();
    }, []);

    return (
        <div id="bankInfoContainer" className="container">
            <h1 style={{ fontWeight: 'bold', paddingTop: '1rem', color: 'darkslateblue' }}>Bank Info</h1>
            <hr />
            {error && <div className="alert alert-danger">{error}</div>}
            {bank && (
                <div className="card mt-4">
                    <div className="card-body">
                        <p className="card-text"><strong>Bank Name:</strong> {bank.name}</p>
                        <p className="card-text"><strong>Bank ID:</strong> {bank.bankID}</p>
                        <p className="card-text"><strong>Banka Admin ID:</strong> {bank.bankAdminID}</p>
                        <p className="card-text"><strong>Country:</strong> {bank.country}</p>
                        <p className="card-text"><strong>Currency:</strong> {bank.currency}</p>
                        <p className="card-text"><strong>Reserves:</strong> {bank.reserves.toFixed(2)}</p>
                        <p className="card-text"><strong>Account ID's:</strong> {bank.accountIDs.join(', ')}</p>
                        <p className="card-text"><strong>Exchange Rate in Dollars:</strong> {bank.exchangeRate.toFixed(2)}</p>
                    </div>
                </div>
            )}
            <br />
            <a href="/bankHome" className="btn btn-secondary">Main Page</a>
        </div>
    );
}

export default BankInfo;
