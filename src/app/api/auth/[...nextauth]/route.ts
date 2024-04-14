import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
 
const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
        async authorize(credentials, req) {
          try {
            console.log(credentials);
            return {
              id: 'test@test.com',
              name: 'Test User',
            };
          } catch (error) {
              console.log(error);
              return null;
          }
      },
    }),
  ],
}) 

export { handler as GET, handler as POST };

