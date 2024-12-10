import { eq } from "drizzle-orm";
import { db } from "../db";
import { InsertProfile, profilesTable } from "../schema";


// 1. CRUD - Create
export const createProfile = async (data: InsertProfile) => {
    try {
        const [newProfile] = await db.insert(profilesTable).values(data).returning();
        return newProfile;
    } catch (error) {
        console.error("Error creating profile", error)
        throw new Error("Failed to create profile")
    }
}

// 2. CRUD - Read
export const getProfileByUserId = async (userId: string) => {
    try {
        const profile = await db.query.profiles.findFirst({
            where: eq(profilesTable.userId, userId)
        })
        return profile
    } catch (error) {
        console.error("Error getting profile by user id", error)
        throw new Error("Failed to get profile by user id")
    }
}

// 3. CRUD - Update
export const updateProfileByUserId = async (
    userId: string,
    data: Partial<InsertProfile>
) => {
    try {
        const [updatedProfile] = await db
            .update(profilesTable)
            .set(data)
            .where(eq(profilesTable.userId, userId))
            .returning()
        return updatedProfile
    } catch (error) {
        console.error("Error updating profile", error)
        throw new Error("Failed to update profile")
    }
}

export const updateProfileByStripeCustomerId = async (
    stripeCustomerId: string,
    data: Partial<InsertProfile>
) => {
    try {
        const [updatedProfile] = await db
            .update(profilesTable)
            .set(data)
            .where(eq(profilesTable.stripeCustomerId, stripeCustomerId))
            .returning()
        return updatedProfile
    } catch (error) {
        console.error("Error updating profile by stripe customer id", error)
        throw new Error("Failed to update profile by stripe customer id")
    }
}

// 4. CRUD - Delete
export const deleteProfileByUserId = async (userId: string) => {
    try {
        await db.delete(profilesTable).where(eq(profilesTable.userId, userId))
    } catch (error) {
        console.error("Error deleting profile", error)
        throw new Error("Failed to delete profile")
    }
}