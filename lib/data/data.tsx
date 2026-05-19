
// posts interface and array
export interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    ownerId?: number;
}

// users interface and array
export interface User {
    id: number;
    name: string;
    email: string;
}



// give me 5 posts with id, title and content
export const posts: Post[] = [
    {
        id: 1,
        title: "First Post",
        content: "This is the content of the first post.",
        createdAt: new Date(),
        ownerId: 1
    },
    {
        id: 2,
        title: "Second Post",
        content: "This is the content of the second post.",
        createdAt: new Date(),
        ownerId: 2
    },
    {
        id: 3,
        title: "Third Post",
        content: "This is the content of the third post.",
        createdAt: new Date(),
        ownerId: 3
    },
    {
        id: 4,
        title: "Fourth Post",
        content: "This is the content of the fourth post.",
        createdAt: new Date(),
        ownerId: 1
    },
    {
        id: 5,
        title: "Fifth Post",
        content: "This is the content of the fifth post.",
        createdAt: new Date(),
        ownerId: 2
    }
]



// 5 users too
export const users: User[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com"
    },
    {
        id: 3,
        name: "Bob Johnson",
        email: "bob.johnson@example.com"
    },

]