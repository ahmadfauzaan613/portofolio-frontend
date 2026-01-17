import { Briefcase, History, LayoutDashboard, Lock, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { useUpdatePassword } from '../hooks/Auth/updatePassword'
import { useLogout } from '../hooks/Auth/useLogOut'
import UpdatePasswordModal from './UpdatePasswordModal'

const items = [
  { title: 'Profile', url: '/admin/profile', icon: Settings },
  { title: 'Experience', url: '/admin/experience', icon: LayoutDashboard },
  { title: 'Portfolios', url: '/admin/portfolios', icon: Briefcase },
  { title: 'API Logs', url: '/admin/logs', icon: History },
]

export default function AppSidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const { mutate, isPending } = useLogout()

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        navigate('/admin')
      },
    })
  }

  const { mutate: updatePassword, isPending: pendingUpdate } = useUpdatePassword()

  const handleUpdatePassword = (data: { oldPassword: string; newPassword: string }) => {
    updatePassword(data, {
      onSuccess: () => {
        setIsModalOpen(false)
      },
    })
  }

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
              <SidebarMenuButton onClick={handleLogout} disabled={isPending} className="">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">{isPending ? 'Logging out...' : 'Logout'}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <UpdatePasswordModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleUpdatePassword}
        isLoading={pendingUpdate}
      />
    </>
  )
}
