import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext()
const AuthContextDispatcher = createContext();


const AuthProvider = ({ children }) => {

    const [state, setstate] = useState(null);

    const userData = JSON.parse(localStorage.getItem("userData")) || false ;

    useEffect(() => {
        setstate(userData);
    }, [])


    return (
        <AuthContext.Provider value={state}>
            <AuthContextDispatcher.Provider value={setstate}>
                {children}
            </AuthContextDispatcher.Provider>
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext)

export const useAuthAction = () => useContext(AuthContextDispatcher)