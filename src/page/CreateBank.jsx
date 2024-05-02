import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const BankPage = () => {
    const [error, setError] = useState('');
    const [loginFormData, setLoginFormData] = useState({
        bankadminID: '',
        bankID: '',
        password: ''
    });
    const [signupFormData, setSignupFormData] = useState({
        bankadminID: '',
        bankID: '',
        password: '',
        name: '',
        country: '',
        currency: '',
        reserves: ''
    });
    const navigate = useNavigate();
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData({ ...loginFormData, [name]: value });
    };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupFormData({ ...signupFormData, [name]: value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/loginBank', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginFormData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to log in');
            }

            navigate('/bankHome');
        } catch (error) {
            console.error('Error:', error.message);
            setError('invalid_credentials');
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/createBank', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupFormData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create bank');
            }


        } catch (error) {
            console.error('Error:', error.message);
            setError('invalid_user'); // Set error state to display error message
        }
    };
    return (
        <div className="content">
            <div className="container">
                <h1 className="mt-4 title">Bank LogIn</h1>
                <hr />
                {error === 'invalid_credentials' && (
                    <div className="alert alert-danger">Invalid username or password. Please try again.</div>
                )}
                <form onSubmit={handleLoginSubmit}>
                    <div className="form-group">
                        <label htmlFor="bankadminID">Bank Admin ID:</label>
                        <input type="text" className="form-control" name="bankadminID" value={loginFormData.bankadminID} onChange={handleLoginChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bankID">Bank ID:</label>
                        <input type="text" className="form-control" name="bankID" value={loginFormData.bankID} onChange={handleLoginChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" name="password" value={loginFormData.password} onChange={handleLoginChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="container">
                <h1 className="mt-4 title">Bank SignUp</h1>
                <hr />
                {error === 'invalid_user' && (
                    <div className="alert alert-danger">Invalid admin.</div>
                )}
                <form onSubmit={handleSignupSubmit}>
                    <div className="form-group">
                        <label htmlFor="bankadminID">Bank Admin ID:</label>
                        <input type="text" className="form-control" name="bankadminID" value={signupFormData.bankadminID} onChange={handleSignupChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bankID">Bank ID:</label>
                        <input type="text" className="form-control" name="bankID" value={signupFormData.bankID} onChange={handleSignupChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" name="password" value={signupFormData.password} onChange={handleSignupChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Bank Name:</label>
                        <input type="text" className="form-control" name="name" value={signupFormData.name} onChange={handleSignupChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country:</label>
                        <input type="text" className="form-control" name="country" value={signupFormData.country} onChange={handleSignupChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="currency">Currency:</label>
                        <input type="text" className="form-control" name="currency" value={signupFormData.currency} onChange={handleSignupChange} required pattern="^[A-Z]{3}$" title="Please enter in standart format (EUR, USD ...)" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reserves">Reserves:</label>
                        <input type="number" className="form-control" name="reserves" value={signupFormData.reserves} onChange={handleSignupChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Create Bank</button>
                </form>
            </div>
        </div>
    );
};

export default BankPage;
