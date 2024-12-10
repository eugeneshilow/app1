"use server"

import { db } from "@/db/db"
import { chatsTable, InsertChat, messagesTable } from "@/db/schema"
import { desc, eq } from "drizzle-orm"

export const createChat = async (data: InsertChat) => {
  try {
    const [newChat] = await db.insert(chatsTable).values(data).returning()
    return newChat
  } catch (error) {
    console.error("Error creating chat:", error)
    throw new Error("Failed to create chat")
  }
}

export const getChats = async (userId: string) => {
  try {
    return db.query.chats.findMany({
      where: eq(chatsTable.userId, userId),
      orderBy: (chats) => chats.updatedAt,
      with: {
        messages: {
          orderBy: (messages: typeof messagesTable) => desc(messages.createdAt)
        }
      }
    })
  } catch (error) {
    console.error("Error getting chats:", error)
    throw new Error("Failed to get chats")
  }
}

export const getChat = async (id: string) => {
  try {
    return db.query.chats.findFirst({
      where: eq(chatsTable.id, id),
      with: {
        messages: {
          orderBy: (messages: typeof messagesTable) => desc(messages.createdAt)
        }
      }
    })
  } catch (error) {
    console.error("Error getting chat:", error)
    throw new Error("Failed to get chat")
  }
}

export const deleteChat = async (id: string) => {
  try {
    const [deletedChat] = await db
      .delete(chatsTable)
      .where(eq(chatsTable.id, id))
      .returning()
    return deletedChat
  } catch (error) {
    console.error("Error deleting chat:", error)
    throw new Error("Failed to delete chat")
  }
}

export const updateChatTitle = async (id: string, title: string) => {
  try {
    const [updatedChat] = await db
      .update(chatsTable)
      .set({ title })
      .where(eq(chatsTable.id, id))
      .returning()
    return updatedChat
  } catch (error) {
    console.error("Error updating chat title:", error)
    throw new Error("Failed to update chat title")
  }
} 