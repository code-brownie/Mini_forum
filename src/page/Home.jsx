import React from 'react';

const Home = () => {
    return (
        <div className="container">
            <h1 className="title">Cross Border Payment System</h1>
            <hr />
            <div className="content">
                <div className="btn-group">
                    <div className="container">
                        <div>
                            <a href="/createBank" className="btn btn-primary">Bank LogIn/SignUp</a>
                        </div>
                    </div>
                    <div className="container">
                        <div>
                            <a href="/signup" className="btn btn-primary">Customer LogIn/SignUp</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
