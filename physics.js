import Matter from "matter-js";

// dispatch allows us to send messages to the GameEngine
const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.setVelocity(entities.Bird.body, {
        // the bird only move up when touched
        x: 0,
        y: -8,
      });
    });

  // trigger an update on the physics engine
  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
