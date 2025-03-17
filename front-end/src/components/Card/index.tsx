// components/Card/TodoCard.tsx
import { useState, useRef, useEffect } from 'react';
import styles from './TodoCard.module.scss'; // Importa os estilos do card
import { ITodoCard } from '@/types/ITodoCard'; // Importa o tipo ITodoCard
import GroupColor from '../GroupColor'; // Importa o componente GroupColor para selecionar cores

// Componente Card que representa uma tarefa
const Card = ({ id, title, description, favorited, onFavoriteToggle, onDelete, updateCardData, color, updateCardColors }: ITodoCard & { onFavoriteToggle: (id: string, currentFavoriteStatus: boolean) => void }) => {
    const [isFavorite, setIsFavorite] = useState(favorited); // Estado local para o status de favorito
    const [bgColor, setBgColor] = useState<string | null>(color); // Estado local para a cor de fundo do card
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false); // Estado para mostrar/ocultar o seletor de cores
    const colorButtonRef = useRef<HTMLDivElement>(null); // Referência para o botão de cor
    const [colorPickerPosition, setColorPickerPosition] = useState({ top: 0, left: 0 }); // Posição do seletor de cores

    const textareaRef = useRef<HTMLTextAreaElement>(null); // Referência para o textarea

    // Estados para editar título e descrição
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar o modo de edição
    const [newTitle, setNewTitle] = useState<string>(title || ''); // Estado para o novo título
    const [newDescription, setNewDescription] = useState(description); // Estado para a nova descrição

    // Função para alternar o estado de favorito
    const handleToggleFavorite = () => {
        setIsFavorite(prevState => !prevState); // Atualiza o estado local de favorito
        const updatedColor = bgColor || color; // Caso o bgColor seja null, mantém a cor inicial (passada como prop color)
        onFavoriteToggle(id, isFavorite, updatedColor); // Atualiza o status de favorito no estado global
    };

    // Função para alterar a cor do card
    const handleToggleColor = (color: string) => {
        setBgColor(color); // Atualiza a cor no estado local
        setIsColorPickerOpen(false); // Fecha o seletor de cores
        updateCardColors(id, color); // Atualiza a cor no backend
    };

    // Função para alternar o seletor de cores
    const toggleColorPicker = () => {
        if (colorButtonRef.current) {
            const rect = colorButtonRef.current.getBoundingClientRect(); // Obtém a posição do botão

            // Dimensões estimadas do seletor de cores
            const colorPickerWidth = 250; // Largura estimada
            const colorPickerHeight = 70; // Altura estimada

            // Calcula espaços disponíveis
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceRight = window.innerWidth - rect.left;

            // Define a posição padrão (abaixo do botão)
            let top = rect.bottom + 5; // Espaço de 5px abaixo do botão
            let left = rect.left;

            // Ajusta a posição se não houver espaço suficiente abaixo
            if (spaceBelow < colorPickerHeight + 10) {
                top = rect.top - colorPickerHeight - 2; // Posiciona acima
            }

            // Ajusta a posição se não houver espaço suficiente à direita
            if (spaceRight < colorPickerWidth) {
                left = Math.max(5, window.innerWidth - colorPickerWidth - 5); // Ajusta para não sair da tela
            }

            setColorPickerPosition({ top, left }); // Define a posição do seletor
        }
        setIsColorPickerOpen((prev) => !prev); // Alterna o estado do seletor de cores
    };

    // Fecha o seletor de cores ao clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isColorPickerOpen &&
                colorButtonRef.current &&
                !colorButtonRef.current.contains(event.target as Node) &&
                document.getElementById('color-picker-container') &&
                !document.getElementById('color-picker-container')?.contains(event.target as Node)
            ) {
                setIsColorPickerOpen(false); // Fecha o seletor de cores
            }
        };

        document.addEventListener('mousedown', handleClickOutside); // Adiciona o evento de clique fora
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Remove o evento ao desmontar
        };
    }, [isColorPickerOpen]);

    // Salva no backend sempre que o título ou descrição for alterado
    const handleFinishEditing = () => {
        setIsEditing(false); // Finaliza o modo de edição
        updateCardData(
            id, // ID da tarefa
            newTitle, // Novo título
            newDescription || '', // Nova descrição (garante que seja string)
            isFavorite, // Status de favorito
            bgColor // Cor de fundo
        );
    };

    return (
        <>
            {/* Card principal */}
            <div className={styles.card} data-id={id} style={{ backgroundColor: bgColor || "white" }}>
                <div className={styles.cardHeader}>
                    {isEditing ? (
                        // Input para editar o título
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)} // Atualiza o título enquanto edita
                            className={styles.cardTitleInput}
                            style={{ backgroundColor: bgColor || "white" }}
                        />
                    ) : (
                        // Exibe o título
                        <h2 className={styles.cardTitle}>{title}</h2>
                    )}
                    <span className={styles.favoriteButton}>
                        <div onClick={handleToggleFavorite}>
                            {isFavorite ? <span className={styles.favorited}>{'★'}</span> : '☆'} {/* Exibe estrela preenchida se for favorito */}
                        </div>
                    </span>
                </div>

                <div className={styles.cardBody}>
                    {isEditing ? (
                        // Textarea para editar a descrição
                        <textarea
                            ref={textareaRef}
                            value={newDescription || ''}
                            onChange={(e) => setNewDescription(e.target.value)} // Atualiza a descrição enquanto edita
                            style={{ backgroundColor: bgColor || "white" }}
                            className={styles.cardDescriptionInput}
                        />
                    ) : (
                        // Exibe a descrição
                        <p>{description}</p>
                    )}
                </div>
                <div className={styles.cardFooter} style={{ backgroundColor: bgColor || "white" }}>
                    <div className={styles.editGroup}>
                        {isEditing ? (
                            // Botão para salvar as alterações
                            <span onClick={handleFinishEditing}> 📦 </span>
                        ) : (
                            // Botão para entrar no modo de edição
                            <span onClick={() => setIsEditing(true)}>✏️</span>
                        )}
                        <div
                            ref={colorButtonRef}
                            style={{ cursor: 'pointer' }}
                            onClick={toggleColorPicker}
                        >
                            🎨 {/* Botão para abrir o seletor de cores */}
                        </div>
                    </div>
                    {/* Botão para deletar o card */}
                    <span onClick={() => onDelete(id)}>X</span>
                </div>
            </div>

            {/* Seletor de cores posicionado absolutamente */}
            {isColorPickerOpen && (
                <div
                    id="color-picker-container"
                    style={{
                        position: 'fixed',
                        top: `${colorPickerPosition.top}px`,
                        left: `${colorPickerPosition.left}px`,
                        zIndex: 1000
                    }}
                >
                    <GroupColor
                        onColorSelect={handleToggleColor} // Função chamada ao selecionar uma cor
                        onClose={() => setIsColorPickerOpen(false)} // Fecha o seletor de cores
                    />
                </div>
            )}
        </>
    );
};

export default Card;