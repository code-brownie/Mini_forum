import React, { useState, useEffect } from 'react';


const BankAccountsPage = () => {
    const [accounts, setBankAccounts] = useState([]);

    useEffect(() => {
        fetchBankAccountsData();
    }, []);

    const fetchBankAccountsData = async () => {
        try {
            const response = await fetch('/showAccountsforBank');
            if (!response.ok) {
                throw new Error('Failed to fetch bank accounts data');
            }
            const data = await response.json();
            setBankAccounts(data.accounts);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="my-4 font-weight-bold text-dark">Account List</h1>
            <hr />

            {accounts && accounts.length > 0 ? (
                <div className="account-list">
                    {accounts.map((account) => (
                        <div key={account.id} className="account-item">
                            <div className="account-details">
                                <div><strong>Account ID:</strong> {account.id}</div>
                                <div><strong>Customer ID:</strong> {account.customerID}</div>
                                <div><strong>Balance:</strong> {account.balance}</div>
                                <div><strong>Currency:</strong> {account.currency}</div>
                            </div>
                            <div className="account-actions">
                                <a href={`/customerDetails/${account.customerID}`} className="action-btn">Go to Customer Details</a>
                                <a href={`/transferForBank/${account.id}`} className="action-btn">Account Activities</a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h5>Customer's accounts not found.</h5>
            )}

            <div className="mt-4">
                <a href="/bankHome" className="action-btn">Main Page</a>
            </div>
        </div>
    );
};

export default BankAccountsPage;
