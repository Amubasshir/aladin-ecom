import Header from '@/components/dashboard/header/header';
import CustomSidebar from '@/components/dashboard/sidebar/sidebar';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user || user.privateMetadata.role !== 'ADMIN') redirect('/');
  return (
    <div className="w-full h-full">
      <CustomSidebar />
      <div className="w-full ml-[300px]">
        <Header />
        <div className="w-full mt-[75px] p-4">{children}</div>
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
