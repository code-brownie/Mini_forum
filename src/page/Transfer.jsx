import React, { useState } from 'react';

const TransferForm = () => {
    const [formData, setFormData] = useState({
        senderAccountID: '',
        receiverAccountID: '',
        senderCustomerID: '',
        receiverCustomerID: '',
        amount: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage(data.message);
                setErrorMessage('');
            } else {
                setErrorMessage(data.errorMessage);
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Failed to perform the transfer.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="container">
            <h1>Send Money</h1>
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="senderAccountID">Sender Account ID:</label>
                    <input type="text" className="form-control" id="senderAccountID" name="senderAccountID"
                        placeholder="Enter the Sender Account ID" value={formData.senderAccountID} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="receiverAccountID">Recipient Account ID:</label>
                    <input type="text" className="form-control" id="receiverAccountID" name="receiverAccountID"
                        placeholder="Enter the Recipient Account ID" value={formData.receiverAccountID} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="senderCustomerID">Sender ID:</label>
                    <input type="text" className="form-control" id="senderCustomerID" name="senderCustomerID"
                        placeholder="Enter the Sender ID" value={formData.senderCustomerID} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="receiverCustomerID">Recipient ID:</label>
                    <input type="text" className="form-control" id="receiverCustomerID" name="receiverCustomerID"
                        placeholder="Enter the Recipient ID" value={formData.receiverCustomerID} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" className="form-control" id="amount" name="amount" placeholder="Enter amount"
                        value={formData.amount} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Verify Password:</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password"
                        value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Send Money</button>
                <a href="/customerHome" className="btn btn-secondary">Main Page</a>
            </form>
        </div>
    );
};

export default TransferForm;
