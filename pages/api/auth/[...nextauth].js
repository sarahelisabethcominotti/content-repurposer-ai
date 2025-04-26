import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY 
);
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const { data, error } = await supabaseAdmin.from('users').upsert(
          { email: user.email }, 
          { onConflict: 'email' } 
        );

        if (error) {
          console.error('Supabase insert error during signIn:', error);
          return false;
        }

        console.log('Inserted/Found user:', data);
        return true;
      } catch (err) {
        console.error('Unexpected error during signIn:', err);
        return false;
      }
    },

    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    }
  }
}
export default NextAuth(authOptions);
