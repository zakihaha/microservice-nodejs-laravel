import { toast } from 'react-toastify';

export default function errorHandler(error) {
    if (error) {
        let message;
        if (error.response) {
            if (error.response.status == 500) message = "Internal Server Error";
            else if (error.response.status == 401) message = "Unauthorized";
            else if (error.response.status == 403) message = "Forbidden";
            else if (error.response.status == 404) message = "Not Found";
            else message = error.response.data.message;

            if (typeof message === "string") toast.error(message);

            return Promise.reject(error);
        }
    }
}