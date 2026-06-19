import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db("TaskForgeDB");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  user: {
    additionalFields: {
      role: {
        default: "Client",
      },
      isBlocked: {
        default: false,
      },
      skills: {
        type: "string", // অথবা array ব্যবহার করতে পারেন ডাটাবেজ অনুযায়ী
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
      hourlyRate: {
        type: "number",
        required: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await db.collection("user").updateOne(
            { id: user.id },
            {
              $set: {
                role: "Client",
              },
            },
          );
        },
      },
    },
  },
});
