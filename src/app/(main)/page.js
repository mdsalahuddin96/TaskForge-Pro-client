
import Hero from "@/components/main/Hero";
import { getUserSession } from "@/lib/core/session";

export default async function Home() {
  const user = await getUserSession();
  return (
    <div>
      <Hero user={user} />
    </div>
  );
}
