import React from "react";
import { StyledCell } from "./styles/styledCell";
import { TETROMINOS } from "../tetrominos";

// export default function Cell({ type }) {

//   return (
//     <StyledCell type={type} color={TETROMINOS[type].color} />
//   )
// };

// const Cell = ({ type }) => (
//   <StyledCell type={type} color={TETROMINOS[type].color} />
// );
// export default Cell;

const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color}></StyledCell>
);

export default React.memo(Cell);
