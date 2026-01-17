import { Briefcase, History, LayoutDashboard, Lock, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../components/ui/sidebar'
import UpdatePasswordModal from './UpdatePasswordModal'

const items = [
  { title: 'Profile', url: '/admin/profile', icon: Settings },
  { title: 'Experience', url: '/admin/experience', icon: LayoutDashboard },
  { title: 'Portfolios', url: '/admin/portfolios', icon: Briefcase },
  { title: 'API Logs', url: '/admin/logs', icon: History },
]

export default function AppSidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="py-6 px-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center">
              <span className="font-bold">A</span>
            </div>
            <span className="font-bold text-xl tracking-tight group-data-[collapsible=icon]:hidden">
              AdminPanel
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url} className="flex items-center gap-3 py-6">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="mb-5 cursor-pointer"
              >
                <Lock className="w-5 h-5" />
                <span className="font-medium">Update Password</span>
              </SidebarMenuButton>
              <SidebarMenuButton className="">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <UpdatePasswordModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  )
}
