import { useCallback, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { BoxType } from './types/BoxType';
import { BoxDraggable } from './BoxDraggable';
import { BoxDroppable } from './BoxDroppable';
import update from 'immutability-helper';
import { BoxSource } from './BoxSource';

const initialBoxes: BoxType[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
];

const initialBoxes2: BoxType[] = [{ id: 4, name: 'Item 4' }];

function App() {
    const [boxes, setBoxes] = useState<BoxType[]>(initialBoxes2);
    const [selectedBoxes, setSelectedBoxes] = useState<BoxType[]>(initialBoxes);

    const onDrop = (item: BoxType) => {
        console.info('onDrop', item);
        const box = boxes.find((b) => b.id === item.id);
        if (box) {
            setSelectedBoxes([...selectedBoxes, box]);
            setBoxes(boxes.filter((b) => b.id !== box.id));
        }
    };

    const moveBox = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            console.info(selectedBoxes, dragIndex, hoverIndex);
            /**/
            const draggedBox = selectedBoxes[dragIndex];
            setSelectedBoxes(
                update(selectedBoxes, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, draggedBox],
                    ],
                })
            );
            /**/
        },
        [selectedBoxes]
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ border: '1px solid black', padding: '1rem', margin: '1rem' }}>
                <h3>Source list</h3>
                {boxes.map((box) => (
                    <BoxSource key={box.id} name={box.name} id={box.id} />
                ))}
            </div>
            <div style={{ border: '1px solid black', padding: '1rem', margin: '1rem' }}>
                <h3>Destination list</h3>
                <BoxDroppable onDrop={onDrop}>
                    {selectedBoxes.map((box, index) => (
                        <BoxDraggable key={box.id} id={box.id} name={box.name} index={index} onMove={moveBox} />
                    ))}
                </BoxDroppable>
            </div>
        </DndProvider>
    );
}

export default App;
