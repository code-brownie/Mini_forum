import React, { useState, useEffect } from 'react';

const CustomerDetails = () => {
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(null);
    const customerID = 12345;
    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const response = await fetch(`/customerDetails/${customerID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch customer details');
                }
                const customerDetails = await response.json();
                setCustomer(customerDetails);
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch customer details');
            }
        };

        fetchCustomerDetails();
    }, [customerID]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!customer) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1 style={{ fontWeight: 'bold', paddingTop: '1rem', color: 'darkslateblue' }}>Customer Info</h1>
            <hr />
            <div className="card mt-4">
                <div className="card-body">
                    <p className="card-text"><strong>Customer ID:</strong> {customer.customerID}</p>
                    <p className="card-text"><strong>Customer Name:</strong> {customer.name}</p>
                    <p className="card-text"><strong>Customer Surname:</strong> {customer.surname}</p>
                    <p className="card-text"><strong>Account ID's:</strong> {customer.accountIDs.join(', ')}</p>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetails;
