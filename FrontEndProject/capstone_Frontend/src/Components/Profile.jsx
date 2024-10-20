import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';

const Profile = () => {
  const { userID } = useContext(UserContext);
  const [user, setUser] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getUser/${userID}`);
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [userID]);


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div style={styles.container}>
      <h2>User Profile</h2>
      <div style={styles.card}>
        <h2>{user.fname} {user.lname}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Password:</strong> {user.password}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
    </div>
  );
};

// Basic styling for the component
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  },
};

export default Profile;
