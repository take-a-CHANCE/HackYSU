var UI = require('ui');
var Vector2 = require('vector2');

var main = UI.Menu({
  sections: [{
      items: [{
        title: 'First User',
        subtitle: 'Your Turn'
      }, {
        title: 'Second User',
        subtitle: 'Their Turn'
      }]
    }]
  });
  main.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  var myHand = UI.Window({
    action: {
      up: 'IMAGE_LEFT_ARROW',
      select: 'IMAGE_MIDDLE_SELECT',
      down: 'IMAGE_RIGHT_ARROW'
    }
    
    });
    myHand.show();
});

main.show();