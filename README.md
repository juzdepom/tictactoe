# Tic Tac Toe Game

A simple, interactive tic tac toe game built with vanilla HTML, CSS, and JavaScript.

## Features

- **Play vs Computer** - Challenge an AI opponent with smart strategy
- **2 Player Mode** - Play with a friend on the same device
- **Score Tracking** - Keep track of wins, losses, and draws
- **Responsive Design** - Works on desktop and mobile devices
- **Beautiful UI** - Modern gradient design with smooth animations

## How to Play

1. Open `index.html` in your web browser
2. Choose your game mode:
   - **Play vs Computer**: You are X, the computer is O
   - **2 Player**: Players alternate between X and O
3. Click on empty cells to make your move
4. First player to get 3 in a row (horizontally, vertically, or diagonally) wins!

## Game Modes

### AI Strategy
The computer AI uses a strategic approach:
1. Try to win if possible
2. Block the player from winning
3. Take the center if available
4. Take a corner strategically
5. Fill remaining spaces

### Two Player
Perfect for playing with a friend. Players take turns as X and O.

## Project Structure

```
tictactoe/
├── index.html      # Game HTML structure
├── style.css       # Game styling and layout
├── script.js       # Game logic and AI
└── README.md       # This file
```

## Running the Game

### Option 1: Direct File
Simply open `index.html` in your web browser.

### Option 2: Local Server
For better compatibility, run a local HTTP server:

```bash
cd tictactoe
python3 -m http.server 8888
```

Then visit `http://localhost:8888` in your browser.

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Flexbox/Grid layout, gradients, animations
- **Vanilla JavaScript** - Game logic and AI

## License

Free to use and modify!
