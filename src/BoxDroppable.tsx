import { BoxType } from './types/BoxType';
import { useDrop } from 'react-dnd';

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};

type Props = {
    children: React.ReactNode;
    onDrop?: (item: BoxType) => void;

};

export function BoxDroppable({ children, onDrop }: Props) {

    const [, dropRef] = useDrop({
        accept: 'box',
        drop(item: BoxType, monitor) {
            if (onDrop) {
                onDrop(item);
            }
        },
        // collect: (monitor) => ({
        //     isHover: monitor.isOver(),
        //     canDrop: monitor.canDrop(),
        // }),
    });

    return (
        <div ref={dropRef} style={{ ...style }}>
            {children}
        </div>
    );
}
