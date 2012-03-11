var win = Titanium.UI.createWindow({
	backgroundColor : '#fff'
});

var combobox = require('libs/combobox').createCombobox({
	height : 252,
	barColor : '#F8001D',
	data : []
});
win.add(combobox);

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
