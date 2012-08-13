var win = Titanium.UI.createWindow({
    backgroundColor : '#fff'
});

var combobox = require('libs/combobox');

combobox.init({
    width : '60%',
    height : 70,
    top : 100,
    //right : 100,
    left : 100,
    //bottom : 100,
    selectionIndicator : true
});

win.add(combobox.getUI());

var dataSource = ['Bananas', 'Strawberries', 'Mangos', 'Grapes'];
var data = [];

for (var i in dataSource) {

    data.push(Ti.UI.createPickerRow({
        changedName : dataSource[i],
        title : dataSource[i],
    }));
}

combobox.getPicker().add(data);

combobox.getPicker().addEventListener('change', function(e) {
    //write ur code here, and use e.row
});

// another one :)
var combobox1 = require('libs/combobox');

combobox1.init({
    width : '40%',
    right : 100,
    bottom : 100
});

win.add(combobox1.getUI());

combobox1.getPicker().add(data);
combobox1.getPicker().add(data);

win.open();
