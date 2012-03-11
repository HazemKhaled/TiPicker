var win = Titanium.UI.createWindow({
	backgroundColor : '#fff'
});

var combobox = require('libs/combobox').createCombobox({
	height : 252,
	barColor : '#F8001D',
	data : []
});
win.add(combobox);

alert(combobox.picker);
var data = [];
data[0]=Ti.UI.createPickerRow({title:'Bananas'});
data[1]=Ti.UI.createPickerRow({title:'Strawberries'});
data[2]=Ti.UI.createPickerRow({title:'Mangos'});
data[3]=Ti.UI.createPickerRow({title:'Grapes'});
 
combobox.picker.add(data);
combobox.picker.selectionIndicator = true;

var countryBtn = Ti.UI.createButton({
	title : 'Select Country',
	width : '150dp',
	height : '40dp'
});

win.add(countryBtn);

countryBtn.addEventListener('click', function() {
	combobox.fireEvent('showMe');
});

win.open();
