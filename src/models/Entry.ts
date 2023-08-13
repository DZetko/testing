import { Child } from "./Child";
import { Item } from "./Item";

export interface Entry {
    data: Item;
    children: Child;
}