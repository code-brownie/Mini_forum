import React, { useState } from 'react';

const UpdateBalanceForm = () => {
    const [formData, setFormData] = useState({
        accountID: '',
        amount: ''
    });
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/updateBalance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Account balance update failed.');
        }
    };

    return (
        <div className="container">
            <h1>Deposit/Withdraw Money</h1>
            {message && <div className="alert alert-success">{message}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="accountID">Account ID:</label>
                    <input type="text" className="form-control" id="accountID" name="accountID"
                        value={formData.accountID} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" className="form-control" id="amount" name="amount"
                        value={formData.amount} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
            <a href="/customerHome" className="btn btn-secondary">Back</a>
        </div>
    );
};

export default UpdateBalanceForm;
