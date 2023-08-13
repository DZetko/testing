import { Entry } from "./Entry";

export interface Child {
    [key: string]: {
        records: Entry[];
    };
}