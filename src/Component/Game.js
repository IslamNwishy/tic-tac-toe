import React, { Component } from "react";
import BoardRend from "../Board-Renderer";
import { AITurn, initialize_board, isEnd } from "./Helper/GameHelper";

class Game extends Component {
  state = {
    board: [],
    turn: 0,
    gameState: 0,
  };
  P1 = "X";
  AI = "O";
  textClass = "text-white mt-5 fs-3";
  InfoText = "Player Turn";

  componentDidMount() {
    var StartBoard = initialize_board();
    this.setState({ board: StartBoard });
  }
  componentDidUpdate() {
    if (this.state.turn % 2 !== 0 && this.state.gameState <= 0) {
      var NewPos = AITurn(this.state.board, this.state.turn, this.P1, this.AI);
      this.MakeMove(NewPos.x, NewPos.y);
    }
  }

  MakeMove = (x, y) => {
    var newBoard = this.state.board;

    if (newBoard[x][y].val === "") {
      newBoard[x][y].val = this.state.turn % 2 === 0 ? this.P1 : this.AI;
      var newturn = this.state.turn + 1;
      this.setState({ board: newBoard, turn: newturn });

      console.log(isEnd(this.state.board, this.state.turn));
      switch (isEnd(this.state.board, this.state.turn)) {
        case this.P1:
          this.InfoText = "Player Wins!";
          this.setState({ gameState: 1 });
          break;
        case this.AI:
          this.InfoText = "AI Wins!";
          this.setState({ gameState: 1 });
          break;
        case "":
          this.InfoText = "Game is a Tie";
          this.setState({ gameState: 2 });
          break;
        default:
          console.log(this.state.turn);
          this.InfoText =
            (this.state.turn - 1) % 2 === 0 ? "Player Turn" : "AI Turn";
          this.setState({ gameState: 0 });
      }
    }
  };

  ButtonOnClick = (position) => {
    if (this.state.gameState > 0) return;
    var x = Math.floor(position / 3);
    var y = Math.floor(position % 3);
    this.MakeMove(x, y);
  };

  render() {
    return (
      <div className="container">
        <BoardRend board={this.state.board} doOnClick={this.ButtonOnClick} />
        <p className={this.textClass}>{this.InfoText}</p>
      </div>
    );
  }
}

export default Game;
