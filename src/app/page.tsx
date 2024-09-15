'use client';

import { SignInButton, UserButton } from "@clerk/nextjs";
import { NewToDoForm } from "./_components/new-todo-form";
import { ToDoList } from "./to-do-list";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";

export default function Home() {

  return (
    <div className="max-w-screen-md mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">To-do List</h1>
        <UserButton />
      </div>
      <Authenticated>
        <ToDoList />
        <NewToDoForm />
      </Authenticated>
      <Unauthenticated>
        <p className="text-gray-600">Please sign in to continue</p>
        <SignInButton>
          <button className="p-1 bg-blue-500 text-white rounded">Sign In</button>
        </SignInButton>
      </Unauthenticated>
      <AuthLoading>
        Loading..
      </AuthLoading>
    </div>
  );
}

