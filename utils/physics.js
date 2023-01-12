import Matter from "matter-js";
import { Dimensions } from "react-native";
import { getPipeSizePosPair } from "./random";

// get the device screen width
const windowWidth = Dimensions.get("window").width;

// dispatch allows us to send messages to the GameEngine
const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.setVelocity(entities.Bird.body, {
        // the bird only move up when touched
        x: 0,
        y: -5,
      });
    });

  // trigger an update on the physics engine
  Matter.Engine.update(engine, time.delta);

  for (let index = 0; index < 2; index++) {
    if (
      entities[`ObstacleTop${index + 1}`].body.bounds.max.x <=
        entities.Bird.body.bounds.min.x &&
      !entities[`ObstacleTop${index + 1}`].point
    ) {
      // set the point to true so that we don't add a point every frame
      entities[`ObstacleTop${index + 1}`].point = true;
      // add a point to the score
      dispatch({ type: "add-point" });
    }

    // if the pipe is out of the screen, move it to the right
    if (entities[`ObstacleTop${index + 1}`].body.bounds.max.x <= 0) {
      // reset the pipe position
      const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
      Matter.Body.setPosition(entities[`ObstacleTop${index + 1}`].body, {
        x: pipeSizePos.pipeTop.pos.x,
        y: pipeSizePos.pipeTop.pos.y,
      });
      Matter.Body.setPosition(entities[`ObstacleBottom${index + 1}`].body, {
        x: pipeSizePos.pipeBottom.pos.x,
        y: pipeSizePos.pipeBottom.pos.y,
      });
      // reset the point
      entities[`ObstacleTop${index + 1}`].point = false;
    }

    // move the top and bottom pipes 3 pixels to the left every time the function is called
    Matter.Body.translate(entities[`ObstacleTop${index + 1}`].body, {
      x: -3,
      y: 0,
    });
    Matter.Body.translate(entities[`ObstacleBottom${index + 1}`].body, {
      x: -3,
      y: 0,
    });
  }

  // detect collision between the bird and the floor/pipes
  Matter.Events.on(engine, "collisionStart", (event) => {
    // if the bird collides with the floor, restart the game
    dispatch({ type: "game-over" });
  });

  return entities;
};

export default Physics;
