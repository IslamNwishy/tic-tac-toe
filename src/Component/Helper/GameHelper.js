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

function isEnd(board) {
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

  for (i = 0; i < BOARDW; i++)
    for (var j = 0; j < BOARDW; j++) {
      if (board[i][j].val === "") return null;
    }
  return "";
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

function evaluate(board, p1, ai) {
  var AIChances = _evaluate(board, p1);
  var P1Chances = _evaluate(board, ai);

  var res = AIChances - P1Chances;
  var check = isEnd(board);
  switch (check) {
    case p1:
      return [res - 10, true];
    case ai:
      return [res + 10, true];
    case "":
      return [res, true];
    default:
  }
  return [res, false];
}

function _max(board, depth, isMax, p1, ai) {
  var best = -1000;

  for (var i = 0; i < BOARDW; i++)
    for (var j = 0; j < BOARDW; j++) {
      var temp = board[i][j].val;
      if (temp === "") {
        board[i][j].val = ai;

        var current = minimax(board, depth + 1, !isMax, p1, ai);
        if (current > best) best = current;
        board[i][j].val = temp;
      }
    }
  return best;
}

function _min(board, depth, isMax, p1, ai) {
  var best = 1000;

  for (var i = 0; i < BOARDW; i++)
    for (var j = 0; j < BOARDW; j++) {
      var temp = board[i][j].val;
      if (temp === "") {
        board[i][j].val = p1;

        var current = minimax(board, depth + 1, !isMax, p1, ai);
        if (current < best) best = current;
        board[i][j].val = temp;
      }
    }
  return best;
}

function minimax(board, depth, isMax, p1, ai) {
  var score = evaluate(board, p1, ai);
  if (score[1]) return score[0];

  if (isMax) return _max(board, depth, isMax, p1, ai);
  else return _min(board, depth, isMax, p1, ai);
}

function AITurn(board, p1, ai) {
  var BestVal = -1000;
  var Px = -1;
  var Py = -1;
  for (var i = 0; i < BOARDW; i++)
    for (var j = 0; j < BOARDW; j++) {
      var temp = board[i][j].val;
      if (temp === "") {
        board[i][j].val = ai;
        var MoveVal = minimax(board, 0, false, p1, ai);

        board[i][j].val = temp;
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
