import React from 'react';

const EditProfile = () => {
    return (
        <div className="container">
            <h1>Edit Profile</h1>
            {success ? (
                <div className="alert alert-success" role="alert">
                    Profile successfully updated.
                </div>
            ) : (
                <div className="alert alert-danger" role="alert">
                    Profile update failed. Error: {error}
                </div>
            )}
            <a href="/customerHome" className="btn btn-primary">Main Page</a>
        </div>
    );
}

export default EditProfile;
