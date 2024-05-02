import React, { useState } from 'react';

const DeleteAccountComponent = () => {
    const [formData, setFormData] = useState({
        customerID: '',
        accountID: '',
        confirmation: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.confirmation !== 'YES') {
            setErrorMessage('You must enter the correct confirmation word to delete the account.');
            return;
        }
        try {
            const response = await fetch('/deleteAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
            } else {
                setErrorMessage(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Failed to delete account.');
        }
    };

    return (
        <div className="container">
            <h1>Delete Account</h1>
            <p>Confirm to delete the account by filling out the form below.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="customerID">Customer ID:</label>
                    <input type="text" className="form-control" id="customerID" name="customerID" value={formData.customerID} onChange={handleChange} placeholder="Enter Customer ID" required />
                </div>
                <div className="form-group">
                    <label htmlFor="accountID">Account ID:</label>
                    <input type="text" className="form-control" id="accountID" name="accountID" value={formData.accountID} onChange={handleChange} placeholder="Enter Account ID" required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmation">Are you sure you want to delete the account? Type "YES" to confirm:</label>
                    <input type="text" className="form-control" id="confirmation" name="confirmation" value={formData.confirmation} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-danger">Delete Account</button>
            </form>
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            {message && (
                <div className="alert alert-success" role="alert">
                    {message}
                </div>
            )}
        </div>
    );
};

export default DeleteAccountComponent;
