import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';
import { useTodos } from '@/hooks/useTodos';

// Mock do hook useTodos
jest.mock('@/hooks/useTodos', () => ({
    useTodos: jest.fn(),
}));

describe('Home Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading message when isLoading is true', () => {
        (useTodos as jest.Mock).mockReturnValue({
            todos: [],
            isLoading: true,
            error: null,
            deleteTodo: jest.fn(),
            toggleFavorite: jest.fn(),
            createTodo: jest.fn(),
            updateCard: jest.fn(),
            updateCardColor: jest.fn(),
        });

        render(<Home />);
    });

    it('renders error message when error is present', () => {
        (useTodos as jest.Mock).mockReturnValue({
            todos: [],
            isLoading: false,
            error: 'Erro ao carregar dados',
            deleteTodo: jest.fn(),
            toggleFavorite: jest.fn(),
            createTodo: jest.fn(),
            updateCard: jest.fn(),
            updateCardColor: jest.fn(),
        });

        render(<Home />);
        expect(screen.getByText('Erro ao carregar dados')).toBeInTheDocument();
    });

    it('renders favorite and non-favorite tasks correctly', () => {
        (useTodos as jest.Mock).mockReturnValue({
            todos: [
                { id: '1', title: 'Tarefa 1', description: 'Descrição 1', favorited: true, color: null },
                { id: '2', title: 'Tarefa 2', description: 'Descrição 2', favorited: false, color: null },
            ],
            isLoading: false,
            error: null,
            deleteTodo: jest.fn(),
            toggleFavorite: jest.fn(),
            createTodo: jest.fn(),
            updateCard: jest.fn(),
            updateCardColor: jest.fn(),
        });

        render(<Home />);
        expect(screen.getByText('Favoritas')).toBeInTheDocument();
        expect(screen.getByText('Tarefa 1')).toBeInTheDocument();
        expect(screen.getByText('Outros')).toBeInTheDocument();
        expect(screen.getByText('Tarefa 2')).toBeInTheDocument();
    });

    it('calls createTodo when a new task is created', () => {
        const mockCreateTodo = jest.fn();
        (useTodos as jest.Mock).mockReturnValue({
            todos: [],
            isLoading: false,
            error: null,
            deleteTodo: jest.fn(),
            toggleFavorite: jest.fn(),
            createTodo: mockCreateTodo,
            updateCard: jest.fn(),
            updateCardColor: jest.fn(),
        });

        render(<Home />);
        const titleInput = screen.getByPlaceholderText('Titulo');
        const descriptionInput = screen.getByPlaceholderText('Digite algo...');

        fireEvent.change(titleInput, { target: { value: 'Nova Tarefa' } });
        fireEvent.change(descriptionInput, { target: { value: 'Descrição da nova tarefa' } });
        fireEvent.keyDown(descriptionInput, { key: 'Enter' });

        expect(mockCreateTodo).toHaveBeenCalledWith('Nova Tarefa', 'Descrição da nova tarefa', false);
    });
});