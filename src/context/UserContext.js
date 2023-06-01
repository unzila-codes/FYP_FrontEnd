import {createContext, useState, useEffect} from 'react'
import axios from 'axios'


export const UserContext = createContext();

export const Axios = axios.create({
    baseURL: 'http://localhost/FYP/',
});

export const UserContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Add isLoggedIn state
    const [theUser, setUser] = useState(null);
    const [wait, setWait] = useState(false);



    const loginUser = async ({email,password}) => {
        setWait(true);
        try{
            const {data} = await Axios.post('login.php',{
                email,
                password 
            });
            if(data.success && data.token){
                localStorage.setItem('loginToken', data.token);
                setWait(false);
                setIsLoggedIn(true); 
                return {success:1};
            }
            setWait(false);
            return {success:0, message:data.message};
        }
        catch(err){
            setWait(false);
            return {success:0, message:'Server Error!'};
        }

    }

    const loggedInCheck = async () => {
        const loginToken = localStorage.getItem('loginToken');
        Axios.defaults.headers.common['Authorization'] = 'Bearer ' + loginToken;
        if (loginToken) {
          try {
            const { data } = await Axios.get('getUser.php');
            if (data.success && data.user) {
              setUser(data.user);
              setIsLoggedIn(true); // Update isLoggedIn to true if user data is available
              return;
            }
          } catch (error) {
            console.error('Error retrieving user data:', error);
          }
        }
        setUser(null);
        setIsLoggedIn(false); // Update isLoggedIn to false if user data is not available or if there was an error
      };

      const logout = () => {
        localStorage.removeItem('loginToken');
        setUser(null);
        setIsLoggedIn(false);
        // Add any other necessary cleanup code here
      };

    useEffect(() => {
        async function asyncCall(){
            await loggedInCheck();
        }
        asyncCall();
    },[]);

    // const logout = () => {
    //     localStorage.removeItem('loginToken');
    //     setUser(null);
    // }

    return (
        <UserContext.Provider
        value={{ loginUser, wait, user: theUser, loggedInCheck, isLoggedIn,logout }}
      >
        {children}
      </UserContext.Provider>
    );

}
export default UserContextProvider;