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

var attacking = false; //if atack false, splitting

var myToken = 'TODO';
var oppToken = 'TODO';


//AJAX Server Routes
var getData = function(){
  console.log("getting data");

  ajax({
      url: 'ec2-52-34-188-16.us-west-2.compute.amazonaws.com/api/player', 
    type: 'json'
  },
  function(data) {
    console.log("gotdata: " + JSON.stringify(data));
    
  },
    function(error) {
      console.log("Got error: " + JSON.stringify(error));
    });
};

var postData = function(){
  console.log("getting data");

  ajax({
      url: 'ec2-52-34-188-16.us-west-2.compute.amazonaws.com/api/player', 
      type: 'json',
      method: 'POST',
      data: {
          me: {
              token: myToken,
              left: myLeftHand,
              right: myRightHand
          },
          opponent: {
              token: oppToken,
              left: oppLeftHand,
              right: oppRightHand
          }
      }
  },
  function(data) {
    console.log("gotdata: " + JSON.stringify(data));
    
  },
    function(error) {
      console.log("Got error: " + JSON.stringify(error));
    });
};

postData();

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
  var rect = new UI.Rect({size: new Vector2(144, 168) });
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
    textAlign: 'center',
    font: 'gothic-18-bold'
  });
  var curUser = new UI.Text({
    text: 'GSCK',
    position: new Vector2(0, 80),
    size: new Vector2(110, 20),
    color: 'black',
    textAlign: 'center',
    font: 'gothic-18-bold'
  });
  var curScore = new UI.Text({
    text: myLeftHand+'/'+myRightHand,
    position: new Vector2(0, 110),
    size: new Vector2(110, 20),
    color: 'black',
    textAlign: 'center',
    font: 'gothic-18-bold'
  });

  //myHand.add(rect);
  myHand.add(oppUser);
  myHand.add(oppScore);
  myHand.add(curUser);
  myHand.add(curScore);
  myHand.show();
  
  //Select Left
  myHand.on('click','up',function(){
    
  });
  
  //Select Right
  myHand.on('click','down',function(){
    
  });
  
  //Bash fingers together
  myHand.on('click','select',function(){
    var splitWin = UI.Window({
      backgroundColor: 'white',
      action: {
        up: 'IMAGES_PLUS',
        select: 'IMAGES_MIDDLE',
        down: 'IMAGES_MINUS'
      }
    });
    splitWin.add(rect);
    splitWin.add(oppUser);
    splitWin.add(curUser);
    var highlightFingy = UI.Text({
      text: myLeftHand,
      position: new Vector2(0, 110),
      size: new Vector2(45, 20),
      backgroundColor: 'black',
      color: 'white',
      textAlign: 'center',
      font: 'gothic-18-bold'
    });
    splitWin.add(highlightFingy);
    splitWin.show();
  });
});
main.on('longSelect',function(e) {
  Vibe.vibrate('short');
  var help = new UI.Card({
    title: 'Help!',
    body: 'This is the help section of the app this is going to be fleshed out later hopefully. In the meantime, DOGS',
    scrollable: true
  });
  help.show();
});
getData();
main.show();



