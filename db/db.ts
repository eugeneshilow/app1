import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { chatsTable, messagesTable, profilesTable } from "./schema";

config({ path: ".env.local" })

const schema = {
    profiles: profilesTable,
    messages: messagesTable,
    chats: chatsTable
}

const client = postgres(process.env.DATABASE_URL!)

export const db = drizzle(client, { schema })