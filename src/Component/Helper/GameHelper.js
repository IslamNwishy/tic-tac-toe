const BOARDW = 3;

function bObject(pos, val) {
  return { pos: pos, val: val };
}

function initialize_board() {
  var board = [[], [], []];
  for (var i = 0; i < BOARDW; i++) {
    for (var j = 0; j < BOARDW; j++) {
      board[i].push(bObject(i * BOARDW + j, ""));
    }
  }
  return board;
}

function isEnd(board, turnCount) {
  //vertical win
  for (var i = 0; i < BOARDW; i++) {
    var state = board[0][i].val;

    if (state !== "" && board[1][i].val === state && board[2][i].val === state)
      return state;
  }

  //horizontal win
  for (i = 0; i < BOARDW; i++) {
    state = board[i][0].val;
    if (state !== "" && board[i][1].val === state && board[i][2].val === state)
      return state;
  }

  //diagonal win
  state = board[1][1].val;
  if (state !== "" && board[0][0].val === state && board[2][2].val === state)
    return state;
  if (state !== "" && board[0][2].val === state && board[2][0].val === state)
    return state;

  //tie
  //   if (turnCount >= 8) return "";
  for (i = 0; i < BOARDW; i++)
    for (var j = 0; j < BOARDW; j++) {
      if (board[i][j].val === "") return null;
    }
  return "";

  //   //game has not ended
  //   return null;
}

function _evaluate(board, notAllowed) {
  var wins = 0;
  //vertical win
  for (var i = 0; i < BOARDW; i++) {
    var state = board[0][i].val;

    if (
      state !== notAllowed &&
      board[1][i].val !== notAllowed &&
      board[2][i].val !== notAllowed
    )
      wins++;
  }

  //horizontal win
  for (i = 0; i < BOARDW; i++) {
    state = board[i][0].val;
    if (
      state !== notAllowed &&
      board[i][1].val !== notAllowed &&
      board[i][2].val !== notAllowed
    )
      wins++;
  }

  //diagonal win
  state = board[1][1].val;
  if (
    state !== notAllowed &&
    board[0][0].val !== notAllowed &&
    board[2][2].val !== notAllowed
  )
    wins++;
  if (
    state !== notAllowed &&
    board[0][2].val !== notAllowed &&
    board[2][0].val !== notAllowed
  )
    wins++;

  return wins;
}

function evaluate(board, turnCount, p1, ai) {
  var check = isEnd(board, turnCount);
  switch (check) {
    case p1:
      return -10;
    case ai:
      return 10;
    case "":
      return null;
    default:
  }

  var AIChances = _evaluate(board, p1);
  var P1Chances = _evaluate(board, ai);

  return AIChances - P1Chances;
}

function _max(board, turnCount, depth, isMax, p1, ai) {
  var best = -1000;

  for (var i = 0; i < BOARDW; i++)
    for (var j = 0; j < BOARDW; j++) {
      var temp = board[i][j].val;
      if (temp === "") {
        board[i][j].val = ai;
        turnCount++;

        var current = minimax(board, turnCount, depth + 1, !isMax, p1, ai);
        if (current > best) best = current;
        board[i][j].val = temp;
        turnCount--;
      }
    }
  return best;
}

function _min(board, turnCount, depth, isMax, p1, ai) {
  var best = 1000;

  for (var i = 0; i < BOARDW; i++)
    for (var j = 0; j < BOARDW; j++) {
      var temp = board[i][j].val;
      if (temp === "") {
        board[i][j].val = p1;
        turnCount++;

        var current = minimax(board, turnCount, depth + 1, !isMax, p1, ai);
        if (current < best) best = current;
        board[i][j].val = temp;
        turnCount--;
      }
    }
  return best;
}

function minimax(board, turnCount, depth, isMax, p1, ai) {
  var score = evaluate(board, turnCount, p1, ai);
  if (score === 10 || score === -10) return score;
  if (score === null) return 0;

  if (isMax) return _max(board, turnCount, depth, isMax, p1, ai);
  else return _min(board, turnCount, depth, isMax, p1, ai);
}

function AITurn(board, turnCount, p1, ai) {
  var BestVal = -1000;
  var Px = -1;
  var Py = -1;
  for (var i = 0; i < BOARDW; i++)
    for (var j = 0; j < BOARDW; j++) {
      var temp = board[i][j].val;
      if (temp === "") {
        board[i][j].val = ai;
        turnCount++;
        var MoveVal = minimax(board, turnCount, 0, false, p1, ai);

        board[i][j].val = temp;
        turnCount--;
        if (MoveVal > BestVal) {
          Px = i;
          Py = j;
          BestVal = MoveVal;
        }
      }
    }

  return { x: Px, y: Py };
}

export { initialize_board, isEnd, AITurn };
