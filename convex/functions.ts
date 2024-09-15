import { v } from "convex/values";
import {query, mutation} from "./_generated/server";

export const listTodos = query({
    handler: async (ctx) => {
        return await ctx.db.query("todos").collect();
    } 
})

export const CreateTodo = mutation({
    args: {
        title: v.string(),
        description: v.string(),        
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("todos",{
            title: args.title,
            description: args.description,
            completed: false
        })
    }
});

export const updateTodo = mutation({
    args: {
        id: v.id("todos"),
        completed: v.boolean()
    },
    handler: async (ctx,args) => {
        await ctx.db.patch(args.id, {
            completed: args.completed
        })
    }
});

export const deleteTodo = mutation({
    args: {
        id: v.id("todos")
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    }
})