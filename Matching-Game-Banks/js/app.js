
// CHERYL BANKS
// MATCHING GAME PROJECT
// DEC 2018
// REVISED



// CARD SHUFFLE ON PAGE LOAD - START

const stack = [
              "<div class=\"card\"><i class=\"fa fa-diamond\"></i></div>",
              "<div class=\"card\"><i class=\"fa fa-paper-plane-o\"></i></div>",
              "<div class=\"card\"><i class=\"fa fa-anchor\"></i></div>",
              "<div class=\"card\"><i class=\"fa fa-bolt\"></i></div>",
              "<div class=\"card\"><i class=\"fa fa-cube\"></i></div>",
              "<div class=\"card\"><i class=\"fa fa-anchor\"></i></div>",
              "<div class=\"card\"><i class=\"fa fa-leaf\"></i></div>",
              "<div class=\"card\"><i class=\"fa fa-bicycle\"></i></div>",
              "<div class=\"card\"><i class=\"fa fa-diamond\"></i></div>",
              "<div class=\"card\"><i class=\"fa fa-bomb\"></i></div>",
              "<div class=\"card\"><i class=\"fa fa-leaf\"></i></div>",
              "<div class=\"card\"><i class=\"fa fa-bomb\"></i></div>",
              "<div class=\"card\"><i class=\"fa fa-bolt\"></i></div>",
              "<div class=\"card\"><i class=\"fa fa-bicycle\"></i></div>",
              "<div class=\"card\"><i class=\"fa fa-paper-plane-o\"></i></div>",
              "<div class=\"card\"><i class=\"fa fa-cube\"></i></div>"
            ];


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    return array;
};


// Note to self:  $(function) is shorthand for $(document).ready
$(function() {
    $("#overlay").css("display", "block");  // Game opens with "Welcome" overlay
});

// CARD SHUFFLE ON PAGE LOAD - END




// DROPDOWN - Welcome overlay - START

$("i.fas.fa-chevron-down").click(function(){

  if ($(this).hasClass("fa-chevron-down")){
    $(this).removeClass("fa-chevron-down");
    $(this).addClass("fa-chevron-up");
    $("#dialog-about").slideDown("slow");
    $("i.fas.fa-times.closer").addClass("hidden");

  } else if($(this).hasClass("fa-chevron-up")){
    $(this).removeClass("fa-chevron-up");
    $(this).addClass("fa-chevron-down");
    $("#dialog-about").hide("slow");
    $("i.fas.fa-times.closer").removeClass("hidden");
  };

});

// DROPDOWN - Welcome overlay - END




// OPEN OR CLOSE OVERLAYS - START


// Both X icons on the welcome overlay.
// Closes the welcome overlay, opens the "pick a skill level" overlay.
$( "i.fas.fa-times" ).click(function() {
    $("#overlay").css("display", "none");
    $("#skillOverlay").css("display", "block");
});


// Info icon on the main page
// Opens the rules overlay
$("i.fas.fa-info").click(function(){
    $("#rulesOverlay").css("display", "block");
});


// X in vertical nav bar on rules overlay.
// Closes rules overlay, returns to the main page.
$("i.far.fa-times-circle").click(function(){
    $("#rulesOverlay").css("display", "none");
});


// "Back" button on the 'your pick' overlay.
// Closes the 'your pick' overlay, returns to the "pick a skill level" overlay.
$("span button.btn.btn-lg.back").click(function(){
    $("#pickOverlay").css("display", "none");
    $("#skillOverlay").css("display", "block");
});


// Reloads the game when the Restart Awesome Fonts icon is clicked.
$("i.fas.fa-redo-alt, button.btn.btn-info.btn-lg, button.btn.btn-light.lossPlayAgain").click(function(){
    location.reload(true);
});


// Closes the Congratulations You've Won overlay.
// I'm providing this option in case the user wants to see the card deck on the main page again.
// If so, s/he can replay the game by clicking the replay Font Awesome icon on the main page.
$("i.far.fa-times-circle.fa-2x.congratClose").click(function(){
  $("#winOverlay").css("display", "none");
});


// Closes the Game Over overlay.
// I'm providing this option in case the user wants to see the card deck on the main page again.
// If so, s/he can replay the game by clicking the replay Font Awesome icon on the main page.
$("i.far.fa-times-circle.fa-2x.lossClose").click(function(){
  $("#lossOverlay").css("display", "none");
});


// OPEN OR CLOSE OVERLAYS - END




// GAME RULES OVERLAY - Switches between topics on click - START

function matchFind(){

  var newLink;  // ID Name of topic clicked on.  All topics are hidden until clicked.
  var lastWord; // "Board", "Skill", "Nav", "Score", "HowToPlay"
  var firstWord;  // "game"
  var newText;  // Combines game + "Board, Skill, Nav, Score, or HowToPlay"

  newLink = $(event.target).attr("id");
  lastWord = newLink.slice(4);
  firstWord = "game";
  newText = firstWord.concat(lastWord);
  return newText;
};


$("ul.navRules li span").click(function(event){
    $("#ruleIntro").hide(); // Hide intro paragraph
    newText = matchFind(event.target);
    // Next line of code - Source: https://stackoverflow.com/questions/18055524/show-one-div-and-hide-others-on-clicking-a-link
    $("#"+newText).show().siblings("div").hide();
});

// GAME RULES OVERLAY - Switches between topics on click - END




// SKILL PICKED OVERLAY - START

$("div.card-flip").click(function(){

  $("#pickOverlay").css("display", "block");  // Opens the "Skill You Picked" overlay.
  // Next 2 lines of code - Source: https://stackoverflow.com/questions/5363289/remove-all-classes-except-one
  $("div.pickLevel").attr("class", "pickLevel");  // CSS grid style
  $("span button.btn").attr("class", "btn btn-lg"); // Bootstrap button style


  // Beginning - Style and populate the "Skill You Picked" overlay.
  if ($(this).is("#flipEasy")) {
      $("div.pickDescribe").text("EASY");
      $("div.pickLevel").addClass("eLevel");  // applies CSS style
      $("span button.btn").addClass("btn-outline-dark");  // CSS style

  } else if ($(this).is("#flipMod")) {
      $("div.pickDescribe").text("MODERATE");
      $("div.pickLevel").addClass("modLevel");
      $("span button.btn").addClass("btn-outline-dark");

  } else if ($(this).is("#flipDiff")) {
      $("div.pickDescribe").text("DIFFICULT");
      $("div.pickLevel").addClass("diffLevel");
      $("span button.btn").addClass("btn-outline-light");

  } else if ($(this).is("#flipImp")) {
      $("div.pickDescribe").text("IMPOSSIBLE");
      $("div.pickLevel").addClass("impLevel");
      $("span button.btn").addClass("btn-outline-light");

  };
  // End - Populate the "Skill You Picked" overlay.

});

// SKILL PICKED OVERLAY - END



// POPULATE SCORE BOARD and WINNER GAME STAT BOARD BEFORE GAME START - START

// Reference: https://stackoverflow.com/questions/27887884/how-to-make-a-local-variable-into-global-javascript
//These variables must be available to multiple functions, therefore they are declared globally.
var xMin; // minutes
var ySec; // seconds
var startTimer; // Interval for the timer
var moves;

// Holds the original values for stars and moves, respectively.
var starsBeginGame;
var originalMoves;


function populateStars(starsBeginGame) {
  var starString = starsBeginGame.toString();
  $("#scoreBoardStars").text(starString);
};


// Beginning - Populate the scoreboard (level, moves, time) and Winner Stat Board based on skill picked at game start.
$("button.btn.btn-lg.next").click(function(){
    $("#pickOverlay").css("display", "none");
    $("#skillOverlay").css("display", "none");
    ySec = 0;

    starsBeginGame = 5;
    populateStars(starsBeginGame);

    if (($("div.pickDescribe").text()) === "EASY") {

         // #scoreBoardMoves and #playerLevel populate skill level on scoreboard and Winner Stat Board, respectively
        $("#scoreBoardLevel, #playerLevel").text("Easy");
         // #scoreBoardMoves and #moveCommence populate moves at game start on scoreboard and Winner Stat Board, respectively
        $("#scoreBoardMoves, #moveCommence").text("100");
        originalMoves = moves = 100;
        $("#scoreBoardTime").text("60:00");
        xMin = 60;
        $("#minBegin").text(xMin); // Populates the # of minutes at game start on Winner Stat Board

    } else if (($("div.pickDescribe").text()) === "MODERATE") {

        $("#scoreBoardLevel").text("Mod");
        $("#scoreBoardMoves, #moveCommence").text("50");
        originalMoves = moves = 50;
        $("#scoreBoardTime").text("30:00");
        xMin = 30;
        $("#minBegin").text(xMin); // Populates the # of minutes at game start on Winner Stat Board
        $("#playerLevel").text("Moderate"); // Populates the non-abbreviated skill level played on Winner Stat Board

    } else if (($("div.pickDescribe").text()) === "DIFFICULT") {

        $("#scoreBoardLevel").text("Diff");
        $("#scoreBoardMoves, #moveCommence").text("25");
        originalMoves = moves = 25;
        $("#scoreBoardTime").text("10:00");
        xMin = 10;
        $("#minBegin").text(xMin); // Populates the # of minutes at game start on Winner Stat Board
        $("#playerLevel").text("Difficult"); // Populates the non-abbreviated skill level played on Winner Stat Board

    } else if (($("div.pickDescribe").text()) === "IMPOSSIBLE") {

        $("#scoreBoardLevel").text("Imp");
        $("#scoreBoardMoves, #moveCommence").text("10");
        originalMoves = moves = 10;
        $("#scoreBoardTime").text("05:00");
        xMin = 5;
        $("#minBegin").text(xMin); // Populates the # of minutes at game start on Winner Stat Board
        $("#playerLevel").text("Impossible"); // Populates the non-abbreviated skill level played on Winner Stat Board
    };
});
// End - Populate the scoreboard (level, moves, time) and Winner Stat board based on skill picked.

// POPULATE SCORE BOARD and WINNER GAME STAT BOARD BEFORE GAME START - END



// POPULATE WINNER GAME STATISTICS BOARD - START

// Populates the time spent, moves, and stars on the Winner Stat Board.
function statBoardPopulate(xMin,ySec,moves) {
  $("#moveOver").text(moves);

  // Next 3 lines - obtain current number of stars, convert to integer, then add to Winner Stat Board.
  var starTxt = $("#scoreBoardStars").text();
  var intStar = parseInt(starTxt,10);
  $("#endingStars").text(intStar);

  if ((ySec >= 0) && (xMin === 0)) {
      $("#overTime").text(ySec + " sec");
  } else if ((ySec === 0) && (xMin >= 1)) {
      $("#overTime").text(xMin + " min");
  } else if ((ySec > 0) && (xMin > 0)) {
      var fractionSec = (ySec / 60);
      var theNewTime = xMin + fractionSec;
      $("#overTime").text(theNewTime.toFixed(2) + " min");
  };
};
// POPULATE WINNER GAME STATISTICS BOARD - END



//  START or PAUSE GAME SECTION - Start

// This is polyfill for the padStart() method that is used to add an extra zero to the 00:00 timer.
//  Note to self:  A polyfill is a piece of code (usually JavaScript on the Web) used to provide modern functionality on older browsers that do not natively support it.  (https://developer.mozilla.org/en-US/docs/Glossary/Polyfill)

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
        padString = String(typeof padString !== 'undefined' ? padString : ' ');
        if (this.length >= targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}



// Reference (setInterval): https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
function getTimer(){

  // Next 2 lines - obtain current number of correct card pairs, then convert to integer.
  var movingTxt = $("#scoreBoardMatch").text();
  var intMoving = parseInt(movingTxt,10);

    startTimer = setInterval(function(){

      if ((ySec === 0) && (xMin > 0)) {
        --xMin;
        ySec = 59;
        timerString(xMin,ySec);

      } else if ((ySec === 0) && (xMin === 0) && (countCorrect < 8)) {
          // This Boolean helps to remove the "clickability" of any unmatched cards
          // faster between when time runs out and when "Game Over" appears.
          $("i#play-pause-tab.fas.playStart.fa-pause").hide();
          pauseButton();
          gameOverLoss(countCorrect);

        } else if (ySec !== 0) {
            --ySec;
            timerString(xMin,ySec);

          } else if (intMoving === 8) {  // Game won
              pauseButton();
        };



      // BEGINNING - User loses the game if they don't click anything at all.
      var checkForClicks = $("#scoreBoardMoves").text();  // Gets number of moves (string)
      var clickLocate = parseInt(checkForClicks,10);  // Convert that string to a number

        if (((ySec === 0) && (xMin === 0)) && (originalMoves === clickLocate) && (countCorrect < 8)) {

          // Rather than calling the function gameOverLoss, I am inserting the code
          // from that function here.  Because there is no user click involved,
          // the function is never called otherwise.

          $("i#play-pause-tab.fas.playStart.fa-pause").hide();
          $("#scoreBoardTime").text("GAME OVER").css("font-weight","bold");
          $("div.scoreTimer.scoreBorderTimer").css("background-color","rgb(165,131,241)");
          $("div.card").not($("div.card.match.showOnlyCorrect")).addClass("open");

          var cardLost = 8 - countCorrect;
          $("#pairsUnfound").text(cardLost);

          if (cardLost === 1) {
            $("#wereTense").text("was ");
            $("#pairTense").text("pair left");
          } else if (cardLost > 1) {
            $("#wereTense").text("were ");
            $("#pairTense").text("pairs left");
          };

          $("#lossOverlay").delay(8000).queue(function(){
              $(this).css("display", "block").dequeue();
            });

          };
      // END - User loses the game if they don't click anything at all.



      // This function sets the minutes and seconds to two spaces (00:00).
      function timerString(xMin,ySec) {
            var minString = xMin.toString();
            var minTwoSpaces = minString.padStart(2, "0");

            var secString = ySec.toString();
            var secTwoSpaces = secString.padStart(2, "0");

            $("#scoreBoardTime").text(minTwoSpaces + ":" + secTwoSpaces);
      };

    }, 1000);

};



function pauseButton(){
  clearInterval(startTimer);

  // Here, event.preventDefault ensures that user cannot continue game while it is paused.
  $("div.card.match.showOnlyCorrect").off("click").click(function( event ) {
    event.preventDefault();
  });


  $( "div.card" ).not($("div.card.match.showOnlyCorrect")).off("click").click(function( event ) {
    event.preventDefault();
  });

};


// This function consolidates Play and Pause into one button.
$("#play-pause-tab").click(function(){

    // Play
    if ($(this).hasClass("fa-play")) {

        $(this).effect( "pulsate", {times:1}, 500 );
        $(this).switchClass("fa-play","fa-pause", 1250);
        $(this).attr("title","Pause");

        getTimer(xMin,ySec);  // Timer resumes.
        startGame();  // Game resumes.

    // Pause
    } else if ($(this).hasClass("fa-pause")) {

          $(this).effect( "pulsate", {times:1}, 500 );
          $(this).switchClass("fa-pause","fa-play", 1250);
          $(this).attr("title","Play");

          pauseButton();

    };
});

//  START or PAUSE GAME SECTION - End



// WIN THE GAME - START

function winning() {
  pauseButton();  // Pause timer and make all cards "unclickable".
  $("i#play-pause-tab.fas.playStart.fa-pause").hide();  // Hide pause button
  $("#scoreBoardTime").text("WINNER").css("font-weight","bold");
  $("div.scoreTimer.scoreBorderTimer").css("background-color","rgb(35, 231, 207)");

  // Opens "Congratulations" overlay
  $("#winOverlay").delay(8000).queue(function(){
      $(this).css("display", "block").dequeue();
    });
};

// WIN THE GAME - END


// LOSE THE GAME - START

function gameOverLoss(countCorrect) {
  pauseButton();  // Pause timer and make all cards "unclickable".
  $("i#play-pause-tab.fas.playStart.fa-pause").hide();  // Hide pause button
  $("#scoreBoardTime").text("GAME OVER").css("font-weight","bold");
  $("div.scoreTimer.scoreBorderTimer").css("background-color","rgb(165,131,241)");
  // Line below - opens all cards except "already correct" pairs.
  $("div.card").not($("div.card.match.showOnlyCorrect")).addClass("open");

  // Populates this phrase on "Game Over" overlay: 'There were "cardLost" pairs left'
  var cardLost = 8 - countCorrect;
  $("#pairsUnfound").text(cardLost);

  if (cardLost === 1) {
    $("#wereTense").text("was ");
    $("#pairTense").text("pair left");
  } else if (cardLost > 1) {
    $("#wereTense").text("were ");
    $("#pairTense").text("pairs left");
  };

  // Opens "Game Over" overlay
  $("#lossOverlay").delay(8000).queue(function(){
      $(this).css("display", "block").dequeue();
    });
};

// LOSE THE GAME - END




// GAME OVER: IS IT WON OR LOST? - START
function endGameWinOrLose(ySec,xMin,moves,countCorrect) {

  if (((ySec >= 0) && (xMin === 0)) && (moves >= 0) && (countCorrect === 8)) {
    // Game won - There is less than 1 minute or no time remaining and some or no moves remaining.
    winning();
    statBoardPopulate(xMin,ySec,moves);

  } else if (((ySec >= 0) && (xMin > 0)) && (moves >= 0) && (countCorrect === 8)) {
      // Game won - At least 1 minute remaining with some or no moves remaining.
      winning();
      statBoardPopulate(xMin,ySec,moves);

    } else if (((ySec >= 0) && (xMin > 0)) && (moves === 0) && (countCorrect < 8)) {
        // Game lost - At least 1 minute remaining with no moves remaining.
        gameOverLoss(countCorrect);

      } else if (((ySec >= 0) && (xMin === 0)) && (moves === 0) && (countCorrect < 8)) {
          // Game lost - There is less than 1 minute and no moves remaining.
          gameOverLoss(countCorrect);

        } else if (((ySec === 0) && (xMin === 0)) && (moves > 0) && (countCorrect < 8)) {
            // Game lost - There is no time remaining and at least 1 move remaining.
            gameOverLoss(countCorrect);

          } else if (((ySec === 0) && (xMin === 0)) && (moves === 0) && (countCorrect < 8)) {
              // Game lost - There is no time remaining and no moves remaining.
              gameOverLoss(countCorrect);
          };
};
// GAME OVER: IS IT WON OR LOST? - END




// STOP OR CONTINUE GAME - START
function continueOrStop(ySec,xMin,moves,countCorrect) {

  // I'm using event.preventDefault here to continue "unclickability" of cards
  // while this function is called.  Without it, user can continue to click.
  $("div.card.match.showOnlyCorrect").off("click").click(function( event ) {
    event.preventDefault();
  });

  $( "div.card" ).off("click").click(function( event ) {
    event.preventDefault();
  });



  if ( ((ySec >= 0) && (xMin > 0)) && (moves > 0) && ((countCorrect >= 0) && (countCorrect < 8)) ) {
      // Game resumes if all cards aren't found, at least 1 minute remains, and at least 1 move remains.
      startGame();

    } else if ( ((ySec > 0) && (xMin === 0)) && (moves > 0) && ((countCorrect >= 0) && (countCorrect < 8)) ) {
        // Game resumes if all cards aren't found, at least 1 minute remains, and <1 minute remains.
        startGame();

      } else {
        // Verify that game is won or lost when all cards are found.
        endGameWinOrLose(ySec,xMin,moves,countCorrect);
    };
};
// STOP OR CONTINUE GAME - END




//  PLAYING THE GAME - Start


// Variables that are essential to the startGame function.
var holdTwoCards = [];  // Array that holds index and icon of both cards in play.
var whichPosition;  // Index of card in play.
var whichIcon;  // Icon of card in play.
var firstIndexClicked;  // Index of 1st card clicked.
var secondIndexClicked; // Index of 2nd card clicked.
var countCorrect = 0;
var checkMovesForStars = 0;  // Counter (of moves) for the inTheStars function.



// At game start, all cards are "unclickable" until
// the user hits the start button.
$(function() {

  //  Shuffles the card deck.
  var newDeck = [];
  function newGame() {
       $("div.card").remove();
       var newStack = shuffle(stack);
       //http://api.jquery.com/jquery.each/
       $.each(newStack, function(index,value){
          $("div.deckContainer").append(value);
          newDeck.push(value);
       });
  };

  $("div.card").off("click");
  newGame();
});


// Populates the # of stars remaining on scoreboard.
// The # of stars declines by 1 for every 20% of moves available at game start.
function inTheStars(originalMoves, starsBeginGame) {

  ++checkMovesForStars; // Increases by 1 with each move.

  // Each game starts with 5 stars.
  // 5 = 20% of a whole set.
  // Moves available at game start = originalMoves.
  var howManyStars = (2/10)*originalMoves;

  // When # of moves used (checkMovesForStars) equals
  // 20% of the # of total moves available (howManyStars),
  // then the # of stars remaining (starsBeginGame) is reduced by 1.
  if (checkMovesForStars === howManyStars) {

    --starsBeginGame;
    populateStars(starsBeginGame);
    checkMovesForStars = 0;

  } else {
    // This is intentionally left blank.
  };
};


function startGame() {

  if (holdTwoCards.length === 2) {
    keepGoing(holdTwoCards);

  } else if ((holdTwoCards.length === 0) || (holdTwoCards.length === 4)) {
    // If the game is paused then restarted, the 1st condition above (holdTwoCards.length = 0)
    // is necessary to reinstate the "clickability" of all cards not in play.
    // Otherwise, any card(s) not in play would remain "unclickable".
    holdTwoCards = [];
    keepGoing(holdTwoCards);
  };

  // Any card pairs matched correctly on prior moves remain "unclickable".
  $("div.card.match.showOnlyCorrect").off("click").click(function( event ) {
    event.preventDefault();
  });
};

    // 1st line of code in keepGoing function:
    // Resource: https://teamtreehouse.com/community/jquery-click-event-bind-multiple-times
    // Resource: https://stackoverflow.com/questions/18009295/click-event-repeating-jquery-1-9
    // Source: https://www.gajotres.net/prevent-jquery-multiple-event-triggering/

  function keepGoing(holdTwoCards) {
    $( "div.card" ).not($("div.card.open")).not($("div.card.match.showOnlyCorrect")).off("click").one( "click", function(event) {

        $(this).addClass("open"); // Reveal the hidden icon on back of card.
        whichPosition = $(this).index();  // Index of card clicked
        holdTwoCards.push(whichPosition);
        whichIcon = $("i", this).attr("class"); // Icon of card clicked
        holdTwoCards.push(whichIcon);
        $(this).eq(whichPosition).off("click", catchTheClick(holdTwoCards));  // The card in play becomes "unclickable".
      });
    };



function catchTheClick(holdTwoCards) {

  if (holdTwoCards.length === 4) {
    comparison(holdTwoCards);
  };
};


function comparison(holdTwoCards) {

  // BEGINNING - Identify which cards should become "unclickable" during the comparison function.
  // Note: The 2 cards in play were made "unclickable" in the keepGoing function.
  // Cards made "unclickable" in the comparison function:  all unclicked cards not in play, and previously correct pairs.

  firstIndexClicked = holdTwoCards[0];
  secondIndexClicked = holdTwoCards[2];

  var one = $("div.card").eq(firstIndexClicked);
  var two = $("div.card").eq(secondIndexClicked);

  // All unclicked cards not in play:
  $("div.card").not(one).not(two).off("click").click(function( event ) {
    event.preventDefault();
  });

  // Previously correct pairs:
  $("div.card.match.showOnlyCorrect").off("click").click(function( event ) {
    event.preventDefault();
  });
  // END - Identify which cards should become "unclickable".


  // The next 3 lines of code provide the current # of stars as an integer
  // to the inTheStars function (which populates "star" on the scoreboard).
  var wordScore = $("#scoreBoardStars").text();
  var numScore = parseInt(wordScore,10);
  inTheStars(originalMoves, numScore);


  // These 3 lines of code populate the balloon (# moves remaining) on the scoreboard.
  --moves;
  var countMoves = moves.toString();
  $("#scoreBoardMoves").text(countMoves);


  // BEGINNING of if-then statement that compares the two cards picked.
  if (holdTwoCards[1] === holdTwoCards[3]) {

    ++countCorrect;
    var countString = countCorrect.toString();
    $("#scoreBoardMatch").text(countString);

    // Source (add 2+ classes): https://stackoverflow.com/questions/3576592/is-it-possible-to-use-multiple-variables-instead-of-selectors-in-jquery
    $(one).add(two).delay(3000).queue(function(){
      $(this).removeClass("open").addClass("match showOnlyCorrect").effect( "bounce" ).delay(2000).dequeue();
      $(this).queue(function(){
        continueOrStop(ySec,xMin,moves,countCorrect);
      });
    });

  } else if (holdTwoCards[1] !== holdTwoCards[3]) {

    // Resource (delay): https://stackoverflow.com/questions/2510115/jquery-can-i-call-delay-between-addclass-and-such
    // Resource (queue/dequeue): https://www.w3resource.com/jquery-exercises/2/jquery-fundamental-exercise-76.php
    $(one).add(two).delay(2000).queue(function(){
      $(this).removeClass("open").addClass("noMatch").effect( "shake" ).delay(7000).dequeue();
      $(this).queue(function(){
        $(this).removeClass("show noMatch").dequeue();
        continueOrStop(ySec,xMin,moves,countCorrect);
      });
    });
  };
  // END of if-then statement that compares the two cards picked.

};

//  PLAYING THE GAME - END
