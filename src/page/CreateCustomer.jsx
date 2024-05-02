import React, { useState } from 'react';

const CustomerPage = () => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        customerID: '',
        customerPassword: '',
        customerName: '',
        customerSurname: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/loginCustomer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerID: formData.customerID,
                    customerPassword: formData.customerPassword
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to log in');
            } else {
                console.log('Login successful');
                // Perform any necessary actions upon successful login
            }
        } catch (error) {
            console.error('Error:', error.message);
            setError(error.message);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerID: formData.customerID,
                    customerName: formData.customerName,
                    customerSurname: formData.customerSurname,
                    customerPassword: formData.customerPassword
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to sign up');
            } else {
                console.log('Signup successful');
                // Perform any necessary actions upon successful signup
            }
        } catch (error) {
            console.error('Error:', error.message);
            setError(error.message);
        }
    };

    return (
        <div className="content">
            <div className="container">
                <h1 className="mt-4 title">Customer LogIn</h1>
                <hr />
                {error === 'invalid_credentials' && (
                    <div className="alert alert-danger">Invalid username or password. Please try again.</div>
                )}
                <form onSubmit={handleLoginSubmit}>
                    <div className="form-group">
                        <label htmlFor="customerID">Customer ID:</label>
                        <input type="text" className="form-control" name="customerID" value={formData.customerID} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="customerPassword">Password:</label>
                        <input type="password" className="form-control" name="customerPassword" value={formData.customerPassword} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="container">
                <h1 className="mt-4 title">Customer SignUp</h1>
                <hr />
                {error === 'invalid_password' && (
                    <div className="alert alert-danger">Invalid password: must contain numbers and letters and must be at least 8 characters!</div>
                )}
                {error === 'same_user' && (
                    <div className="alert alert-danger">This username was created in the system. Please enter a new username try.</div>
                )}
                <form onSubmit={handleSignupSubmit}>
                    <div className="form-group">
                        <label htmlFor="customerID">Customer ID:</label>
                        <input type="text" className="form-control" name="customerID" value={formData.customerID} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="customerPassword">Password:</label>
                        <input type="password" className="form-control" name="customerPassword" value={formData.customerPassword} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="customerName">Name:</label>
                        <input type="text" className="form-control" name="customerName" value={formData.customerName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="customerSurname">Surname:</label>
                        <input type="text" className="form-control" name="customerSurname" value={formData.customerSurname} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default CustomerPage;
