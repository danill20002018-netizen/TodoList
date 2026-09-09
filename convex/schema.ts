import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    createdAt: v.number(),
  })
    .index("creation_time_by", ["createdAt"])
    .index("completion_by", ["isCompleted"]),
});