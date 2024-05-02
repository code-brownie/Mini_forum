import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PaymentListForBank() {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState(null);
    const accountID = 12345;
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch(`/transferForBank/${accountID}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch customer payments.");
                }
                const data = await response.json();
                setPayments(data.payments);
            } catch (error) {
                console.error("Error:", error);
                setError(error.message);
            }
        };

        fetchPayments();
    }, [accountID]);

    return (
        <div className="container">
            <h1>Account Activities</h1>
            {error && <div className="alert alert-danger">{error}</div>}
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
            <Link to="/bankHome" className="btn btn-secondary">
                Main Page
            </Link>
        </div>
    );
}

export default PaymentListForBank;
