import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
    }),
  ],
  session: {
    // Set session to expire after 1 hour
    maxAge: 60 * 60, // 1 hour in seconds
    updateAge: 60 * 5, // Check every 5 minutes to see if the session should be updated
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async signIn({user,account}){
      console.log("User: ", user);
      console.log("Account: ", account);
      if(account.provider==='google'){
          const {name,email}=user;
          try{
              const res = await fetch('http://localhost:3000/api/users',{
                  method: 'POST',
                  headers: {
                      "Content-Type":"application/json",
                  },
                  body: JSON.stringify({
                      name,
                      email
                  }),

              })
              if(res.ok){
                  return user;
              }
          }catch(error){
              console.log(error)
          }

      }
      return user;
  }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
