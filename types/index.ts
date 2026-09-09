import { Id } from "../convex/_generated/dataModel";

export interface Todo {
    _id: Id<"todos">;
    _creationTime: number;
    text: string;
    isCompleted: boolean;
    createdAt: number;
}