import { useContext } from "react";
import { ConnectionContext } from "../hoc/ConnectionProvider";

export function useConnection() {
    return useContext(ConnectionContext);
}