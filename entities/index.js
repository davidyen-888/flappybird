import Matter from "matter-js";
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import { Dimensions } from "react-native";

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

  return {
    physics: { engine, world },
    Bird: Bird(world, "red", { x: 50, y: 350 }, { width: 40, height: 40 }),
    Floor: Floor(
      world,
      "green",
      { x: windowWidth / 2, y: windowHeight },
      { width: windowWidth, height: 50 }
    ),
  };
};
