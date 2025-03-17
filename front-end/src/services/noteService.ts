import { ITodoCard } from "@/types/ITodoCard";

export const getTodos = async(): Promise<ITodoCard[]> => {
    const response = await fetch('http://localhost:8000/api/todos');
    if(!response.ok){
        throw new Error('Erro ao buscar todos');
    }
    return await response.json();
}