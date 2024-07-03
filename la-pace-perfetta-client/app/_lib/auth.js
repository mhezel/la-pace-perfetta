import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {

                authorized({auth, request}) {
                    return !!auth?.user;
                },

                async signIn({ user, account, profile }) {
                    try {
                    const existingGuest = await getGuest(user.email);
                    console.log(existingGuest);
            
                    if (!existingGuest)
                        await createGuest({ guest_email: user.email, guest_fullname: user.name });

                    return true;
                    } catch {
                    return false;
                    }
                },
                
                async session({ session, user }) {
                    const guest = await getGuest(session.user.email);
                    console.log(guest);
                    session.user.guest_id = guest.guest_id;
                    return session;
                },

            },
            pages: {
              signIn: "/login",
    },
};

export const 
{ 
    auth, 
    handlers: { GET, POST },
    signIn,
    signOut,
} = NextAuth(authConfig);