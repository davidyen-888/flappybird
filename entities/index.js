import Matter from "matter-js";
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import { Dimensions } from "react-native";
import Obstacle from "../components/Obstacle";
import { getPipeSizePosPair } from "../utils/random";

// get the device screen height and width
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

// This function will be responsible for restarting the game
export default (restart) => {
  // initialize the physics engine, enableSleeping can be set to false to improve performance
  let engine = Matter.Engine.create({ enableSleeping: false });

  // create a physics world with a gravity of 0.4
  let world = engine.world;
  world.gravity.y = 0.4;

  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);

  return {
    physics: { engine, world },
    Bird: Bird(world, { x: 50, y: 350 }, { width: 48, height: 48 }),
    ObstacleTop1: Obstacle(
      world,
      "ObstacleTop1",
      "khaki",
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size
    ),
    ObstacleBottom1: Obstacle(
      world,
      "ObstacleBottom1",
      "lightgreen",
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size
    ),

    ObstacleTop2: Obstacle(
      world,
      "ObstacleTop2",
      "lightcyan",
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size
    ),
    ObstacleBottom2: Obstacle(
      world,
      "ObstacleBottom2",
      "wheat",
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size
    ),
    Floor: Floor(
      world,
      "olive",
      { x: windowWidth / 2, y: windowHeight },
      { width: windowWidth, height: 50 }
    ),
  };
};
