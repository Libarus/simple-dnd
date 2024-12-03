import { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { BoxType } from './types/BoxType';
import { BoxDraggable } from './BoxDraggable';
import { BoxDroppable } from './BoxDroppable';

const initialBoxes: BoxType[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
];

const style = {
    border: '1px solid gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};

function App() {
    const [boxes, setBoxes] = useState<BoxType[]>(initialBoxes);
    const [selectedBoxes, setSelectedBoxes] = useState<BoxType[]>([]);

    const onDrop = (item: BoxType) => {
        const box = boxes.find((b) => b.name === item.name);
        if (box) {
            setSelectedBoxes([...selectedBoxes, box]);
            setBoxes(boxes.filter((b) => b.id !== box.id));
        }
    };

    const onDrop2 = (item: BoxType) => {
        const box = selectedBoxes.find((b) => b.name === item.name);
        if (box) {
            setBoxes([...boxes, box]);
            setSelectedBoxes(selectedBoxes.filter((b) => b.id !== box.id));
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ border: '1px solid black', padding: '1rem', margin: '1rem' }}>
                <h3>Source list</h3>
                <BoxDroppable onDrop={onDrop2}>
                    {boxes.map((box) => (
                        <BoxDraggable key={box.id} name={box.name} />
                    ))}
                </BoxDroppable>
            </div>
            <div style={{ border: '1px solid black', padding: '1rem', margin: '1rem' }}>
                <h3>Destination list</h3>
                <BoxDroppable onDrop={onDrop}>
                    {selectedBoxes.map((box, index) => (
                        <BoxDraggable key={box.id} name={box.name} />
                    ))}
                </BoxDroppable>
            </div>
        </DndProvider>
    );
}

export default App;
