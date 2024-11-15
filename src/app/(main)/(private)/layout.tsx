
import React from 'react'
import AuthGuard from './guard/AuthGuard'
import Navbar from '@/ui/organism/nav/navbar';
import SidebarItems from '@/ui/organism/sidebar/sidebar';


export default function PrivateLayout(
    { children }: { children: React.ReactNode}
) {
  return (
    <div>
      <AuthGuard>
      <SidebarItems />
      <Navbar />
      
      {children}
      </AuthGuard>
    </div>
    
  )
}