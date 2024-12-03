import React, { FC } from "react";
import { Box } from "./Box";
import update from "immutability-helper";
import { NativeTypes } from "react-dnd-html5-backend";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

interface Props {
  title: string;
  boxes: { id: number; name: string }[];
  onDrop?: (item: any) => void;
}

export const BoxList: FC<Props> = ({ title, boxes, onDrop }) => {
  const [, drop] = useDrop({
    accept: [NativeTypes.URL, ItemTypes.BOX],
    drop(item: any, monitor) {
      if (onDrop) {
        onDrop(item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop}>
      <h3>{title}</h3>
      {boxes.map((box) => (
        <Box key={box.id} name={box.name} />
      ))}
    </div>
  );
};
