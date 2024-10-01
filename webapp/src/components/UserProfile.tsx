import React, { useEffect, useState } from 'react';
import axios from '../axios.config';
import { BookInCart } from '../context/CartContext';

interface Order {
  _id: string;
  items: BookInCart[];
  total: number;
  createdAt: string;
}

interface UserProfileData {
  profile: {
    _id: string;
    name: string;
    email: string;
  };
  orders: Order[];
}

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios().get<UserProfileData>('/users/profile');
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
          <strong>Name:</strong> {userData.profile._id}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {userData.profile.email}
        </p>
      </div>

      {/* User Orders Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Orders</h2>
        {userData.orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          userData.orders.map((order) => (
            <div key={order._id} className="mb-6 border-b pb-4">
              <h3 className="text-xl font-semibold mb-2">
                Order ID: {order._id}
              </h3>
              <p className="mb-2">
                <strong>Order Date:</strong>{' '}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="mb-2">
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </p>

              <div>
                <h4 className="font-semibold">Items:</h4>
                <ul className="list-disc list-inside">
                  {order.items.map((item) => (
                    <li key={item._id} className="ml-5">
                      {item.title} - {item.quantity} × ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
