"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { PlusIcon, UserIcon } from "lucide-react"

export default function ChatSidebar() {
  const chats = [
    { id: "1", title: "Привет как дела" },
    { id: "2", title: "Meaning of asdf" },
    { id: "3", title: "Relax Etymology Explained" },
    { id: "4", title: "Ansible vs Jenkins Сравнение" },
  ]

  return (
    <div className="w-64 border-r border-border">
      <Card className="h-full rounded-none border-none">
        <CardHeader className="flex items-center justify-between px-4 py-4">
          <div>
            <CardTitle className="text-sm font-medium">
              Chats
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Manage your conversations
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            <PlusIcon className="h-4 w-4" />
          </Button>
        </CardHeader>

        <Separator />

        <ScrollArea className="flex-1">
          <div className="px-4 py-2">
            <div className="mb-2 text-xs font-semibold text-muted-foreground">
              Today
            </div>
            <Button variant="ghost" className="w-full justify-start px-2 py-3 text-sm hover:bg-accent hover:text-accent-foreground">
              Привет как дела
            </Button>
          </div>

          <Separator />

          <div className="px-4 py-2">
            <div className="mb-2 text-xs font-semibold text-muted-foreground">
              Previous 7 Days
            </div>
            {chats.slice(1, 3).map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                className="w-full justify-start px-2 py-3 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                {chat.title}
              </Button>
            ))}
          </div>

          <Separator />

          <div className="px-4 py-2">
            <div className="mb-2 text-xs font-semibold text-muted-foreground">
              Previous 30 Days
            </div>
            {chats.slice(3).map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                className="w-full justify-start px-2 py-3 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                {chat.title}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <Separator />

        <div className="flex items-center gap-2 p-4">
          <UserIcon className="h-6 w-6 text-muted-foreground" />
          <span className="text-sm text-foreground">My Account</span>
        </div>
      </Card>
    </div>
  )
}
