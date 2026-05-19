import { posts, users } from "@/lib/data/data";
import { db } from "./db";
import { usersTable } from "./schema/users";
import { postsTable } from "./schema/posts";

async function testInsert(data,table) {
  console.log('📝 Test 2: Insert multiple users at once');
  
  try {
    // Clean the data - remove hardcoded IDs if they exist
    const cleanData = data.map(({ id, ...user }) => user);
    // This removes the 'id' field so the database can generate its own
    
    const multipleRows = await db.insert(table)
      .values(cleanData)
      .returning();
    
    // ✅ Correct condition check
    if (multipleRows.length === 0) {
      console.log('❌ Failure: No users were inserted');
      return;
    }
    
    console.log(`✅ Success: Inserted ${multipleRows.length} users`);
    console.log('   Inserted users:', multipleRows);
    
    return multipleRows;
    
  } catch (error) {
    console.error('❌ Failed to insert users:', error);
    throw error;
  }
}

// Run the test
testInsert(posts, postsTable);