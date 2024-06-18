import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types'
import axios from '../axios.config'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, role: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const navigate = useNavigate()

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');

            if(location.pathname == "/auth/register"){
                return;
            }

            if (token) {
                const decodedUser = jwtDecode<User>(token);
                setUser(decodedUser);
                setIsAuthenticated(true);
            }else{
                logout(); // Clear invalid/expired token from localStorage
                navigate('/auth/login'); // Redirect to login page
            }
        } catch (err) {
            logout(); // Clear invalid/expired token from localStorage
            navigate('/auth/login'); 
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('/auth/login', { email, password });
            const { accessToken } = response.data;
            localStorage.setItem('token', accessToken);
            const decodedUser = jwtDecode<User>(accessToken);
            setUser(decodedUser);
            setIsAuthenticated(true);
        } catch (error) {
            throw new Error('Login failed');
        }
    };

    const register = async (email: string, password: string, role: string) => {
        try {
            const response = await axios.post('/auth/register', { email, password, role });
            const { accessToken } = response.data;
            localStorage.setItem('token', accessToken);
            const decodedUser = jwtDecode<User>(accessToken);
            setUser(decodedUser);
            setIsAuthenticated(true);
        } catch (error: any) {
            console.log(error)
            throw new Error(error.response.data.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/auth/login')
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
