"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast'


export const user_service = process.env.NEXT_PUBLIC_USER_SERVICE as string;
export const mail_service = process.env.NEXT_PUBLIC_MAIL_SERVICE as string;
export const chat_service = process.env.NEXT_PUBLIC_CHAT_SERVICE as string;

export const AppContext = createContext<any >(undefined)

type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {


    return (
        <AppContext.Provider value={{}}>
            {children}
            <Toaster />
        </AppContext.Provider>
    )
}


export const useAppData = (): any => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("useAppData must be used within an AppProvider")
    }
    return context
}
