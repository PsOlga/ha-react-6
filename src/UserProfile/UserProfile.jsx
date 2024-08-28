import React, { useState, useEffect } from 'react';
import axios from "axios";
import styles from "./stiles.module.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Функция для загрузки данных пользователя
  const fetchUser = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/");
      setUser(response.data.results[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the user data", error);
    }
  };

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    fetchUser();
  }, []);

  // Условие для отображения загрузки или данных пользователя
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profileBody}>
        <div className={styles.profileContainer}>
      <img
        src={user.picture.large}
        alt={user.name.first} {...user.name.last}
      />
      <h1>
        {user.name.first} {user.name.last}
      </h1>
      <p>Email: {user.email}</p>
      <p>
        Location: {user.location.city}, {user.location.country}
      </p>
      <button onClick={fetchUser}>Load New User</button>
    </div>
    </div>
  );
};


export default UserProfile;