import { requiredRole } from "@/lib/core/session";

const FreelancerLayout =async ({children}) => {
    await requiredRole("Freelancer")
    return (
        <div>
            {children}
        </div>
    );
};

export default FreelancerLayout;