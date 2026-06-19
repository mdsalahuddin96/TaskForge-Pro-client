import { requiredRole } from "@/lib/core/session";

const ClientLayout =async ({children}) => {
    await requiredRole("Client")
    return (
        <div>
            {children}
        </div>
    );
};

export default ClientLayout;