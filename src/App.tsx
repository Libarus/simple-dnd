import React, { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { BoxList } from './BoxList';
import { BoxType } from './BoxType';

const initialBoxes: BoxType[] = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
];

function App() {
  const [boxes, setBoxes] = useState<BoxType[]>(initialBoxes);
  const [selectedBoxes1, setSelectedBoxes1] = useState<BoxType[]>([]);
  const [selectedBoxes2, setSelectedBoxes2] = useState<BoxType[]>([]);

  const moveBox = (num: number, box: BoxType)=> {
    switch (num) {
      case 1: setSelectedBoxes1([...selectedBoxes1, box]); break;
      case 2: setSelectedBoxes2([...selectedBoxes2, box]); break;
    }
    setBoxes(boxes.filter((b) => b.id !== box.id));
  };

  const onDrop = (num:number, item: BoxType) => {
    const box = boxes.find((b) => b.name === item.name);
    if (box) {
      moveBox(num, box);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
          <BoxList title="Available Items" boxes={boxes} />
          <BoxList title="Selected Items" boxes={selectedBoxes1} onDrop={(item: BoxType) => onDrop(1, item)} />
          <BoxList title="Selected Items" boxes={selectedBoxes2} onDrop={(item: BoxType) => onDrop(2, item)} />
      </div>
    </DndProvider>
  );
}

export default App;