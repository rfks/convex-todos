import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function GenerateToDosForm() {

    const [prompt,setPrompt]=useState("");
    const [loading,setLoading]=useState(false);
    const generateTodos = useAction(api.actions.generateTodos);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const todos = await generateTodos({prompt});
            console.log(todos);
            setPrompt("");
        } catch (error) {
            console.log("Error",error);
        } finally {
            setLoading(false);
        }
      };

    if (loading) {
        return <p>Generating todos..</p>
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <h2 className="font-semibold text-lg">Generate tasks with AI :magic emoji:</h2>
                <label className="text-sm font-semibold" htmlFor="prompt">Prompt</label>
                <input
                    className="p-1 border rounded"   
                    type="text" 
                    name="prompt" 
                    id="prompt" 
                    value={prompt} 
                    onChange={e => setPrompt(e.target.value)}
                />
                <button className="bg-blue-500 p-1 rounded text-white" type="submit">Create</button>
            </div>
      </form>
    );
}