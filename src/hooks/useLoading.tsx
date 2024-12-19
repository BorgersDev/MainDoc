import { useContext } from "react";

import { LoadingContext } from "@contexts/LoadingContext";

export const useLoading = () => {
    const context = useContext( LoadingContext );
    return context
}