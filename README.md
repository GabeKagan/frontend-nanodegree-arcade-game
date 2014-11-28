frontend-nanodegree-arcade-game
===============================

My implementation of this project is available at http://gabekagan.github.io/frontend-nanodegree-arcade-game/

Besides the usual resources (the Object-Oriented Javascript course, HTML5 Canvas course, Piazza, Mozdev, etc),
I also based some of my code off examples at http://blog.sklambert.com/html5-canvas-game-2d-collision-detection/
More details on that in the comments for the actual code.

This game contains several required files:
- index.html, the container page, which loads up some UI elements and everything else
- app.js, which contains game logic
- engine.js, which implements a game loop and an HTML canvas
- resources.js, which implements a simple image loading function and was provided by the course

It also contains the stock images provided with the course and two sound files which I added myself.

Most of this project is stock, and the gameplay is very simple:
- Use the arrow keys to move your character around
- You get 100 points every time you manage to move to the top row
- If you collide with a bug, you lose your score and the game "starts over".
- Bugs move faster and spawn more frequently as your score increases. 

Compared to the minimum implementation, I have added the following things:
- A "pause" function, which is pretty self explanatory
- A "reset" function, called when you die or press the reset button. It creates a clean slate for the game.
- A scoring system! My highest record so far is 2500 points, although I could do better if I got lucky.
- Automatic difficulty adjustment based on the score.
- Sound effects! 

This applet requires at the very least, a 505x606 window to render the canvas. I would not play this game on anything with less than a 1024x600 screen (which may need to be vertically oriented), and while responsive design is a key part of this course, I do not know how I would go about adjusting the game for smaller screens without reducing overall fidelity or functionality. I guess I'll learn a couple of those things in Project 4!

Overall, this was definitely a more complicated project than the first two, and it took me some time to figure out how to go about implementing everything. Once I grasped the game logic, actually coding things was fairly quick, and I was able to implement things rapidly.

I used the rubric at https://www.udacity.com/course/viewer#!/c-ud015/l-3072058665/m-3072588797 to check my progress.
