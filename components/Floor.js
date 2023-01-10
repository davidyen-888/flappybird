import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const Floor = (props) => {
  // get the width and height of the floor
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  // get the position of the floor
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={{
        backgroundColor: color,
        position: "absolute",
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    ></View>
  );
};

export default (world, color, pos, size) => {
  // create a rectangle body as the floor
  const initFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Floor", isStatic: true }
  );
  Matter.World.add(world, initFloor);

  return {
    body: initFloor,
    color,
    pos,
    renderer: <Floor />,
  };
};
