import { eq, desc } from 'drizzle-orm';
import { db } from '../db';
import { postsTable, InsertPost, SelectPost } from '../schema/posts';

export async function createPost(data: InsertPost): Promise<SelectPost> {
  const [post] = await db.insert(postsTable).values(data).returning();
  return post;
}

export async function getUserPosts(userId: number): Promise<SelectPost[]> {
  return await db.select()
    .from(postsTable)
    .where(eq(postsTable.ownerId, userId))
    .orderBy(desc(postsTable.createdAt));
}

export async function updatePost(id: number, data: Partial<InsertPost>) {
  const [post] = await db.update(postsTable)
    .set(data)
    .where(eq(postsTable.id, id))
    .returning();
  return post;
}

// Add post-specific operations
export async function getRecentPosts(limit: number = 10) {
  return await db.select()
    .from(postsTable)
    .orderBy(desc(postsTable.createdAt))
    .limit(limit);
}