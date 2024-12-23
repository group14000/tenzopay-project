import React from "react";
import { Calendar, CircleUserRound, Home, Inbox, LogOut, Search } from "lucide-react";
import { AppDispatch } from '@/app/store';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/components/features/auth/loginSlice";

const AppSidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const items = [
    {
      title: "Home",
      to: "/home",
      icon: Home,
    },
    {
      title: "Inbox",
      to: "/inbox",
      icon: Inbox,
    },
    {
      title: "Calendar",
      to: "/calendar",
      icon: Calendar,
    },
    {
      title: "Account",
      to: "/search",
      icon: Search,
    },
    {
      title: "Settings",
      to: "/account",
      icon: CircleUserRound,
    },
  ];

  return (
    <Sidebar className="h-full w-64 bg-gradient-to-b from-blue-600 to-indigo-800 text-white shadow-lg">
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-semibold mb-4">Tenzopay</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-2">
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.to} 
                      className="flex items-center gap-4 px-3 py-2 rounded-md text-purple-700 hover:bg-gray-300 transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-indigo-700">
        <Button 
          className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-500 rounded-md transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          LogOut
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
