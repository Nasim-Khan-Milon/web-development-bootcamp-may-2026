"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast'

export const user_service = process.env.NEXT_PUBLIC_USER_SERVICE as string;
export const mail_service = process.env.NEXT_PUBLIC_MAIL_SERVICE as string;
export const chat_service = process.env.NEXT_PUBLIC_CHAT_SERVICE as string;

export interface User {
    _id: string,
    name: string,
    email: string
}

export interface Chat {
    _id: string,
    users: string[],
    latestMessage: {
        text: string,
        sender: string,
    },
    createdAt: string,
    updatedAt: string,
    unseenCount?: number
}

export interface Chats {
    _id: string,
    user: User,
    chat: Chat
}

interface AppContextType {
    user: User | null,
    loading: boolean,
    isAuth: boolean,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    // setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
    logOutUser: () => Promise<void>;
    fetchUsers: () => Promise<void>;
    users: User[] | null;
    chats: Chats[] | null;
    setChats: React.Dispatch<React.SetStateAction<Chats[] | null>>;
}


export const AppContext = createContext<AppContextType | undefined>(undefined)

type AppProviderProps = {
    children: React.ReactNode;
};


export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [chats, setChats] = useState<Chats[] | null>(null)
    const [users, setUsers] = useState<User[] | null>(null)


    const fetchUser = async () => {
        try {
            const token = Cookies.get("token")
            if (!token) {
                setLoading(false)
                return
            }

            const { data } = await axios.get(`${user_service}/api/user/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(data.user)
            setIsAuth(true)
            setLoading(false)
        } catch (error: unknown) {
            console.error("Error fetching user data:", error);
            setUser(null);
            setIsAuth(false);
        } finally {
            setLoading(false);
        }
    }

    const logOutUser = async () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuth(false);
        toast.success("Logged out successfully");
    }

    const fetchUsers = async () => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                setUsers(null);
                return;
            }
            const { data } = await axios.get(`${user_service}/api/user/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(data.users);
        } catch (error: unknown) {
            console.error("Error fetching users:", error);
            setUsers(null);
        }
    }




    useEffect(() => {
        // if (!isAuth) return;

        fetchUser(),

        fetchUsers()

    }, []);


    return (
        <AppContext.Provider value={{ user, loading, isAuth, setUser, setIsAuth, logOutUser, fetchUsers, users, chats, setChats }}>
            {children}
            <Toaster />
        </AppContext.Provider>
    )
}

export const useAppData = (): AppContextType => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("useAppData must be used within an AppProvider")
    }
    return context
}

