import { Dimensions } from "react-native";

// get the device screen height and width
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export const getRandomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getPipeSizePosPair = (addToPosX = 0) => {
  let yPosTop = -getRandomBetween(300, windowHeight - 100);

  const pipeTop = {
    pos: { x: windowWidth + addToPosX, y: yPosTop },
    size: { width: 75, height: windowHeight * 2 },
  };
  const pipeBottom = {
    pos: { x: windowWidth + addToPosX, y: windowHeight * 2 + 200 + yPosTop },
    size: { width: 75, height: windowHeight * 2 },
  };

  return { pipeTop, pipeBottom };
};
