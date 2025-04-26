import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { createClient } from "@supabase/supabase-js";
import "../app/globals.css";
import Navigation from "@/public/components/Navigation";
import { SessionProvider } from "next-auth/react";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const userEmail = session.user.email;

  const { data: user, error: userError } = await supabase
  .from('users')
  .select('id')
  .eq('email', userEmail)
  .single()

if (userError || !user) {
  console.error('Error fetching user:', userError)
  return res.status(500).json({ error: 'Failed to find user' })
}

const userId = user.id;


  const { data: generations, error } = await supabase
    .from("generations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch error:", error);
  }

  return {
    
    props: { generations: generations || [] },
  };
}

export default function History({ generations }) {
  
  return (
    <SessionProvider>
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      {/* <HistoryButton/>
      <LoginButton/> */}
      <Navigation/>
      <h1 className="text-2xl font-semibold text-center mb-4">📜 Your History</h1>
      {generations.length === 0 ? (
        <p className="text-gray-500">No generations saved yet.</p>
      ) : (
        generations.map((gen) => (
          <div key={gen.id} className="mb-6 p-4 border rounded-xl bg-white shadow">
            <p className="text-sm text-gray-500 mb-2">Platform: {gen.platform}</p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Input:</strong> {gen.input}
            </p>
            <p className="text-sm text-gray-900 whitespace-pre-wrap">
              <strong>Output:</strong> {gen.output}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Created: {new Date(gen.created_at).toISOString().replace("T", " ").split(".")[0]}
            </p>
          </div>
        ))
      )}
    </div>
    </div>
    </SessionProvider>
  );
}
