
'use server';

import { eq, desc } from 'drizzle-orm';
import { db } from '../db';
import { postsTable, InsertPost, SelectPost } from '../schema/posts';
import { usersTable } from '../schema/users';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

export async function createPost(prevState: any,formData: FormData) {
  const title = formData.get('ptitle') as string;
  const content = formData.get('pcontent') as string;
  const { userId } = await auth();

  if (!title || !content || !userId) {
    throw new Error('Missing required fields');
  }

  await new Promise(resolve => setTimeout(resolve, 2000))

  // Type the returned value properly
  const [post] = await db.insert(postsTable).values({
    title: title,
    content: content,
    ownerId: userId,
  }).returning() as { id: string; title: string; content: string; ownerId: string; createdAt: Date }[];

  if (!post) {
    throw new Error('Failed to create post');
  }

  // You can use post.id or other post data here if needed
  revalidatePath('/');
  redirect('/');
  return { message: 'Post created successfully!' }
  
}

export async function getUserPosts(userId: any ): Promise<SelectPost[]> {
  return await db.select()
    .from(postsTable)
    .where(eq(postsTable.ownerId, userId))
    .orderBy(desc(postsTable.createdAt));
}

// posts details

export async function getPostsWithUsers() {
    const result = await db
        .select({
            id: postsTable.id,
            title: postsTable.title,
            createdAt: postsTable.createdAt,
            ownerName: usersTable.name,     // Flattened fields from users table
            ownerEmail: usersTable.email,
        })
        .from(postsTable)
        .leftJoin(usersTable, eq(postsTable.ownerId, usersTable.id))
        .orderBy(desc(postsTable.createdAt));

    return result;
}

// Fixed function name and type handling
export const getPostDetails = async (postId: any) => {
  
  try {
    const result = await db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        content: postsTable.content,
        createdAt: postsTable.createdAt,
        ownerId: postsTable.ownerId,
        ownerName: usersTable.name,
        ownerEmail: usersTable.email,
      })
      .from(postsTable)
      .leftJoin(usersTable, eq(postsTable.ownerId, usersTable.id))
      .where(eq(postsTable.id, postId)); // Ensure same type
    
    console.log('Query result:', result[0]); // Debug log
    
    if (!result[0]) {
      throw new Error(`Post with id ${postId} not found`);
    }
    
    return result[0];
  } catch (error) {
    console.error('Error fetching post details:', error);
    throw error;
  }
};

// Add post-specific operations
export async function getRecentPosts(limit: number = 10) {
  return await db.select()
    .from(postsTable)
    .orderBy(desc(postsTable.createdAt))
    .limit(limit);
}