import Matter from "matter-js";

// dispatch allows us to send messages to the GameEngine
const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  // trigger an update on the physics engine
  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
