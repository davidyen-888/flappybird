import Matter from "matter-js";
import React from "react";
import { Image } from "react-native";

const Bird = (props) => {
  // get the width and height of the bird
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  // get the position of the bird
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  return (
    <Image
      source={require("../assets/bird.png")}
      style={{
        position: "absolute",
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    />
  );
};

export default (world, pos, size) => {
  // create a rectangle body as the bird
  const initBird = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Bird" }
  );
  Matter.World.add(world, initBird);

  return {
    body: initBird,
    pos,
    renderer: <Bird />,
  };
};
