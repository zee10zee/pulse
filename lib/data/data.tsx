
// posts interface and array
export interface Post {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    ownerId?: string;
}

// users interface and array
export interface User {
    id: string;
    name: string;
    email: string;
}



// give me 5 posts with id, title and content
export const posts: Post[] = [
    {
        id: "post-1",
        title: "AI Ex-Boyfriends Created for 'Emotional Healing'",
        content: "In China, a growing trend involves people creating AI versions of their ex-partners. Using an open-source module called ex.skill, users can feed it photos and social media posts from a past relationship to 'talk' to a digital clone that mimics their former flame's conversational style. The creators insist the project is strictly for 'personal reflection and emotional healing,' not harassment.",
        createdAt: new Date('2024-01-15'),
        ownerId: "user-1"
    },
    {
        id: "post-2",
        title: "Man Steals $80,000 in Mac-and-Cheese Fraud",
        content: "A disgruntled former employee of a Chick-fil-A in Grapevine, Texas, allegedly devised a cheesy scheme for revenge. After being fired, Keyshun Jones is accused of returning to the restaurant, hopping behind the counter, and ringing up fake orders for mac and cheese. He would then refund the orders to his own credit cards. Police claim he repeated this trick roughly 800 times, stealing over $80,000 before being arrested.",
        createdAt: new Date('2024-01-20'),
        ownerId: "user-1"
    },
    {
        id: "post-3",
        title: "Robot Wolves Deployed to Fight Bear Attacks",
        content: "Japan is facing a surge in bear attacks, with 13 fatal incidents in the last year and over 50,000 sightings. In response, the company Ohta Seiki is struggling to keep up with demand for their solution: the 'Monster Wolf.' These animatronic robots are covered in artificial fur and feature flashing LED eyes and a haunting howl designed to scare bears away from residential areas.",
        createdAt: new Date('2024-01-25'),
        ownerId: "user-2"
    },
    {
        id: "post-4",
        title: "Prisoners Use Cat to Smuggle Contraband",
        content: "In a Colombian prison, inmates reportedly trained a cat to smuggle drugs and other contraband into the facility. The cat would walk through a hole in the fence carrying a small bag tied to its body. Guards became suspicious when the cat kept returning to the same cellblock night after night. Upon inspection, they found bags of marijuana, cocaine, and even SIM cards hidden on the animal.",
        createdAt: new Date('2024-02-01'),
        ownerId: "user-2"
    },
    {
        id: "post-5",
        title: "Man Declares Himself 'Sovereign Citizen' of Airport",
        content: "A man living in Chicago's O'Hare International Airport for over three months declared himself a 'sovereign citizen' of the airport, claiming he wasn't bound by any laws. He reportedly told police he had 'claimed the terminal as his nation' and refused to leave. The man was eventually arrested and banned from the airport, but not before creating one of the strangest airport-stay stories since the movie 'The Terminal.'",
        createdAt: new Date('2024-02-05'),
        ownerId: "user-3"
    }
];



// 5 users too
export const users: User[] = [
    {
        id: "user-1",
        name: "Alex Morgan",
        email: "alex.morgan@example.com"
    },
    {
        id: "user-2",
        name: "Sarah Chen",
        email: "sarah.chen@example.com"
    },
    {
        id: "user-3",
        name: "Marcus Rodriguez",
        email: "marcus.rodriguez@example.com"
    }
];