import { ITodoCard } from '@/types/ITodoCard';
import { useState, useEffect } from 'react';

// Definindo funções da API para manipulação das tarefas
const api = {
  // Função para alternar o status de favorito de uma tarefa
  toggleFavorite: async (id: string, currentStatus: boolean) => {
    try {
      // Fazendo a requisição PUT para alterar o status de favorito
      const response = await fetch(`http://localhost:8000/api/todos/${id}/toggleFavorite`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorited: !currentStatus }), // Inverte o status de favorito
      });

      // Verificando se a resposta foi bem-sucedida
      if (!response.ok) throw new Error('Erro ao alterar o status de favorito');
      return await response.json();
    } catch  {
      throw new Error('Erro de comunicação com a API: ');
    }
  },

  // Função para criar uma nova tarefa
  createNote: async (title: string, description: string, favorited: boolean) => {
    try {
      // Fazendo a requisição POST para criar uma nova tarefa
      const response = await fetch('http://localhost:8000/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, favorited }), // Envia os dados da nova tarefa
      });

      // Verificando se a resposta foi bem-sucedida
      if (!response.ok) throw new Error('Erro ao salvar a nota');
      return await response.json();
    } catch  {
      throw new Error('Erro de comunicação com a API: ');
    }
  },

  // Função para deletar uma tarefa
  deleteTodo: async (id: string) => {
    try {
      // Fazendo a requisição DELETE para remover a tarefa
      const response = await fetch(`http://localhost:8000/api/todos/${id}`, { method: 'DELETE' });

      // Verificando se a resposta foi bem-sucedida
      if (!response.ok) throw new Error('Erro ao deletar a tarefa');
      return await response.json();
    } catch  {
      throw new Error('Erro de comunicação com a API: ');
    }
  },

  // Função para atualizar os dados de uma tarefa existente
  updateCardData: async (id: string, title: string, description: string, favorited: boolean, bgColor: string | null) => {
    try {
      // Fazendo a requisição PUT para atualizar os dados da tarefa
      const response = await fetch(`http://localhost:8000/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, favorited, bgColor }), // Envia os dados atualizados
      });

      // Verificando se a resposta foi bem-sucedida
      if (!response.ok) throw new Error('Erro ao salvar os dados do card');
      return await response.json();
    } catch (error) {
      console.error('Erro ao salvar os dados no backend:', error);
    }
  },

  // Função para atualizar apenas a cor de fundo de uma tarefa
  updateCardColor: async (id: string, bgColor: string | null) => {
    try {
      // Fazendo a requisição PUT para atualizar a cor de fundo da tarefa
      const response = await fetch(`http://localhost:8000/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ color: bgColor }), // Envia a nova cor
      });

      // Verificando se a resposta foi bem-sucedida
      if (!response.ok) throw new Error('Erro ao salvar os dados do card');
      return await response.json();
    } catch (error) {
      console.error('Erro ao salvar os dados no backend:', error);
    }
  },
};

// Hook customizado para gerenciar o estado das tarefas (todos)
export const useTodos = () => {
  // Definindo o estado local para as tarefas, status de carregamento e erros
  const [todos, setTodos] = useState<ITodoCard[]>([]); // Estado para armazenar as tarefas
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento das tarefas
  const [error, setError] = useState<string | null>(null); // Estado para armazenar possíveis erros

  // Função para carregar as tarefas da API
  const fetchTodos = async () => {
    try {
      setIsLoading(true); // Inicia o carregamento
      const response = await fetch('http://localhost:8000/api/todos');
      const data = await response.json();
      setTodos(data); // Atualiza o estado com as tarefas recebidas
    } catch {
      setError('Erro ao carregar as tarefas'); // Em caso de erro, atualiza o estado de erro
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  // Carrega as tarefas assim que o componente for montado
  useEffect(() => {
    fetchTodos();
  }, []); // A dependência vazia [] significa que essa função será chamada apenas uma vez ao carregar

  // Função para criar uma nova tarefa
  const createTodo = async (title: string, description: string, favorited: boolean) => {
    if (!title.trim() || !description.trim()) {
      setError('Texto da tarefa não pode ser vazio'); // Validação de campo vazio
      return;
    }

    try {
      // Cria a nova tarefa através da API
      const newTodo = await api.createNote(title, description, favorited);
      // Atualiza o estado local com a nova tarefa
      setTodos(prevTodos => [...prevTodos, newTodo]);
    } catch{
      setError('Erro Ao criar todo'); // Atualiza o erro caso a criação falhe
    }
  };

  // Função para alternar o status de favorito de uma tarefa
  const toggleFavorite = async (id: string, currentStatus: boolean, color: string | null): Promise<void> => {
    try {
      // Alterna o status de favorito na API
      await api.toggleFavorite(id, currentStatus);

      // Atualiza o estado local para refletir a mudança no favoritado
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, favorited: !currentStatus, color: color } : todo
        )
      );
    } catch (error) {
      console.error(error); // Exibe erro no console se ocorrer algum
    }
  };

  // Função para atualizar os dados de uma tarefa
  const updateCard = async (id: string, title: string, description: string, favorited: boolean, bgColor: string | null) => {
    try {
      // Atualiza os dados do card através da API
      await api.updateCardData(id, title, description, favorited, bgColor);
      // Atualiza o estado local com os dados modificados
      setTodos(prevTodos => prevTodos.map(todo =>
        todo.id === id ? { ...todo, title, description, favorited, bgColor } : todo
      ));
    } catch (error) {
      console.error(error); // Exibe erro no console se ocorrer algum
    }
  };

  // Função para atualizar a cor de fundo de uma tarefa
  const updateCardColor = async (id: string, bgColor: string | null) => {
    try {
      // Atualiza a cor de fundo através da API
      await api.updateCardColor(id, bgColor);
    } catch (error) {
      console.error(error); // Exibe erro no console se ocorrer algum
    }
  };

  // Função para deletar uma tarefa
  const deleteTodo = async (id: string) => {
    try {
      // Deleta a tarefa através da API
      await api.deleteTodo(id);
      console.log('rodou aqui');
      // Remove a tarefa do estado local
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      setError('Erro ao deletar a tarefa'); // Exibe erro se a deleção falhar
      console.error(error); // Exibe erro no console
    }
  };

  // Retorna os dados e funções que serão usados no componente
  return { todos, isLoading, error, toggleFavorite, fetchTodos, deleteTodo, createTodo, updateCard, updateCardColor };
};
