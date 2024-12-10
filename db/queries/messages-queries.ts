"use server"

import { db } from "@/db/db"
import { InsertMessage, messagesTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export const createMessage = async (data: InsertMessage) => {
  try {
    const [newMessage] = await db.insert(messagesTable).values(data).returning()
    return newMessage
  } catch (error) {
    console.error("Error creating message:", error)
    throw new Error("Failed to create message")
  }
}

export const getMessages = async (userId: string) => {
  try {
    return db.query.messages.findMany({
      where: eq(messagesTable.userId, userId),
      orderBy: (messages) => messages.createdAt
    })
  } catch (error) {
    console.error("Error getting messages:", error)
    throw new Error("Failed to get messages")
  }
}

export const deleteMessage = async (id: string) => {
  try {
    const [deletedMessage] = await db
      .delete(messagesTable)
      .where(eq(messagesTable.id, id))
      .returning()
    return deletedMessage
  } catch (error) {
    console.error("Error deleting message:", error)
    throw new Error("Failed to delete message")
  }
} 