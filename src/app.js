/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */
var ajax = require('ajax');

//Local variables
var myLeftHand = 1;
var myRightHand = 1;
//opponent
var oppLeftHand = 1;
var oppRightHand = 1;

var isLeft = false; //attacking with left or right
var oppLeft = false; //attacking left or right 

var returned = 0;
var gameState = '11110'; //me left, me right, opponent left, opponent right, opponent moved (bool)


//AJAX Server Routes
var getData = function(){

  ajax({
      url: 'https://api.particle.io/v1/devices/1e0041000447343337373738/state?access_token=2611cd6341fadba0f63a3b190bd8c8540543592a', 
      type: 'json'
  },
  function(data) { 
    console.log("got get: " + JSON.stringify(data));
    returned = data;
  },
    function(error, status, request) {
        console.log(this,typeof this);
        console.log("status: "+ status);
        console.log("Request: " + request);
      console.log("Got error: " + error);
    });
};

var postData = function(){
  console.log("getting data");

  ajax({
      url: 'https://api.particle.io/v1/devices/1e0041000447343337373738/setState?access_token=2611cd6341fadba0f63a3b190bd8c8540543592a', 
      type: 'json',
      method: 'POST',
      data: {
          arg: gameState,
          format: 'raw'
      }
  },
  function(data) {
    console.log("got post: " + JSON.stringify(data));
    
  },
    function(error, status, request) {
        console.log(this,typeof this);
        console.log("status: "+ status);
        console.log("Request: " + request);
      console.log("Got error: " + JSON.stringify(error));
    });
};

var update = function() {
    
};


postData();
getData();

var UI = require('ui');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');


var main =new UI.Menu({
  highlightBackgroundColor: 'blue',
  sections: [{
      items: [{
        title: 'First User',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second User',
        subtitle: 'Subtitle Text'
      }]
    }]
});




main.on('select', function(e) {
  var myHand = new UI.Window({
    backgroundColor: 'white',
    action: {
      up: 'IMAGES_LEFT',
      select: 'IMAGES_MIDDLE',
      down: 'IMAGES_RIGHT'
    }
  });
  var oppUser = new UI.Text({
    text: e.item.title,
    position: new Vector2(0, 10),
    size: new Vector2(110, 20),
    color: 'black',
    textAlign: 'center',
    font: 'gothic-18-bold'
  });
  var oppScore = new UI.Text({
    text: oppLeftHand+'/'+oppRightHand,
    position: new Vector2(0, 40),
    size: new Vector2(110, 20),
    color: 'black',
    backgroundColor: 'white',
    textAlign: 'center',
    font: 'gothic-18-bold'
  });
  var myUser = new UI.Text({
    text: 'GSCK',
    position: new Vector2(0, 80),
    size: new Vector2(110, 20),
    color: 'black',
    textAlign: 'center',
    font: 'gothic-18-bold'
  });
  var myScore = new UI.Text({
    text: myLeftHand+'/'+myRightHand,
    position: new Vector2(0, 110),
    size: new Vector2(110, 20),
    color: 'black',
    backgroundColor: 'white',
    textAlign: 'center',
    font: 'gothic-18-bold'
  });
  var highlightMyLeft = new UI.Text({
      text: myLeftHand,
      position: new Vector2(43, 110),
      size: new Vector2(8, 20),
      backgroundColor: 'black',
      color: 'white',
      textAlign: 'right',
      font: 'gothic-18-bold'
    });
  var highlightMyRight = new UI.Text({
      text: myRightHand,
      position: new Vector2(59, 110),
      size: new Vector2(8, 20),
      backgroundColor: 'black',
      color: 'white',
      textAlign: 'right',
      font: 'gothic-18-bold'
    });
  myHand.add(oppUser);
  myHand.add(oppScore);
  myHand.add(myUser);
  myHand.add(myScore);
  myHand.show();
  
  //Reload page
  myHand.on('show',function(){
    myHand.add(oppUser);
    myHand.add(oppScore);
    myHand.add(myUser);
    myHand.add(myScore);
    if(isLeft){
      myHand.add(highlightMyLeft);
    } else {
      myHand.add(highlightMyRight);
    }
    myHand.show();
  });
  
  //Select Left
  myHand.on('click','up', function(e){
    myHand.add(myScore);
    myHand.add(highlightMyLeft);
    isLeft = true;
    myHand.show();
  });
  
  //Select Right
  myHand.on('click','down', function(e){
    myHand.add(myScore);
    myHand.add(highlightMyRight);
    isLeft = false;
    myHand.show();
  });
  
  //Confirm
  myHand.on('click','select', function(e){
    var theirHand = new UI.Window({
      backgroundColor: 'white',
      action: {
        up: 'IMAGES_LEFT',
        select: 'IMAGES_MIDDLE',
        down: 'IMAGES_RIGHT'
      }
    });
    
    var highlightTheirLeft = new UI.Text({
      text: oppLeftHand,
      position: new Vector2(43, 40),
      size: new Vector2(8, 20),
      backgroundColor: 'black',
      color: 'white',
      textAlign: 'right',
      font: 'gothic-18-bold'
    });
    var highlightTheirRight = new UI.Text({
      text: oppRightHand,
      position: new Vector2(59, 40),
      size: new Vector2(8, 20),
      backgroundColor: 'black',
      color: 'white',
      textAlign: 'right',
      font: 'gothic-18-bold'
    });
    
    //Select Left
    theirHand.on('click','up', function(e){
      theirHand.add(oppScore);
      theirHand.add(highlightTheirLeft);
      oppLeft = true;
      theirHand.show();
    });
    
    //Select Right
    theirHand.on('click','down', function(e){
      theirHand.add(oppScore);
      theirHand.add(highlightTheirRight);
      oppLeft = false;
      theirHand.show();
    });
    
    var check = function(user_score) {
      if (user_score === 5) {
        user_score = 0;
      }
      else if (user_score > 5) {
        user_score = user_score - 5;
      }
    };
    
    //Confirm
    theirHand.on('click','select', function(e){
      //Stuff for sending state
      if (oppLeft) {
        if (isLeft) {
          oppLeftHand = oppLeftHand + myLeftHand;
        }
        else {
          oppLeftHand = oppLeftHand + myRightHand;
        }
        check(oppLeftHand);
      }
      else {
        if (isLeft) {
          oppRightHand = oppRightHand + myLeftHand;
        }
        else {
          oppRightHand = oppRightHand + myRightHand;
        }
        check(oppRightHand);
      }
      
    });
    
    theirHand.add(oppUser);
    theirHand.add(oppScore);
    theirHand.add(highlightTheirLeft);
    theirHand.add(myUser);
    theirHand.add(myScore);
    if(isLeft){
      theirHand.add(highlightMyLeft);
    } else {
      theirHand.add(highlightMyRight);
    }
    theirHand.show();
    
    
  });
  
  //Bash fingers together
  myHand.on('longClick','select', function(){
    console.log("Middle Pressed");
    Vibe.vibrate('short');
    var splitWind = new UI.Window({
      backgroundColor: 'white',
      action: {
        up: 'IMAGES_PLUS',
        select: 'IMAGES_MIDDLE',
        down: 'IMAGES_MINUS'
      }
    });
    
    /*//Local variables
var myLeftHand = 1;
var myRightHand = 1;
//opponent
var oppLeftHand = 1;
var oppRightHand = 1;

var isLeft = false; //attacking with left or right
var oppLeft = false; //attacking left or right */
    
    splitWind.add(myScore);
    splitWind.add(highlightMyLeft);
    splitWind.add(oppUser);
    splitWind.add(oppScore);
    splitWind.add(myUser);
    splitWind.show();
    splitWind.on('click','up',function(){
      //Increment Left, Decrement Right
      if ((myRightHand - 1) === 0) { // if subtracting 1 would give you 0, then we vibrate to let the user know that's not okay
        Vibe.vibrate('short');
      }
      else { // otherwise increment left and decrement right
        myLeftHand = myLeftHand + 1;
        myRightHand = myRightHand - 1;
      }
    });
    splitWind.on('click','down',function(){
      //Increment right, Decrement left
      if ((myLeftHand - 1) === 0) {
        Vibe.vibrate('short');
      }
      else {
        myRightHand = myRightHand + 1;
        myLeftHand = myLeftHand - 1;
      }
    });
    splitWind.on('click','select',function(){
      //confirm and send data
    });
  });
  
});


main.on('longSelect',function() {
  Vibe.vibrate('short');
  var help = new UI.Card({
    title: 'Help!',
    body: 'This is the help section of the app this is going to be fleshed out later hopefully. In the meantime, DOGS',
    scrollable: true
  });
  help.show();
});

main.show();

var update = function() {
    getData();
    
};



















