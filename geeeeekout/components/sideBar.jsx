import React from 'react'
import Image from 'next/image';
import {useToast} from '@/hooks/use-toast'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export default function SideBar({boards, hoverCallback}) {
    const {toast}=useToast()
    const Clicked = (id) => {
        fetch('/api/postit/'+id+'/increment', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }}).then((res) => res.text()).then((data) => {
                toast({title:"Upvoted"})
        })
        console.log(id)
            }
    const buttons= boards.map(function(b) {
        return <SidebarMenuButton key={b.postit_id}
        onMouseEnter={()=>hoverCallback(b.postit_id)} 
        onMouseLeave={()=>hoverCallback(-1)} 
        >
            <div onClick={()=>Clicked(b.postit_id)} className="flex justify-between items-center w-full">
                <p>{b.username}</p>
                <Image alt="arrowUp" src={"/arrowUp.png"} width={10} height={10}/>
            </div>
        </SidebarMenuButton>
    })

  return (
    <SidebarProvider className="!h-[768px] !min-h-0 rounded-md">
      <Sidebar collapsable="none" side="right"varient="inset" className="!absolute mt-25 top-50 !max-h-[768px] rounded-md">
          <SidebarContent className="!relative rounded-md">
              <SidebarGroup className="!relative">
                <SidebarMenu className="!relative">
                    {buttons}
                </SidebarMenu>
              </SidebarGroup>
          </SidebarContent>
      </Sidebar>
      <SidebarInset>
      </SidebarInset>
</SidebarProvider>
  )
}
