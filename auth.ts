

// // with comments
// import NextAuth from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
// import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
// import { client } from "@/sanity/lib/client";
// import { writeClient } from "./sanity/lib/write-client";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID!, 
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!, 
//     }),
//   ],
//   callbacks: {
//     // Runs when a user tries to sign in
//     async signIn({ user: { name, email, image }, profile: { id, login, bio } }) {
//       const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });
      
//       if (!existingUser) {
//         await writeClient.create({
//           _type: "author", 
//           id,
//           name,
//           username: login,
//           email,
//           image,
//           bio: bio || "", 
//         });
//       }
      
//       return true;
//     },

//     // Stores user ID inside JWT token
//     async jwt({ token, account, profile }) {
//       if (account && profile) {
//         const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });
//         token.id = user?._id;
//       }
//       return token;
//     },

//     // Attaches user ID from JWT to the session
//     async session({ session, token }) {
//       Object.assign(session, { id: token.id });
//       return session;
//     }
//   },
//   secret: process.env.NEXTAUTH_SECRET, 
// });

// import NextAuth from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
// import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
// import { client } from "@/sanity/lib/client";
// import { writeClient } from "./sanity/lib/write-client";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID!, 
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!, 
//     }),
//   ],
//   callbacks: {
//     async signIn({ user: { name, email, image }, profile: { id, login, bio } }) {
//       const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });
      
//       if (!existingUser) {
//         await writeClient.create({
//           _type: "author", 
//           id,
//           name,
//           username: login,
//           email,
//           image,
//           bio: bio || "", 
//         });
//       }
      
//       return true;
//     },

//     async jwt({ token, account, profile }) {
//       if (account && profile) {
//         const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });
//         token.id = user?._id;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       session.user.id = token.id; // Ensure id is set correctly
//       return session;
//     }
//   },
//   secret: process.env.NEXTAUTH_SECRET, 
// });


import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      // Add explicit authorization URL parameters
      authorization: {
        params: {
          redirect_uri: process.env.NEXTAUTH_URL 
            ? `${process.env.NEXTAUTH_URL}/api/auth/callback/github`
            : undefined
        }
      }
    }),
  ],
  // Add base URL configuration
  baseUrl: process.env.NEXTAUTH_URL,
  callbacks: {
    async signIn({ user, profile }) {
      // Add type safety for profile
      if (!profile) return false;
      
      const { name, email, image } = user;
      const { id, login, bio } = profile as any; // Keep your existing type handling
      
      const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });
      
      if (!existingUser) {
        await writeClient.create({
          _type: "author", 
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "", 
        });
      }
      
      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { 
          id: (profile as any)?.id 
        });
        token.id = user?._id;
      }
      return token;
    },

    async session({ session, token }) {
      // Safer session modification
      if (token.id) {
        session.user = session.user || {};
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});