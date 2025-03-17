'use client'
import styles from "@/components/CreateNote/CreateNote.module.scss";
import { useTodos } from '@/hooks/useTodos';
import { useState, useRef, useEffect } from "react";

interface CreateNoteProps {
    onCreate: (title: string, description: string, favorited: boolean) => void;  // Tipo para a função passada do componente pai
}

const CreateNote = ({ onCreate }: CreateNoteProps) => {
    const [title, setTitle] = useState(""); // Título da nota
    const [description, setDescription] = useState(""); // Texto da descrição
    const [isFavorite, setIsFavorite] = useState(false); // Estado para o status de favorito
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const { error } = useTodos();

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
    }, [description]); // Atualiza a altura sempre que o texto muda

    const handleKeyDown = (event: React.KeyboardEvent) => {
        // Quando o usuário pressionar 'Enter', vamos tratar o evento
        if (event.key === "Enter") {
            event.preventDefault(); // Impede a quebra de linha no textarea
            handleSaveNote(); // Salva a nota ou realiza a ação desejada
        }
    };

    const handleToggleFavorite = () => {
        setIsFavorite(!isFavorite); // Atualiza o estado local
    };

    const handleSaveNote = () => {
        if (!title.trim() || !description.trim()) return; // Verifica se título ou descrição estão vazios
        onCreate(title, description, isFavorite); // Passa os dados para a função do pai
        setDescription(""); // Limpa o campo de descrição
        setTitle(""); // Limpa o título
        setIsFavorite(false); // Reseta o favorito
    };

    return (
        <div className={styles['create-notes']}>
            <div className={styles['create-notes-header']}>
                <input type="text" className={styles.titleInput} value={title}
                    onChange={(e) => setTitle(e.target.value)} placeholder="Titulo" />
                <div className={styles.favoriteButton} onClick={handleToggleFavorite}>
                    {isFavorite ? <span className={styles.favorited}>{'★'}</span> : '☆'} {/* Se favorito, exibe estrela preenchida */}
                </div>
            </div>
            <textarea
                ref={textAreaRef}
                className={styles.noteText}
                placeholder="Digite algo..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown} // Chama a função handleKeyDown quando uma tecla for pressionada
            />
            <p className={styles.instructions}>
                Preencha os campos e pressione <strong>Enter</strong> para criar uma nota.
            </p>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe mensagem de erro */}
        </div>
    )
}

export default CreateNote;
