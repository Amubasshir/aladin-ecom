import Logo from '@/components/shared/logo';
import { currentUser } from '@clerk/nextjs/server';
import { FC } from 'react';
import UserInfo from './user-into';

interface SidebarProps {
  isAdmin?: boolean;
}

const CustomSidebar: FC<SidebarProps> = async ({}) => {
  const user = await currentUser();
  return (
    <div className="w-[300px] border-r h-screen p-4 flex flex-col fixed top-0 left-0 bottom-0  ">
      <Logo width="" height="" />
      <span className="ml-3" />
      {user && <UserInfo user={user} />}
    </div>
  );
};

export default CustomSidebar;
