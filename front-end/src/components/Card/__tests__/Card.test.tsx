import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../index';

// Remove node:test import as we're using Jest
describe('Card Component', () => {
    const mockProps = {
        id: '1',
        title: 'Test Card',
        description: 'Test Description',
        favorited: false,
        color: null,
        onFavoriteToggle: jest.fn(),
        onDelete: jest.fn(),
        updateCardData: jest.fn(),
        updateCardColors: jest.fn(),
    };

    // Clear the render container after each test
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders card with title and description', () => {
        render(<Card {...mockProps} />);
        expect(screen.getByText('Test Card')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('toggles favorite status when star is clicked', () => {
        const { container } = render(<Card {...mockProps} />);
        const favoriteButton = container.querySelector('.favoriteButton div');
        if (!favoriteButton) throw new Error('Favorite button not found');

        fireEvent.click(favoriteButton);
        expect(mockProps.onFavoriteToggle).toHaveBeenCalledWith(
            mockProps.id,
            mockProps.favorited,
            mockProps.color
        );
    });

    it('calls onDelete when delete button is clicked', () => {
        const { container } = render(<Card {...mockProps} />);
        const deleteButton = container.querySelector('.cardFooter > span');
        if (!deleteButton) throw new Error('Delete button not found');

        fireEvent.click(deleteButton);
        expect(mockProps.onDelete).toHaveBeenCalledWith(mockProps.id);
    });

    it('enters edit mode when edit button is clicked', () => {
        const { container } = render(<Card {...mockProps} />);
        const editButton = container.querySelector('.editGroup > span');
        if (!editButton) throw new Error('Edit button not found');

        fireEvent.click(editButton);
        expect(screen.getByDisplayValue('Test Card')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
    });

    it('updates card data when editing is finished', () => {
        const { container } = render(<Card {...mockProps} />);
        const editButton = container.querySelector('.editGroup > span');
        if (!editButton) throw new Error('Edit button not found');

        // Enter edit mode
        fireEvent.click(editButton);

        // Update title and description
        const titleInput = screen.getByDisplayValue('Test Card');
        const descriptionInput = screen.getByDisplayValue('Test Description');

        fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
        fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });

        // Find and click save button
        const saveButton = screen.getByText('📦');
        fireEvent.click(saveButton);

        expect(mockProps.updateCardData).toHaveBeenCalledWith(
            mockProps.id,
            'Updated Title',
            'Updated Description',
            mockProps.favorited,
            mockProps.color
        );
    });
});