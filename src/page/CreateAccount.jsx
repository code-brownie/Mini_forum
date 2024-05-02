import React, { useState } from 'react';

const CreateAccountForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        customerID: '',
        bankID: '',
        balance: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/createAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.errorMessage || 'Failed to create account');
            } else {
                // Handle successful account creation (e.g., redirect user)
                console.log('Account created successfully');
            }
        } catch (error) {
            console.error('Error:', error.message);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="container">
            <h1 style={{ fontWeight: 'bold', paddingTop: '1rem', color: 'darkslateblue' }}>Create Account</h1>
            <hr />
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="customerID">Verify Your ID:</label>
                    <input type="text" className="form-control" name="customerID" value={formData.customerID} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="bankID">Bank ID:</label>
                    <input type="text" className="form-control" name="bankID" value={formData.bankID} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="balance">Balance:</label>
                    <input type="text" className="form-control" name="balance" value={formData.balance} onChange={handleChange} required />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Create Account</button>
                <a href="/customerHome" className="btn btn-secondary">Home Page</a>
            </form>
        </div>
    );
}

export default CreateAccountForm;
