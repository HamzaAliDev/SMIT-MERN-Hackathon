import React, {createContext, useContext, useEffect, useReducer, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'SET_USER':
      return {
        ...state,
        user: payload,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: payload,
      };
    case 'LOGOUT':
      console.log('Logging out');
      return {
        initialState,
    };
    default:
      return state;
  }
};

const initialState = {
  user: null,
};

export default function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const token = await AsyncStorage.getItem('token');
        console.log("token of current User:", token);
        if (!token) {
          setIsLoading(false);
          return;
        }
        const {data} = await axios.get(
          'http://192.168.1.9:8000/users/me',
          {
            headers: {
              Authorization: token,
            },
          },
        );
        axios.defaults.headers.common['Authorization'] = token;
        dispatch({type: 'SET_USER', payload: data.data});
        
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{...state, dispatch, isLoading, setIsLoading}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);