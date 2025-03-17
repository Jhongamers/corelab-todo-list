import React from 'react';
import styles from './GroupColor.module.scss'; // Estilos para o seletor de cores

export const colors = [
    "#add8e6", "#98fb98", "#ffeb99", "#ffb6b9",
    "#ff6b6b", "#87ceeb", "#da70d6", "#dfff00",
    "#ffa07a", "#d3d3d3", "#a9a9a9", "#a18f6f"
];

interface ColorPickerProps {
    onColorSelect: (color: string) => void; // Função que será chamada quando uma cor for selecionada
    onClose: () => void; // Função que será chamada para fechar o seletor
}

const GroupColor = ({ onColorSelect, onClose }: ColorPickerProps) => {
    return (
        <div className={styles.colorPickerWrapper}>
            <div className={styles.groupColors}>
                {colors.map((color, index) => (
                    <span
                        key={index}
                        className={styles.color}
                        style={{ backgroundColor: color }}
                        onClick={() => { onColorSelect(color); onClose(); }} // Chama a função para selecionar a cor e fechar
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default GroupColor;
