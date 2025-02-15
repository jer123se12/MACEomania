import React from 'react'
import Image from 'next/image';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
   
export default function SideBar({boards, hoverCallback}) {
    const Clicked = (id) => {
        console.log(id)
            }
    const buttons= boards.map(function(b) {
        return <SidebarMenuButton key={b.id}
        onMouseEnter={()=>hoverCallback(b.id)} 
        onMouseLeave={()=>hoverCallback(-1)} 
        >
            <div className="flex justify-between items-center w-full">
                <p>{b.name}</p>
                <Image onClick={()=>Clicked(b.id)}src={"/arrowUp.png"} width={10} height={10}/>
            </div>
        </SidebarMenuButton>
    })

  return (
    <SidebarProvider>
      <Sidebar collapsable="none" side="right"varient="inset">
          <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                    {buttons}
                </SidebarMenu>
              </SidebarGroup>
          </SidebarContent>
      </Sidebar>
</SidebarProvider>
  )
}
