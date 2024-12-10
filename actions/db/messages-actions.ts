"use server"

import { createMessage, deleteMessage, getMessages } from "@/db/queries/messages-queries"
import { InsertMessage, SelectMessage } from "@/db/schema"
import { ActionState } from "@/types"
import { revalidatePath } from "next/cache"

export async function createMessageAction(
  message: InsertMessage
): Promise<ActionState<SelectMessage>> {
  try {
    const newMessage = await createMessage(message)
    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Message created successfully",
      data: newMessage
    }
  } catch (error) {
    console.error("Error creating message:", error)
    return { isSuccess: false, message: "Failed to create message" }
  }
}

export async function getMessagesAction(
  userId: string
): Promise<ActionState<SelectMessage[]>> {
  try {
    const messages = await getMessages(userId)
    return {
      isSuccess: true,
      message: "Messages retrieved successfully",
      data: messages
    }
  } catch (error) {
    console.error("Error getting messages:", error)
    return { isSuccess: false, message: "Failed to get messages" }
  }
}

export async function deleteMessageAction(
  id: string
): Promise<ActionState<SelectMessage>> {
  try {
    const deletedMessage = await deleteMessage(id)
    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Message deleted successfully",
      data: deletedMessage
    }
  } catch (error) {
    console.error("Error deleting message:", error)
    return { isSuccess: false, message: "Failed to delete message" }
  }
} 