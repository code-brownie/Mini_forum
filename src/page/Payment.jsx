import React, { useState, useEffect } from 'react';

const AccountActivities = () => {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('/api/payments');
                if (!response.ok) {
                    throw new Error('Failed to fetch payments');
                }
                const data = await response.json();
                setPayments(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchPayments();
    }, []);

    return (
        <div className="container">
            <h1>Account Activities</h1>
            {error === 'invalid_credentials' && <div className="alert alert-danger">Invalid username!</div>}
            {payments.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Recipient Account</th>
                            <th>Sending Account</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={index}>
                                <td>{payment.receiverAccountID}</td>
                                <td>{payment.senderAccountID}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.date}</td>
                                <td>{payment.exchangeRate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>The customer's account activities could not be found.</p>
            )}
            <a href="/customerHome" className="btn btn-secondary">Main Page</a>
        </div>
    );
};

export default AccountActivities;
