import { createContext, useContext, useEffect, useState, type ReactNode, type SetStateAction } from "react";
import type { User } from '../../types/user'

interface UserContextType {
    user: User | null;
    loading: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setLoading: React.Dispatch<SetStateAction<boolean>>
}

interface UserContextProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    })
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);
    
    return (
        <UserContext.Provider
            value={{
                user,
                loading,
                setUser,
                setLoading
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
};
