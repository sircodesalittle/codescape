const items = require('./items.js')


setupStore = function() {
    var things = items.getItems()
    console.log(things);
    var list = $('#items')
    things.entries.forEach(function(item) {
        var div = '<div class="thumbnail">' +
        '<img width="20%" height="20%" src="' + item.image + '" alt="...">' +
        '<div class="caption">' +
          '<h3>' + item.name + '</h3>' + 
          '<p>' + item.description + '</p>' +
          '<p><a href="#" class="btn btn-primary" role="button" onClick="charge(' + item.id + ')">' + item.price + ' Pizza Rolls</a></p>' +
        '</div>' +
      '</div>'
        // list.append('<div>' + item.name + '</div>' + '<img width="10%" height="10%" src="' + item.image + '">')
        list.append(div);
    })
}

setupStore()