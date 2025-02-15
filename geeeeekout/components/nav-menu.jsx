import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

import Link from 'next/link'
import LogoMed from '@/components/ui/logo_med'

function NavMenu() {
    return (
        <header className="w-full bg-white shadow-md sticky top-0 z-50">
            <div className="w-full flex items-center justify-between py-4 px-8">
                {/* Logo */}
                <a href="/">
                    <LogoMed className="h-[50px]"></LogoMed>
                </a>

                {/* Navigation Menu */}
                <NavigationMenu>
                    <NavigationMenuList className="flex space-x-4">
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/" className="text-gray-700 hover:text-black">
                                Dashboard
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/about" className="text-gray-700 hover:text-black">
                                Account
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    )
}

export default NavMenu