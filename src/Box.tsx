import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};

export const Box: React.FC<{ name: string }> = ({ name }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} style={{ ...style, opacity: isDragging ? 0.4 : 1 }}>
            {name}
        </div>
    );
};
