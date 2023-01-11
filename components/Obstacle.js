import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const Obstacle = (props) => {
  // get the width and height of the obstacle
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  // get the position of the obstacle
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: color,
        borderStyle: "solid",
        position: "absolute",
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    ></View>
  );
};

export default (world, label, color, pos, size) => {
  // create a rectangle body as the obstacle
  const initObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label, isStatic: true }
  );
  Matter.World.add(world, initObstacle);

  return {
    body: initObstacle,
    color,
    pos,
    renderer: <Obstacle />,
  };
};
