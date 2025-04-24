
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { pingServer } from "../../store/slices/userSlice";

export const handleUnauthorizedStatus = (response) => {
    const dispatch = useDispatch();
    if (response.status === 401) {
        localStorage.removeItem("user");
        toast.error("Session expired. Please log in again.", {
            position: "top-right",
        });
        dispatch(pingServer());
    } else if (response.status === 403) {
        alert("You do not have permission to access this resource.");
    } else if (response.status === 500) {
        alert("Internal server error. Please try again later.");
    }
};