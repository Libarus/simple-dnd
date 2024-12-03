import { useDrag } from 'react-dnd';

const style = {
    border: '1px solid gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};

type Props = {
    name: string;
};

export function BoxDraggable({ name }: Props) {
    const [{ isDrag }, dragRef] = useDrag(() => ({
        type: 'box',
        item: { name },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    }));

    return isDrag ? null : (
        <div ref={dragRef} style={{ ...style }}>
            {name}
        </div>
    );
}
