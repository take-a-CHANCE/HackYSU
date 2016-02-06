//user
var myLeftHand = 3;
var myRightHand = 4;
//opponent
var oppLeftHand = 2;
var oppRightHand = 4;

var isLeft = false; //attacking with left or right
var oppLeft = false; //attacking left or right 

var attacking = false; //if atack false, splitting

//event: app installed
    //open config

//figure out how matchmaking could work? Jarvis?

//event: opponent moves (new game state{myLeft,myRight,oppLeft,oppRight})
    //send notification for new turn
    //update local variables to make UI
    //modify UI for new turn

//event: our turn
    //Display new game-state
    //wait for button press

//while turn stage 1 (selecting which hand to attack with or to split)
    //event: bottom button
        //update isLeft and UI highlighting
    //event: top button
        //update isLeft and UI highlighting
    //event: shake
//check if splitting is allowed (TODO: handle this exception)
        //switch to split card and update attacking to false (if valid move)
    //event: select button
        //commense stage 2
        //if splitting (attacking is false) open splitting card
    //event: back button
        //exit current game


//while turn stage 2 (if attack)
    //event: bottom button
        //update oppLeft and UI highlighting
    //event: top button
        //update oppLeft and UI highlighting
    //event: shake:
        //nothing
    //event: select button
        //update game state
    //event: back button
        //return to stage 1


//while splitting (else)
    //event: bottom button
        //add one to left, remove one from right
    //event: top button
        //add one to right, remove one from left
    //event: shake
        //nothing
    //event: select button
        //update game state
    //event: back button: 
        //return to stage 1

//event: send new game state
    //ajax to server with api, wait for magic















