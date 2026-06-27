
import FeaturedTasks from "@/components/main/FeaturedTask";
import Hero from "@/components/main/Hero";
import HowItWorks from "@/components/main/HowItWorks";
import PlatformStatistics from "@/components/main/PlatFormStatics";
import PlatformTestimonial from "@/components/main/PlatformTestimonial";
import { getUserSession } from "@/lib/core/session";

export default async function Home() {
  const user = await getUserSession();
  return (
    <div>
      <Hero user={user} />
      <PlatformStatistics/>
      <FeaturedTasks/>
      <HowItWorks/>
      <PlatformTestimonial/>
    </div>
  );
}
