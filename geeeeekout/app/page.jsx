'use client'
import { Button } from "@/components/ui/button"

import { useToast } from "@/hooks/use-toast"

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from 'next/link'
import { Label } from "@/components/ui/label"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { const } from './../node_modules/signal-exit/dist/mjs/index';


export default function landing() {
  const {toast} = useToast()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cfmPassword, setcfmPassword] = useState('');
  const [loginO, setloginO] = useState(false);
  const [singupO, setsignupO] = useState(false);
  const [isWrong, setisWrong] = useState(false);
  const [isDifferentPassword, setDiferentPassword] = useState(false);

  const handleSubmissionLogin = async () => {

    const data = {
      username: username,
      userPw: password
    }

    const response = await fetch('/api/users/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
  
    if (response.status === 401) {
      toast({
        title:"Wrong username or password",
        description:"Please try again",
        variant: "destructive",
      })
    }

    if (response.status === 200) {
      const data = await response.json()
      localStorage.setItem('user_id', data[0].user_id)
      window.location.href = '/home'
    }
  }

  const handleSubmissionSignup = async () => {
    if (password !== cfmPassword) {
      setDiferentPassword(true)
      return
    }
    const data = {
      username: username,
      password: password
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
  
    if (response.status === 500) {
      toast({
        title:"Username already exists",
        description:"Please try again",
        variant: "destructive",
      })
    }

    if (response.status === 200) {
      const data = await response.json()
      localStorage.setItem('user_id', data)
      window.location.href = '/home'
    }
  }
  
  const click = () => {
    
    if (loginO) {
      handleSubmissionLogin()
    }

    if (singupO) {
      handleSubmissionSignup()
    }

  }
  const signup = () => {
    setloginO(false)
    setsignupO(true)
  }
  return (
    <>
      <NavigationMenu className={"flex justify-end max-w-full"}>
        <NavigationMenuList>
          <Dialog open={loginO} onOpenChange={setloginO}>
            <DialogTrigger>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Login
              </NavigationMenuLink>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log in</DialogTitle>
                <DialogDescription>
                  Login or Sign up
                </DialogDescription>
              </DialogHeader>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Geeker43"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" onClick={click}>Submit</Button>
              {isWrong && <div className="text-red-500">Wrong username or password</div>}
              <div className="text-center -mt-3">
                or<br />
                <div onClick={signup} className="text-stone-500 hover:cursor-pointer max-w-content">
                  <u className="text-[14px]">Sign Up</u>
                </div>
              </div>

            </DialogContent>
          </Dialog>
        </NavigationMenuList>
      </NavigationMenu>

      

      <Dialog open={singupO} onOpenChange={setsignupO}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign up</DialogTitle>
            <DialogDescription>
              Sign up
            </DialogDescription>
          </DialogHeader>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Geeker43"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Confirm Password</Label>
            <Input type="password" placeholder="Password"
              onChange={(e) => setcfmPassword(e.target.value)} />
            {isDifferentPassword && <div className="text-red-500">Passwords do not match</div>}
          </div>
          <Button type="submit" onClick={click}>Submit</Button>
        </DialogContent>
      </Dialog>

    </>
  );
}
