import React, { useState } from "react";
//styled components
import { StyledTetrisWrapper, StyledTetris } from "./styles/styledTetris";

//components
import Stage from "./stage";
import Display from "./display";
import StartButton from "./startButton";

//custome Hooks
import { createStage, checkCollision } from "../_gameHelpers";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";

export default function Tetris() {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log("re-render");

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    console.log("test");
    //reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
  };

  const drop = () => {
    //check collision on y axis
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // when Game Over
      if (player.pos.y < 1) {
        console.log("Game Over!!");
        setDropTime(null);
        setGameOver(true);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const movePlayerDown = () => {
    setDropTime(null);
    drop();
  };

  const keyUp = ({ keyCode }) => {
    if (!gmaeOver) {
      if (keyCode === (40 || 83)) {
        setDropTime(1000);
      }
    }
  };

  // tetromino movement left, right, dropdown
  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === (37 || 65)) {
        movePlayer(-1);
      } else if (keyCode === (39 || 68)) {
        movePlayer(1);
      } else if (keyCode === (40 || 83)) {
        movePlayerDown();
      } else if (keyCode === (38 || 87)) {
        playerRotate(stage, 1);
      } else if (keyCode === 16) {
        playerRotate(stage, -1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  console.log(createStage());
  return (
    <StyledTetrisWrapper
    role="button"
    tabIndex="0"
    onKeyDown={(e) => move(e)}
    onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Git Gud!" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}
