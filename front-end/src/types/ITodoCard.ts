export interface ITodoCard {
    // Identificador único da tarefa
    id: string;
  
    // Título da tarefa. Pode ser uma string ou null, caso não tenha título
    title: string | null;
  
    // Descrição da tarefa. Pode ser uma string ou null, caso não tenha descrição
    description: string | null;
  
    // Indica se a tarefa está marcada como favorita. Um booleano (true ou false)
    favorited: boolean;
  
    // Cor do card. Pode ser uma string representando a cor ou null se não houver cor definida
    color: string | null;
  
    // Função para deletar a tarefa. Recebe o id da tarefa como argumento e não retorna nada
    onDelete: (id: string) => void;
  
    // Função para alternar o status de favorito da tarefa. Recebe o id da tarefa, o status atual de favorito (favorited) e a cor atual do card
    onFavoriteToggle: (id: string, currentFavoriteStatus: boolean, color: string | null) => Promise<void>;
  
    // Função para atualizar os dados do card. Recebe o id da tarefa, título, descrição, status de favorito e a cor de fundo (bgColor)
    updateCardData: (id: string, title: string, description: string, favorited: boolean, bgColor: string | null) => void;
  
    // Função para atualizar a cor do card. Recebe o id da tarefa e a nova cor
    updateCardColors: (id: string, color: string | null) => void;
  }
  