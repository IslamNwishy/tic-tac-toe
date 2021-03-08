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
  GamesAIWon = 0;
  GamesP1Won = 0;
  GamesTied = 0;

  componentDidMount() {
    this.RestartTheGame();
  }
  componentDidUpdate() {
    if (this.state.turn % 2 !== 0 && this.state.gameState <= 0) {
      var NewPos = AITurn(this.state.board, this.P1, this.AI);
      this.MakeMove(NewPos.x, NewPos.y);
    }
  }

  MakeMove = (x, y) => {
    var newBoard = this.state.board;

    if (newBoard[x][y].val === "") {
      newBoard[x][y].val = this.state.turn % 2 === 0 ? this.P1 : this.AI;
      var newturn = this.state.turn + 1;
      this.setState({ board: newBoard, turn: newturn });

      console.log(isEnd(this.state.board));
      switch (isEnd(this.state.board)) {
        case this.P1:
          this.InfoText = "Player Wins!";
          this.GamesP1Won++;
          this.setState({ gameState: 1 });
          break;
        case this.AI:
          this.InfoText = "AI Wins!";
          this.GamesAIWon++;
          this.setState({ gameState: 1 });
          break;
        case "":
          this.InfoText = "Game is a Tie";
          this.GamesTied++;
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

  RestartTheGame = () => {
    var StartBoard = initialize_board();
    var WhichTurn = (this.GamesAIWon + this.GamesP1Won + this.GamesTied) % 2;
    this.InfoText = "Player Turn";
    this.setState({ board: StartBoard, turn: WhichTurn, gameState: 0 });
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center align-items-center text-white mt-2 fs-5">
          <div className="col">
            <p>Player</p>
            <span className="fs-3">{this.GamesP1Won}</span>
          </div>
          <div className="col">
            <p>Tied</p>
            <span className="fs-3">{this.GamesTied}</span>
          </div>
          <div className="col">
            <p>AI</p>
            <span className="fs-3">{this.GamesAIWon}</span>
          </div>
        </div>
        <BoardRend board={this.state.board} doOnClick={this.ButtonOnClick} />
        <p className={this.textClass}>{this.InfoText}</p>
        {this.state.gameState > 0 ? (
          <button
            className="btn btn-outline-light"
            onClick={this.RestartTheGame}
          >
            Try Again?
          </button>
        ) : (
          <p></p>
        )}
      </div>
    );
  }
}

export default Game;
