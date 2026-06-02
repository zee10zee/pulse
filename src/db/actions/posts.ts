
'use server';

import { eq, desc } from 'drizzle-orm';
import { db } from '../db';
import { postsTable, InsertPost, SelectPost } from '../schema/posts';
import { usersTable } from '../schema/users';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';

export async function createPost(prevState: any,formData: FormData) {
  const title = formData.get('ptitle') as string;
  const content = formData.get('pcontent') as string;
  const file = formData.get('mediaFile') as File;
  const { userId } = await auth();

  if (!title || !content || !file || !userId) {
    throw new Error('Missing required fields');
  }

   console.log(file.name, ' the picked file')
  await new Promise(resolve => setTimeout(resolve, 2000))


  // Create unique filename
    const timestamp = Date.now();
    const safeName = file.name.replaceAll(' ', '_');
    const filename = `${timestamp}-${safeName}`;
    
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await mkdir(uploadDir, { recursive: true });
    
    // Save file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    console.log(buffer, ' the buffer file ', filePath, ' the path file')

    // Step 3: Store path in DB
const imagePath = `/uploads/${filename}`;

  // Type the returned value properly
  const [post] = await db.insert(postsTable).values({
    title: title,
    content: content,
    mediaFile : imagePath,
    ownerId: userId,
  }).returning() as { id: string; title: string; content: string; ownerId: string; createdAt: Date }[];

  if (!post) {
    throw new Error('Failed to create post');
  }

  // You can use post.id or other post data here if needed
  revalidatePath('/');
  redirect('/');
  // return { message: 'Post created successfully!' }
  
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