
import { toast } from "react-toastify";

export const handleUnauthorizedStatus = (response) => {

    if (response.status === 401) {
        localStorage.removeItem("user");
        toast.error("Session expired. Please log in again.", {
            position: "top-right",
        });
        
    } else if (response.status === 403) {
        alert("You do not have permission to access this resource.");
    } else if (response.status === 500) {
        alert("Internal server error. Please try again later.");
    }
};