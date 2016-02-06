/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */
var ajax = require('ajax');

//Local variables
var myLeftHand = 3;
var myRightHand = 4;
//opponent
var oppLeftHand = 2;
var oppRightHand = 4;

var isLeft = false; //attacking with left or right
var oppLeft = false; //attacking left or right 

var attacking = false; //if atack false, splitting

var myToken = 'TODO';
var oppToken = 'TODO';


//AJAX Server Routes
var getData = function(){
  console.log("getting data");

  ajax({
      url: '', 
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
      url: '', 
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


var UI = require('ui');
var Vector2 = require('vector2');

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
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  var myHand = new UI.Window();
  var rect = new UI.Rect({size: new Vector2(200, 300) });
  var text = new UI.Text({
    text: 'Item: ' +e.item.title
  });

  myHand.action({
      up: 'IMAGE_LEFT_ARROW',
      select: 'IMAGE_MIDDLE_SELECT',
      down: 'IMAGE_RIGHT_ARROW'
  });
  myHand.add(rect);
  myHand.add(text);
  myHand.show();
});
main.on('longSelect',function(e) {
  var help = new UI.Card({
    title: 'Help!',
    body: 'This is the help section of the app this is going to be fleshed out later hopefully. In the meantime, DOGS',
    scrollable: true
  });
  help.show();
});
getData();
main.show();



