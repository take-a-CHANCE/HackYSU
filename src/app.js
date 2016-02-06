/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */
var ajax = require('ajax');
var getData = function(){
  console.log("getting data");

  ajax({
      url: '192.168.137.136:8080/api/test.json', 
    type: 'json'
  },
  function(data) {
    console.log("gotdata: " + JSON.stringify(data));
    
  },
    function(error) {
      console.log("Got error: " + JSON.stringify(error));
    }
);
};
var UI = require('ui');
var Vector2 = require('vector2');

var main =new UI.Menu({
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
  var myHand = new UI.Window({
    
  });
  myHand.show();
});
main.on('longClick','select',function(e) {
  var help = new UI.Card({
    title: 'Help!',
    body: 'This is the help section of the app',
    scrollable: true
  });
  help.show();
});
getData();
main.show();



