'use client'
// Importa os componentes necessários e estilos
import Card from '@/components/Card';
import CreateNote from '@/components/CreateNote';
import Header from '@/components/Header';
import { useTodos } from '@/hooks/useTodos';
import styles from '@/styles/Home.module.scss';

// Define a interface para o tipo Todo
interface Todo {
  id: string; // Identificador único da tarefa
  title: string | null; // Título da tarefa (pode ser nulo)
  description: string | null; // Descrição da tarefa (pode ser nula)
  favorited: boolean; // Indica se a tarefa está marcada como favorita
  color?: string | null; // Cor opcional do card
}

// Componente principal da página
export default function Home() {
  // Obtém os dados e funções do hook useTodos
  const { todos, deleteTodo, toggleFavorite, createTodo, updateCard, updateCardColor } = useTodos();

  // Função para criar uma nova tarefa
  const handleCreateTodo = async (title: string, description: string, favorited: boolean) => {
    await createTodo(title, description, favorited); // Chama a função createTodo do hook
  };

  // Função para renderizar a lista de cards
  const renderCardList = (todosList: Todo[], title: string, noTasksMessage: string) => (
    <>
      {/* Título da seção */}
      {todosList.length > 0 && (

        <h2 className={styles.favoritasTitle}>{title}</h2>
      )}
      <div className={styles.cardContainer}>
        {/* Verifica se há tarefas na lista */}
        {todosList.length > 0 ? (
          // Mapeia as tarefas e renderiza um componente Card para cada uma
          todosList.map(todo => (
            <Card
              key={todo.id} // Chave única para cada card
              id={todo.id} // ID da tarefa
              title={todo.title} // Título da tarefa
              description={todo.description} // Descrição da tarefa
              favorited={todo.favorited} // Status de favorito
              onFavoriteToggle={(id, currentFavoriteStatus, color: string | null = null) => toggleFavorite(id, currentFavoriteStatus, color)} // Função para alternar favorito
              onDelete={deleteTodo} // Função para deletar a tarefa
              updateCardData={updateCard} // Função para atualizar os dados do card
              color={todo.color ?? null} // Cor do card (ou null se não houver)
              updateCardColors={updateCardColor} // Função para atualizar a cor do card
            />
          ))
        ) : (
          // Mensagem exibida se não houver tarefas
          <p>{noTasksMessage}</p>
        )}
      </div>
    </>
  );



  // Filtra as tarefas favoritas
  const favoritedTodos = todos.filter(todo => todo.favorited);

  // Filtra as tarefas não favoritas
  const nonFavoritedTodos = todos.filter(todo => !todo.favorited);

  return (
    <div>
      {/* Cabeçalho da página */}
      <Header />

      {/* Componente para criar uma nova nota */}
      <CreateNote onCreate={handleCreateTodo} />

      {/* Renderiza a lista de tarefas favoritas */}
      {renderCardList(favoritedTodos, 'Favoritas', 'Não há tarefas favoritas')}

      {/* Renderiza a lista de outras tarefas */}
      {renderCardList(nonFavoritedTodos, 'Outros', 'Não há notas cadastradas')}
    </div>
  );
}