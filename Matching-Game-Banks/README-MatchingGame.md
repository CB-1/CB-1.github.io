CHERYL BANKS
README FILE FOR THE MATCHING GAME
DEC 2018


#SUMMARY

The Matching Game is a memory game built on JavaScript/jQuery, CSS, and HTML.  
The objective of the game is to rely on your memory to find 8 pairs of cards with
hidden matching icons within a given time frame and other parameters.


##HOW TO START THE GAME

Open the "index.html" file in your favorite browser.  The opening window will be a 
"Welcome" message.  Below the message there is a brief set of 'how-to-play-the-game' 
instructions available through the clickable logo shaped like an arrow.

More detailed instructions are available through a clickable 'refresh' Font Awesome icon 
on the main game page.


##PLUGINS

There are no special files or apps that you will need to install on your computer
to play the game.  The index.html file already includes links to jQuery (3.3.1), 
jQuery UI (1.12.1), Google Fonts, Font Awesome (v5.4.2), and Bootstrap (4.1.3).

jQuery UI provides the shake and bounce effects for incorrect and correct card pairings,
respectively.  It also provides the pulsate effect when the user clicks the pause and
replay icons during game play.

Font Awesome provides all of the icons that appear in the game.

Bootstrap provides all clickable buttons seen in the game.


##CODE LOGIC - Summary of my thought process

Overall, the Matching Game is reliant upon utilizing the same loop repeatedly until the
game ends.  The loop consists of comparing two cards chosen by the user to determine 
if the hidden icons match.

The end of the game is determined when the user either:
- runs out of time and/or moves
- finds all 8 card pairs before this occurs.

JavaScript allows for repetitive functions to occur via loops, but this approach does
not work when the loop can only be activated by user clicks.  Instead, by its nature, 
the loop will fire a certain number of times per click.  

Thus, my approach involved writing a series of interdependent functions that are called 
(fire) in succession.  

Before the game starts, I rely upon the $(function) jQuery method to shuffle the cards 
when the document is first loaded.

The next group of functions rely on info about the skill level that the user picked to
populate the scoreboard on the main game page and other elements on several overlays.

Next, the game starts when the user clicks the start button.  Doing so triggers two major
functions, including one that controls the timer and another that controls two card clicks
per move.  The 'loop' for the timer is controlled via the setInterval method set to 1 
second per loop.  The 'loop' that handles the two card clicks includes a series of 
functions that fire sequentially.

I rely on two sets of if-then Boolean statements to verify:
- First, whether to continue the game or bring it to an end
- Second, whether the game is lost or won.

Continuing the game, ending it, and whether it is lost or won is reliant upon a series of 
functions that fire sequentially (similar to the 'loop' that handles the two card clicks).
The function that controls whether or not to continue the game is executed repeatedly
until the Boolean if-then statement determines that the game is over.  Thereafter, either 
the win function or the lose function will only need to fire once.

For further details, please refer to these sections that follow:
- 'Code Logic Details'
- 'APP.JS'


###Code Logic Details

The Matching Game requires the user to click on 2 cards per turn until 8 matching card
pairings are located in order to win the game.

1. Before the game starts, the following steps must occur:

- The card deck must be shuffled
- The user chooses a skill level
- The info from their option populates the game scoreboard and the "Game Won" stat board
- The user clicks the start button to begin the game.  
- The click initiates the startGame() function.


2. When the game starts, the following steps must occur via the keepGoing() function:

- The hidden icon of the first card clicked is revealed with a flip of the card.
- jQuery off-click method must be applied to the first card clicked.
- The index and icon name, respectively, of the first card must be stored in an array
called holdTwoCards.
- These 2 steps repeat for the second card.


3. After 2 clicks, the holdTwoCards array looks like this:

- 1st index - index of the first card clicked
- 2nd index - icon name of the first card clicked
- 3rd index - index of the second card clicked
- 4th index - icon name of the second card clicked


4. Next, an if-then statement is tested to verify that the array has a length of 4 using
the catchTheClick() function.  If so, the comparison() function is called, and the
following occurs:

- jQuery off-click is applied to all other cards

- All other cards are identified by whether or not they have the same index of the 2
cards clicked

- The number of moves remaining is reduced by 1.  This appears on the scoreboard as the
Font Awesome balloon icon.

- The icon names of both cards (stored in indices 2 and 4 of the array) are compared

- If they are not alike, then both cards turn red and shake briefly (via the jQuery UI effect),
then flip to hide the icons again

- If they are alike, then both cards turn green, bounce briefly (via the jQuery UI effect),
and remain open.  The number of correct card pairs increases by 1.  This appears on the 
scoreboard as the Font Awesome cards icon.


5. Next, the continueOrStop() function is called.  It includes a string of Boolean if-then
statements to determine if the game should continue or stop.  Also, to maintain
off-click on all cards while the function is called, then the event.preventDefault()
method is re-applied to all cards.  Without this, the user can continue to click.

- The game resumes (the startGame() function is called) if all card pairs aren't found 
and there are moves and time remaining.

- The endGameWinOrLose() function is called if time runs out or there are no moves left.
endGameWinOrLose() contains a series of Boolean if-then statements that determine if the
game is won or lost.


6. If the game continues, at the start of the startGame() function, then the holdTwoCards 
array is emptied.  Also, if the prior 2 cards clicked were a match, then off-click is 
applied to both.  Next, steps 2 through 5 are repeated.


7. Regarding the number of stars, each game starts with 5.  Since 5 is 20% of a whole set,
then the number of stars remaining is reduced by 1 each time that 20% of the total number 
of moves available is used.  This is accomplished with the inTheStars() and the
populateStars() functions.  

- inTheStars() counts the number of moves used.
- populateStars() populates the scoreboard with the current number of stars remaining 
during the game.   


8. If the game is lost, then endGameWinOrLose() will call the gameOverLoss() function.  

- The timer is stopped and the pause button is hidden.
- The words "Game Over" are shown on the game board.
- Each unmatched card is flipped simultaneously to reveal its hidden icon.
- event.preventDefault() is applied or reapplied to all cards.
- The "Game Over" overlay is populated with the number of card pairs not found.
- The "Game Over" overlay is opened.
- The overlay includes a _Play Again_ button that allows the user to restart the game.


9.  If the game is won, then endGameWinOrLose() will call the winning() and the 
statBoardPopulate() functions.

- The timer is stopped and the pause button is hidden.
- The word "Winner" is shown on the game board. 
- The "Game Won" overlay is opened.
- statBoardPopulate() populates the Winner Game Stat board on the "Game Won" overlay.


##POTENTIAL PROBLEMS

The primary problems that arose while writing this game all involved the jQuery 
off/on/one click methods.  However, these issues have since been resolved:

###First problem:
When one card from the deck is bound with one-click, it fires once.  However, the next 
card bound with one-click will fire twice.  

This problem would have rendered the game impossible because one click on two separate
cards per turn is essential to the game.

The workaround to fix this problem is to off-click then one-click both cards (app.js line 
687).  (Reference: https://www.gajotres.net/prevent-jquery-multiple-event-triggering/)


###Second problem:
Another issue that surfaced involved maintaining off-click on any previously bound cards
when one function calls another function.  To resolve this problem, I added the following code 
where necessary to ensure that previously matched card pairings remained "unclickable."

`  $("div.card.match.showOnlyCorrect").off("click").click(function( event ) {
    event.preventDefault();
  });
`

###Third problem:
After two cards have been clicked and are still in play, it was necessary to ensure that 
the user could not continue to click additional cards.  I used the following code to prevent this:

`  $("div.card").not(one).not(two).off("click").click(function( event ) {
    event.preventDefault();
  });
`

###Fourth problem:
When the user pauses the game, it was necessary to make all cards on the board "unclickable."
In addition to the above code to stop the ability to click on matched card pairs, I added
this code to disable "clickability" of all other cards during game pauses:

`  $( "div.card" ).not($("div.card.match.showOnlyCorrect")).off("click").click(function( event ) {
    event.preventDefault();
  });
`


##INDEX.HTML

Index.html includes HTML for the main page (lines 525 to 600) and six overlays as follows:

- Detailed game rules (lines 27 - 179)
- Welcome (lines 183 - 216)
- Game won (lines 220 - 291)
- Game over (lines 295 - 323)
- Choose a skill level (lines 327 - 481) 
- Skill level picked (lines 485 - 521)



##APP.CSS

app.css includes all of the CSS styling for the game.  I've divided the page into sections
based on the layout of the game as follows:

- Styling for _html_, _body_, and _hidden_ elements (lines 11 - 32)
- Welcome overlay (38 - 147)
- Main game page (151 - 245)
- Pick a skill level overlay (251 - 519)
- Skill level picked overlay (525 - 664)
- Detailed game rules overlay (671 - 788)
- Game won overlay (794 - 994)
- Game over overlay (1000 - 1071)
- Scoreboard (lines 1077 - 1183)
- Media screens (lines 1188 - 1480)



###Responsiveness

To control responsiveness in various screen sizes, I relied on media screens (app.css,
lines 1188 - 1480) and the _em_, _rem_, and _vw_ responsive sizing options wherever possible.  
I used _em_ primarily (and _rem_ to a lesser extent) for text, padding, and margins.  
I used _vw_ for the scoreboard and game stats containers on the _main game_ page 
and _game won_ pages, respectively.



##APP.JS

Similar to app.css, I've divided this page into sections.  Each section includes 
JavaScript/jQuery that controls certain functions within the game.

- Card deck shuffle (lines 26 - 69, 615 - 633)

- Open/close the dropdown (brief game instructions) on the welcome overlay (lines 74-93)

- Open/close overlays (lines 98 - 154)

- Toggle between topics on the game rules overlay (lines 159-183)

- Determine which skill level the user clicked and then populate the "Skill You Picked" 
overlay accordingly (lines 188 - 224)

- Populate the scoreboard (on the main game page) and the game stat board (on the game won 
overlay) with skill level name, moves, and time per the skill level that the user clicked before 
 game start (lines 228 - 301)

- After the game ends, the game stat board is populated with the time spent, moves, and 
stars remaining (lines 305 - 326)

- Polyfill per github.com and developer.mozilla.org for the padStart() method that adds 
an extra zero to the 00:00 timer (lines 332 - 351)

- Interval that controls the timer, initiates the 'game over' function if the user doesn't 
click anything at all, and assists in controlling the "clickability" of certain cards 
at game end.  (lines 355 - 479)

- Game won function (lines 483 - 497)

- Game over function (lines 500 - 528)

- Booleans that determine whether the game is won or lost (lines 533 - 563)

- Booleans that determine whether the game should continue or stop (lines 568 - 596)

- "Loop" that is used from game start to end in order to gather info on each user click,
hide/show cards, and render certain cards as "unclickable" (lines 601 - 776)


##REFERENCES:

- Shuffle function from http://stackoverflow.com/a/2450976

- Source for jQuery siblings() method: https://stackoverflow.com/questions/18055524/show-one-div-and-hide-others-on-clicking-a-link

- Source for removing multiple classes: https://stackoverflow.com/questions/5363289/remove-all-classes-except-one

- Reference on global variables: https://stackoverflow.com/questions/27887884/how-to-make-a-local-variable-into-global-javascript

- Polyfill for the padStart() method:
	- https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
	- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart

- Reference for jQuery setInterval method: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval

- jQuery each() method: http://api.jquery.com/jquery.each/

- How to prevent double-firing of the jQuery on/one click function:
	- Resource: https://teamtreehouse.com/community/jquery-click-event-bind-multiple-times
	- Resource: https://stackoverflow.com/questions/18009295/click-event-repeating-jquery-1-9
	- Source: https://www.gajotres.net/prevent-jquery-multiple-event-triggering/

- Source (add 2+ classes): https://stackoverflow.com/questions/3576592/is-it-possible-to-use-multiple-variables-instead-of-selectors-in-jquery

- Resource (delay): https://stackoverflow.com/questions/2510115/jquery-can-i-call-delay-between-addclass-and-such

- Resource (queue/dequeue): https://www.w3resource.com/jquery-exercises/2/jquery-fundamental-exercise-76.php

- Source (CSS grids): https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids

- How to stretch linear-gradient at page bottom:
	- Source: https://stackoverflow.com/questions/2869212/css3-gradient-background-set-on-body-doesnt-stretch-but-instead-repeats
	
- Flip element horizontally with CSS:
	- Reading reference: https://stackoverflow.com/questions/46184458/transform-translate-50-50	

- Flip cards for the _Pick a Skill Level_ overlay:
	- https://nicolaskadis.info/projects/pure-css-flip-cards-using-bootstrap-4-and-css-grid-no-js

- Grid alignment: https://www.w3schools.com/css/css_align.asp

- Dropdown on welcome overlay: https://codepen.io/secondfret/pen/mIBqf

- Align text within a div: https://www.reddit.com/r/css/comments/7ym886/how_to_center_align_text_inside_a_css_grid_cell/

- Source: https://stackoverflow.com/questions/17309928/how-to-center-text-vertically-with-a-large-font-awesome-icon

- Source: https://stackoverflow.com/questions/47017454/set-a-height-value-on-an-individual-css-grid-row

- CSS overlays:
	 - https://stackoverflow.com/questions/16670931/hide-scroll-bar-but-while-still-being-able-to-scroll
	 - https://www.josephearl.co.uk/post/css-overlay/

- Left align a child div in relation to its parent:
	- https://stackoverflow.com/questions/1269589/css-center-block-but-align-contents-to-the-left

- CSS font style syntax: https://stackoverflow.com/questions/5083192/what-does-this-size-mean-in-css-font-14px-24px-arial-helvetica-sans-serif

- Fixed headers: https://stackoverflow.com/questions/10732690/offsetting-an-html-anchor-to-adjust-for-fixed-header

- Eliminate spacing between the font awesome icons:
	- https://css-tricks.com/fighting-the-space-between-inline-block-elements/


##LICENSE

Cheryl J. Banks, a student of Udacity.com (an online school), is the author and owner 
of this version of the Matching Game.

Copyright © 2018 Cheryl J. Banks

It is free software, and may be redistributed under the terms specified in the LICENSE file.