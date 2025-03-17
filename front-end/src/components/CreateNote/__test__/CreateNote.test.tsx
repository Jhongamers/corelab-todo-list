import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateNote from '../index';
import { useTodos } from '@/hooks/useTodos';

// Mock the useTodos hook
jest.mock('@/hooks/useTodos', () => ({
    useTodos: jest.fn(), // Use jest.fn() to make it mockable
}));

describe('CreateNote Component', () => {
    const mockOnCreate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        // Default mock implementation for useTodos
        (useTodos as jest.Mock).mockReturnValue({ error: null });
    });

    it('renders create note form', () => {
        render(<CreateNote onCreate={mockOnCreate} />);

        expect(screen.getByPlaceholderText('Titulo')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Digite algo...')).toBeInTheDocument();
        expect(screen.getByText(/Preencha os campos/)).toBeInTheDocument();
    });

    it('updates title and description on input', () => {
        render(<CreateNote onCreate={mockOnCreate} />);

        const titleInput = screen.getByPlaceholderText('Titulo');
        const descriptionInput = screen.getByPlaceholderText('Digite algo...');

        fireEvent.change(titleInput, { target: { value: 'Test Title' } });
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

        expect(titleInput).toHaveValue('Test Title');
        expect(descriptionInput).toHaveValue('Test Description');
    });

    it('toggles favorite status when star is clicked', () => {
        render(<CreateNote onCreate={mockOnCreate} />);

        const favoriteButton = screen.getByText('☆');
        fireEvent.click(favoriteButton);

        expect(screen.getByText('★')).toBeInTheDocument();
    });

    it('calls onCreate when Enter is pressed with valid inputs', () => {
        render(<CreateNote onCreate={mockOnCreate} />);

        const titleInput = screen.getByPlaceholderText('Titulo');
        const descriptionInput = screen.getByPlaceholderText('Digite algo...');

        fireEvent.change(titleInput, { target: { value: 'Test Title' } });
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
        fireEvent.keyDown(descriptionInput, { key: 'Enter' });

        expect(mockOnCreate).toHaveBeenCalledWith('Test Title', 'Test Description', false);
    });

    it('does not call onCreate when inputs are empty', () => {
        render(<CreateNote onCreate={mockOnCreate} />);

        const descriptionInput = screen.getByPlaceholderText('Digite algo...');
        fireEvent.keyDown(descriptionInput, { key: 'Enter' });

        expect(mockOnCreate).not.toHaveBeenCalled();
    });

    it('clears inputs after successful note creation', () => {
        render(<CreateNote onCreate={mockOnCreate} />);

        const titleInput = screen.getByPlaceholderText('Titulo');
        const descriptionInput = screen.getByPlaceholderText('Digite algo...');

        fireEvent.change(titleInput, { target: { value: 'Test Title' } });
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
        fireEvent.keyDown(descriptionInput, { key: 'Enter' });

        expect(titleInput).toHaveValue('');
        expect(descriptionInput).toHaveValue('');
    });

    it('displays error message when provided', () => {
        // Dynamically mock the useTodos hook to return an error
        (useTodos as jest.Mock).mockReturnValue({
            error: 'Test error message',
        });

        render(<CreateNote onCreate={mockOnCreate} />);

        // Use a more flexible matcher to find the error message
        expect(screen.getByText((content) => content.includes('Test error message'))).toBeInTheDocument();
    });
});