# XOXO - Tic-Tac-Toe Pro

An interactive, feature-rich Tic-Tac-Toe web application built with **HTML, CSS, and JavaScript**. The application combines classic Tic-Tac-Toe gameplay with multiple visual themes, an unbeatable computer opponent, game statistics, timer tracking, animations, and responsive design.

## Features

- **Two game modes** — play against an unbeatable computer, or play locally against another player
- **Four visual themes** — switch between Spooky, Neon, Luxury Black & Gold, and Retro Arcade themes
- **Win detection** — checks all 8 possible winning combinations after every move and highlights the winning cells
- **Draw detection** — automatically detects when the board is full without a winner
- **Scoreboard** — tracks X wins, O wins, and draws across multiple rounds
- **Win rate** — calculates the player's win percentage based on completed rounds
- **Streak tracking** — keeps track of consecutive X wins
- **Move counter** — records the total number of moves played
- **Game timer** — tracks the duration of the current round
- **Winning animations** — highlights winning cells with animated effects
- **Move animations** — adds a pop animation whenever a move is placed
- **Confetti effect** — celebrates every winning round with animated confetti
- **Theme-specific effects** — spooky floating ghosts and bats, neon glow effects, luxury gold styling, and retro CRT scanlines
- **Keyboard support** — press `R` to quickly start a new round
- **Responsive design** — optimized for desktop, tablet, and mobile screens
- **No external dependencies** — runs directly in the browser using vanilla HTML, CSS, and JavaScript

## File structure

```text
index.html      Page markup and game interface
style.css       Responsive styling and four visual themes
script.js       Game logic, statistics, timer, and minimax CPU
README.md       Project documentation
````

## Running it locally

No build step or dependencies are required — the project uses plain HTML, CSS, and JavaScript.

1. Download or clone the repository.

2. Open `index.html` directly in a browser, or serve it locally:

   ```bash
   npx serve .
   # or
   python3 -m http.server
   ```

3. Visit the local URL printed in your terminal.

## How to play

### Vs Computer

* **X** is controlled by the player.
* **O** is controlled by the computer.
* Click any available cell to make your move.
* The computer automatically responds using the minimax algorithm.
* The computer plays optimally, meaning it cannot be defeated.

### Vs Player

* Two players take turns using **X** and **O**.
* The game automatically switches between players after every move.
* The first player to complete a row, column, or diagonal wins.

## Game Statistics

The application provides additional gameplay statistics:

* **X Wins** — number of rounds won by X
* **O Wins** — number of rounds won by O
* **Draws** — number of tied rounds
* **Win Rate** — percentage of completed rounds won by X
* **Streak** — consecutive X victories
* **Moves** — total number of moves played

The **New Game** button clears the current board while keeping the scoreboard and statistics intact.

## Themes

XOXO includes four interactive visual themes:

*  **Spooky** — dark red/orange horror-inspired interface with floating ghosts and bats
*  **Neon** — futuristic purple, pink, and cyan neon styling with glowing effects
*  **Luxury** — elegant black and gold interface inspired by premium designs
*  **Arcade** — retro gaming interface with pixel typography, neon colors, CRT effects, and scanlines

The theme can be changed at any time without affecting the current game.

## Notes on the implementation

* Game state is maintained using a flat 9-element `board` array.
* All 8 possible winning combinations are stored in `WIN_LINES`.
* After every move, the board is checked for a winner or draw.
* The winning combination is visually highlighted when a player wins.
* The CPU uses **minimax with depth-based scoring**, allowing it to prioritize faster victories and delay losses.
* The timer starts when a round begins and stops automatically when the game ends.
* Scores, streaks, and move statistics are updated dynamically using JavaScript.
* CSS custom properties are used to make switching between the four themes efficient.
* CSS animations are used for moves, winning cells, neon effects, confetti, and decorative theme elements.
* The layout uses responsive CSS so the game remains usable across different screen sizes.

## Technologies Used

* **HTML5** — application structure and game interface
* **CSS3** — responsive design, themes, animations, gradients, and visual effects
* **JavaScript** — game logic, DOM manipulation, timer, statistics, and minimax AI
* **Google Fonts** — Space Grotesk, Creepster, Orbitron, JetBrains Mono, Playfair Display, and Press Start 2P


