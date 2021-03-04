import React from "react";

const BoardRend = ({ board, doOnClick }) => {
  const board_shown = board.map((rows) => {
    var row = rows.map((cell) => {
      return (
        <td className="text-center">
          <button
            className="btn btn-light rounded-0 my-1 mx-1 fs-1 p-5 game-btn"
            value={cell.pos}
            onClick={() => {
              doOnClick(cell.pos);
            }}
          >
            {cell.val}
          </button>
        </td>
      );
    });
    return <tr>{row}</tr>;
  });

  return (
    <table className="mx-auto mt-5">
      <tbody>{board_shown}</tbody>
    </table>
  );
};

export default BoardRend;
