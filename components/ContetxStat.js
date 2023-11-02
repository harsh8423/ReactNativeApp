import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContextApi from './ContextApi';

const ContextStat = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        // Retrieve user data from AsyncStorage
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
            console.log("userdataaaaaaa.....",userData)
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error retrieving user data: ', error);
      }
    };

    getUserData();
  }, []);

  return (
    <ContextApi.Provider value={{ user, setUser }}>
      {props.children}
    </ContextApi.Provider>
  );
};

export default ContextStat;
