"use client"

import Loading from '@/components/Loading';
import { chat_service, useAppData, User } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import axios from 'axios';
import ChatSidebar from '@/components/ChatSidebar';



const Page = () => {

  const { isAuth, loading, logOutUser, chats, user: loggedInUser, users } = useAppData();

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showAllUser, setShowAllUser] = useState(false);
  const router = useRouter();



  useEffect(() => {
    if (!loading && !isAuth) {
      router.push("/login");
    }
  }, [isAuth, loading, router])

  const handleLogout = () => logOutUser();

  const fetchChat = async () => {
    try {
      const token = Cookies.get("token");
      const { data } = await axios.get(`${chat_service}/api/v1/messages/${selectedUser}`, { headers: { Authorization: `Bearer ${token}` } });

      setUser(data.user.user);
      
    } catch (error) {
      toast.error("Failed to load message");
      console.log(error);
    }
  }

  

  

  

  

  

  

  
  if (loading) return <Loading />;

  return (
    <div className='min-h-screen flex bg-gray-900 text-white relative overflow-hidden'>
      <ChatSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        showAllUsers={showAllUser}
        setShowAllUsers={setShowAllUser}
        users={users}
        loggedInUser={loggedInUser}
        chats={chats}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        handleLogout={handleLogout}
      />

      
    </div>
  )
}

export default Page