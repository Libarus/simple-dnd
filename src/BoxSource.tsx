import { useRef } from 'react';
import { useDrag } from 'react-dnd';

const style = {
    border: '1px solid gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};

type Props = {
    id: number;
    name: string;
};

export function BoxSource({ id, name }: Props) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'box',
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const opacity = isDragging ? 0 : 1;

    return (
        <div ref={drag} style={{ ...style, opacity }}>
            {name}
        </div>
    );
}
