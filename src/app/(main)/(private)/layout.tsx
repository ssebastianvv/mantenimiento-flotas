
import React from 'react'
import AuthGuard from './guard/AuthGuard'
import Navbar from '@/ui/organism/nav/navbar';
import SidebarItems from '@/ui/organism/sidebar/sidebar';
import Car from '@/ui/organism/addCar/Newcar';
import PanelCards from '@/ui/organism/cards/PanelCard';

export default function PrivateLayout(
    { children }: { children: React.ReactNode}
) {
  return (
    <div>
      
      <AuthGuard>
      <SidebarItems />
      <Navbar />     
      <Car />
      {children}
      </AuthGuard>
      
    </div>
    
  )
}