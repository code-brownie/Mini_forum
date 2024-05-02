import React, { useState, useEffect } from 'react';

const AccountList = () => {
    const [accounts, setAccounts] = useState([]);
    const [customerID, setCustomerID] = useState('');

    useEffect(() => {
        fetch('/showAccounts')
            .then(response => response.json())
            .then(data => {
                setAccounts(data.accounts);
                setCustomerID(data.customerID);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="container">
            <h1 style={{ fontWeight: 'bold', paddingTop: '1rem', color: 'darkslateblue' }}>Account List</h1>
            <hr />
            {accounts && accounts.length > 0 ? (
                <div>
                    {accounts.map(account => (
                        <div key={account.id}>
                            <p>Account ID: {account.id}</p>
                            <p>Bank: {account.bankID}</p>
                            <p>Balance: {account.balance}</p>
                            <p>Currency: {account.currency}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <h5>Customer's accounts not found.</h5>
            )}
            <a href="/transfer" className="btn btn-primary">Send Money</a>
            <a href="/customerHome" className="btn btn-secondary ml-2">Home page</a>
        </div>
    );
}

export default AccountList;
