// import { requiredRole } from "@/lib/core/session";

const AdminLayout =async ({children}) => {
    // await requiredRole("admin")
    return (
        <div>
            {children}
        </div>
    );
};

export default AdminLayout;