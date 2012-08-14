var win = Titanium.UI.createWindow({
    backgroundColor : '#fff'
});

// temp data

var dataSource = ['Bananas', 'Strawberries', 'Mangos', 'Grapes'];
var data = [];

for (var i in dataSource) {

    data.push(Ti.UI.createPickerRow({
        changedName : dataSource[i],
        title : dataSource[i],
    }));
}

var TiPicker = require('TiPicker');

var picker1 = new TiPicker();

picker1.getPicker().add(data);

win.add(picker1.getUI());

// another one :)
var picker2 = new TiPicker({
    width : '40%',
    right : 100,
    top : 200
});

// add data 2 times
picker2.getPicker().add(data);
picker2.getPicker().add(data);

win.add(picker2.getUI());

var picker3 = new TiPicker({
    width : '60%',
    height : 70,
    top : 100,
    left : 100,
    selectionIndicator : true
});

win.add(picker3.getUI());

picker3.getPicker().add(data);

picker3.getPicker().addEventListener('change', function(e) {
    Ti.API.debug(e);
});

win.open();
