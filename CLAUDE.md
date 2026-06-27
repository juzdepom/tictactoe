# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a vanilla JavaScript tic tac toe game with no build process or external dependencies. The entire application runs client-side in the browser.

## Running the Game

**Option 1: Direct file** (simplest)
```bash
open index.html
```

**Option 2: Local HTTP server** (recommended for development)
```bash
python3 -m http.server 8888
# Then visit http://localhost:8888 in your browser
```

## Architecture

### Game State (script.js)
The game state is maintained as global variables in `script.js`:
- `board` - Array of 9 cells representing the 3×3 grid (indices 0-8, left-to-right, top-to-bottom)
- `currentPlayer` - Either 'X' (human) or 'O' (computer)
- `gameActive` - Boolean flag to prevent moves after game ends
- `mode` - Either 'ai' (vs computer) or 'player' (2-player)
- `scores` - Object tracking cumulative wins/draws across multiple games
- `winPatterns` - Hardcoded array of 8 winning combinations (3 rows, 3 cols, 2 diagonals)

### Game Flow

1. **Player Move** (`makeMove(index)`)
   - Validates the move is legal (cell empty, game active)
   - Updates board and UI
   - Checks for win/draw
   - If mode='ai' and game ongoing: triggers computer move after 500ms delay

2. **AI Move** (`computerMove()`)
   - Calls `findBestMove()` for strategic placement
   - Updates board and checks for win/draw
   - Returns control to player (X)

3. **AI Strategy** (`findBestMove()`)
   - Priority 1: Find a winning move for computer (O)
   - Priority 2: Block player's winning move
   - Priority 3: Take center (index 4)
   - Priority 4: Take a random corner (0, 2, 6, 8)
   - Returns -1 if no strategic move found (fills edges randomly)

### UI Updates

- `updateDisplay()` - Syncs board state to DOM: updates cell text, applies .x/.o color classes, updates score spans
- `updateStatus(message)` - Updates the game status text
- `checkWinner(boardState)` - Tests a board state against all 8 win patterns, returns 'X', 'O', or null

### Control Flow
Mode selection (`setMode()`) → User/AI alternate moves → Win/draw detection → Score update → Reset or continue

## Key Implementation Details

### Board Indexing
```
0 1 2
3 4 5
6 7 8
```

### Game End Conditions
- **Win**: Three in a row (checked against 8 patterns in `winPatterns`)
- **Draw**: All 9 cells filled with no winner
- Both increment the `scores` object and set `gameActive = false`

### Mode Switching
The mode buttons use `setMode('ai')` or `setMode('player')` which:
- Updates the global `mode` variable
- Updates active button styling
- Calls `resetGame()` to clear the board

## Styling

**CSS Grid Layout** (`style.css`)
- `.board` uses `grid-template-columns: repeat(3, 100px)` for the 3×3 grid
- `.cell` buttons are 100×100px with hover effects
- Color scheme: Purple gradient background (#667eea → #764ba2), white cells
- X moves styled in blue (#667eea), O moves in purple (#764ba2)

## Common Modifications

**Change AI difficulty:** Edit `findBestMove()` to adjust strategy priority or randomness

**Add new game mode:** Add case to `setMode()` and modify `makeMove()` branching logic

**Modify colors:** Update CSS variables in `.cell.x`, `.cell.o`, and the gradient background

**Adjust board size:** Change `grid-template-columns: repeat(3, ...)` and expand `winPatterns` + board array

**Change UI text:** Search and replace in `index.html` (e.g., "You won! 🎉")

## Testing the Game

No automated tests; manual testing required:
1. **AI Mode**: Verify computer blocks winning moves and takes winning opportunities
2. **2-Player Mode**: Verify turn alternation and win detection
3. **Edge cases**: Test draws, score persistence across games, mode switching mid-game
4. **Responsive**: Test on mobile browsers (viewport meta tag already present)

## GitHub

Repository: https://github.com/juzdepom/tictactoe
