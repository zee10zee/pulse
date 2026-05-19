// src/actions/users.ts
import { eq, like, or, sql, and } from 'drizzle-orm';
import { db } from '../db';
import { usersTable, InsertUser, SelectUser } from '../schema/users';
import { postsTable } from '../schema/posts';

// ============================================
// CREATE operations
// ============================================

/**
 * Create a single user
 */
export async function createUser(data: InsertUser): Promise<SelectUser> {
  const [user] = await db.insert(usersTable).values(data).returning();
  return user;
}

/**
 * Create multiple users at once
 */
export async function createManyUsers(data: InsertUser[]): Promise<SelectUser[]> {
  if (!data.length) return [];
  
  const users = await db.insert(usersTable).values(data).returning();
  return users;
}

/**
 * Create user if email doesn't exist (skip duplicates)
 */
export async function createUserIfNotExists(data: InsertUser): Promise<SelectUser | null> {
  const [existingUser] = await db.select().from(usersTable).where(eq(usersTable.email, data.email));
  
  if (existingUser) {
    console.log(`User with email ${data.email} already exists`);
    return null;
  }
  
  const [newUser] = await db.insert(usersTable).values(data).returning();
  return newUser;
}

// ============================================
// READ operations
// ============================================

/**
 * Get all users
 */
export async function getAllUsers(): Promise<SelectUser[]> {
  return await db.select().from(usersTable);
}

/**
 * Get user by ID
 */
export async function getUserById(id: number): Promise<SelectUser | undefined> {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id));
  return user;
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<SelectUser | undefined> {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
  return user;
}

/**
 * Get users by name (partial match, case insensitive)
 */
export async function searchUsersByName(name: string): Promise<SelectUser[]> {
  return await db.select()
    .from(usersTable)
    .where(like(usersTable.name, `%${name}%`));
}

/**
 * Get users with pagination
 */
export async function getUsersPaginated(page: number = 1, limit: number = 10): Promise<{
  users: SelectUser[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const offset = (page - 1) * limit;
  
  // Get paginated users
  const users = await db.select()
    .from(usersTable)
    .limit(limit)
    .offset(offset);
  
  // Get total count
  const [result] = await db.select({ count: sql<number>`count(*)` }).from(usersTable);
  const total = result.count;
  
  return {
    users,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Get user with their posts (joined query)
 */
export async function getUserWithPosts(userId: number): Promise<{
  user: SelectUser | undefined;
  posts: any[];
}> {
  const user = await getUserById(userId);
  
  if (!user) {
    return { user: undefined, posts: [] };
  }
  
  const posts = await db.select()
    .from(postsTable)
    .where(eq(postsTable.ownerId, userId));
  
  return { user, posts };
}

/**
 * Check if user exists by email
 */
export async function userExists(email: string): Promise<boolean> {
  const [user] = await db.select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, email));
  
  return !!user;
}

/**
 * Get users by multiple IDs
 */
export async function getUsersByIds(ids: number[]): Promise<SelectUser[]> {
  if (!ids.length) return [];
  
  return await db.select()
    .from(usersTable)
    .where(sql`${usersTable.id} IN (${sql.join(ids, sql.raw(', '))})`);
}

// ============================================
// UPDATE operations
// ============================================

/**
 * Update user by ID
 */
export async function updateUser(
  id: number, 
  data: Partial<InsertUser>
): Promise<SelectUser | undefined> {
  const [updatedUser] = await db.update(usersTable)
    .set({
      ...data,
      // updatedAt would go here if you had a timestamp column
    })
    .where(eq(usersTable.id, id))
    .returning();
  
  return updatedUser;
}

/**
 * Update user by email
 */
export async function updateUserByEmail(
  email: string, 
  data: Partial<InsertUser>
): Promise<SelectUser | undefined> {
  const [updatedUser] = await db.update(usersTable)
    .set(data)
    .where(eq(usersTable.email, email))
    .returning();
  
  return updatedUser;
}

/**
 * Update or create user (upsert)
 */
export async function upsertUser(
  email: string,
  data: InsertUser
): Promise<SelectUser> {
  const existingUser = await getUserByEmail(email);
  
  if (existingUser) {
    const [updated] = await db.update(usersTable)
      .set(data)
      .where(eq(usersTable.email, email))
      .returning();
    return updated;
  }
  
  const [created] = await db.insert(usersTable).values(data).returning();
  return created;
}

// ============================================
// DELETE operations
// ============================================

/**
 * Delete user by ID (posts will be cascade deleted due to foreign key)
 */
export async function deleteUser(id: number): Promise<boolean> {
  const result = await db.delete(usersTable).where(eq(usersTable.id, id));
  return result.rowCount > 0;
}

/**
 * Delete user by email
 */
export async function deleteUserByEmail(email: string): Promise<boolean> {
  const result = await db.delete(usersTable).where(eq(usersTable.email, email));
  return result.rowCount > 0;
}

/**
 * Delete multiple users by IDs
 */
export async function deleteManyUsers(ids: number[]): Promise<number> {
  if (!ids.length) return 0;
  
  const result = await db.delete(usersTable)
    .where(sql`${usersTable.id} IN (${sql.join(ids, sql.raw(', '))})`);
  
  return result.rowCount;
}

/**
 * Delete all users (use with caution!)
 */
export async function deleteAllUsers(): Promise<number> {
  const result = await db.delete(usersTable);
  return result.rowCount;
}

// ============================================
// BULK operations
// ============================================

/**
 * Bulk insert or update users
 */
export async function bulkUpsertUsers(users: InsertUser[]): Promise<SelectUser[]> {
  const results: SelectUser[] = [];
  
  for (const user of users) {
    const result = await upsertUser(user.email, user);
    results.push(result);
  }
  
  return results;
}

// ============================================
// STATISTICS & AGGREGATION
// ============================================

/**
 * Get total user count
 */
export async function getUserCount(): Promise<number> {
  const [result] = await db.select({ count: sql<number>`count(*)` }).from(usersTable);
  return result.count;
}

/**
 * Get user statistics
 */
export async function getUserStats(): Promise<{
  totalUsers: number;
  usersWithPosts: number;
  averagePostsPerUser: number;
}> {
  const totalUsers = await getUserCount();
  
  // Get users who have posts
  const usersWithPostsResult = await db
    .select({ count: sql<number>`count(distinct ${postsTable.ownerId})` })
    .from(postsTable);
  const usersWithPosts = usersWithPostsResult[0].count;
  
  // Get average posts per user
  const avgResult = await db
    .select({ avg: sql<number>`avg(post_count)` })
    .from(
      db
        .select({ post_count: sql<number>`count(*)` })
        .from(postsTable)
        .groupBy(postsTable.ownerId)
        .as('user_posts')
    );
  
  const averagePostsPerUser = avgResult[0]?.avg || 0;
  
  return {
    totalUsers,
    usersWithPosts,
    averagePostsPerUser,
  };
}

// ============================================
// VALIDATION helpers
// ============================================

/**
 * Validate user data before insert/update
 */
export function validateUserData(data: Partial<InsertUser>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (data.name !== undefined) {
    if (!data.name.trim()) {
      errors.push('Name cannot be empty');
    }
    if (data.name.length > 255) {
      errors.push('Name must be less than 255 characters');
    }
  }
  
  if (data.email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }
    if (data.email.length > 255) {
      errors.push('Email must be less than 255 characters');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate and create user (with validation)
 */
export async function createUserValidated(data: InsertUser): Promise<{
  success: boolean;
  user?: SelectUser;
  errors?: string[];
}> {
  const validation = validateUserData(data);
  
  if (!validation.valid) {
    return { success: false, errors: validation.errors };
  }
  
  try {
    const user = await createUser(data);
    return { success: true, user };
  } catch (error: any) {
    if (error.message?.includes('unique constraint')) {
      return { success: false, errors: ['Email already exists'] };
    }
    return { success: false, errors: [error.message] };
  }
}