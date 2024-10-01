import React, { useEffect, useState } from 'react';
import axios from '../axios.config';


const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/users/profile');
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load user profile. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  },[]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!userData) {
    return <div className="text-center mt-10">No user data available.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-5 mt-10">
      <h1 className="text-3xl font-bold mb-5">User Profile</h1>
      {/* User Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
        <p className="mb-2">
          <strong>Name:</strong> {userData._id}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {userData.email}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
