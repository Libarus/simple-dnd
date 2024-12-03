import React, { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { BoxList } from './BoxList';
import { BoxType } from './BoxType';

const initialBoxes: BoxType[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
];

function App() {
    const [boxes, setBoxes] = useState<BoxType[]>(initialBoxes);
    const [selectedBoxes, setSelectedBoxes] = useState<BoxType[]>([]);

    const moveBox = (box: BoxType) => {
        setSelectedBoxes([...selectedBoxes, box]);
        setBoxes(boxes.filter((b) => b.id !== box.id));
    };

    const onDrop = (item: BoxType) => {
        const box = boxes.find((b) => b.name === item.name);
        if (box) {
            moveBox(box);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex' }}>
                <BoxList title='Available Items' boxes={boxes} />
                <BoxList title='Selected Items' boxes={selectedBoxes} onDrop={onDrop} />
            </div>
        </DndProvider>
    );
}

export default App;
