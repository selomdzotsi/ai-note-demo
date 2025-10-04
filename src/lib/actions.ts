import { auth, currentUser } from "@clerk/nextjs";
import { prisma } from "./prisma";

export async function ensureUserExists() {
  try {
    const { userId } = auth();
    console.log('[ENSURE_USER] Checking user:', userId);
    
    if (!userId) {
      console.log('[ENSURE_USER] No user ID found');
      throw new Error("Unauthorized");
    }

    const user = await currentUser();
    console.log('[ENSURE_USER] Current user:', user?.id);
    
    if (!user) {
      console.log('[ENSURE_USER] No user found');
      throw new Error("User not found");
    }

    // Create or update user in our database
    const dbUser = await prisma.user.upsert({
      where: { id: userId },
      update: {
        email: user.emailAddresses[0]?.emailAddress || "",
        f_name: user.firstName || "",
        l_name: user.lastName || "",
      },
      create: {
        id: userId,
        email: user.emailAddresses[0]?.emailAddress || "",
        f_name: user.firstName || "",
        l_name: user.lastName || "",
      },
    });
    console.log('[ENSURE_USER] User upserted:', dbUser);

    return dbUser;
  } catch (error) {
    console.error('[ENSURE_USER] Error:', error);
    throw error;
  }
}
