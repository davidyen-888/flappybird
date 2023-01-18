import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./utils/physics";

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currPoints, setCurrPoints] = useState(0);

  // set running to true when the component mounts
  // useEffect(() => {
  //   setRunning(true);
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          fontWeight: "bold",
          margin: 50,
        }}
      >
        {currPoints}
      </Text>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case "game-over":
              setRunning(false);
              gameEngine.stop();
              break;
            case "add-point":
              setCurrPoints(currPoints + 1);
              break;
          }
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>
      {/* Home screen */}
      {!running ? (
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "white",
              }}
              onPress={() => {
                setCurrPoints(0);
                setRunning(true);
                gameEngine.swap(entities());
              }}
            >
              START GAME
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
