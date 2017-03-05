# Silly Rabbit

Silly Rabbit is an endless runner game inspired by Google's T-Rex runner game.

## Functionality

In Silly Rabbit, users will be able to:

- [ ] Start, pause, and reset the game.
- [ ] Choose a difficulty level.
- [ ] Scoring and saving high scores

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

## Wireframe

This app will consist of a single game screen and a nav with links to my Github, LinkedIn, and the About modal.

![wireframe](./docs/wire-frame.png)

## Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jQuery` for overall structure and game logic,
- `HTML5 Canvas` for rendering
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, the following scripts will be needed:

- `player.js`: this script will handle logic for jumping and collisions of the player object.
- `board.js`: this script will handle object rendering
- `obstacle.js`: this script will be all the obstacles in the game.

## Timeline

**Day 1**: Setup HTML and CSS to render all non-canvas objects.  Setup player object that can jump.

**Day 2**: Create obstacles that the player object has to jump over.  Add collision between player and obstacles.

**Day 3**: Add scoring and highscores. Add difficulty levels.
