exports.height = 251;

exports.createCombobox = function(prams) {
	if(prams.barcolor) {
		toolbar.barColor = prams.barColor;
	}

	if(prams.height) {
		setHeight(prams.height);
	}

	return view;
}

exports.button = function(btn) {

	btn.addEventListener('click', function() {
		alert('Opend');
	});
	return btn;
}
var setHeight = function(height) {
	exports.height = height;
	view.height = height;
	view.bottom = -height;
	slide_out.bottom = -height;

}
var slide_in = Titanium.UI.createAnimation({
	bottom : 0
});
var slide_out = Titanium.UI.createAnimation({
	bottom : -exports.height
});

var view = Titanium.UI.createView({
	height : exports.height,
	bottom : -exports.height,
	zIndex : 99
});

// show and hide piker
view.addEventListener('showMe', function() {
	view.animate(slide_in);
});
view.addEventListener('hideMe', function() {
	view.animate(slide_out);
});
// toolbar
var cancelBtn = Titanium.UI.createButton({
	title : L('Cancel'),
	style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});
cancelBtn.addEventListener('click', function() {
	view.fireEvent('hideMe');
});
var doneBtn = Titanium.UI.createButton({
	title : L('Done'),
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE
});
doneBtn.addEventListener('click', function() {
	view.fireEvent('hideMe');
});
var spacer = Titanium.UI.createButton({
	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var toolbar = Ti.UI.iOS.createToolbar({
	backgroundImage : '/images/bar.png',
	top : 0,
	items : [cancelBtn, spacer, doneBtn]
});

var picker = Titanium.UI.createPicker({
	top : 44
});
view.add(toolbar);
view.add(picker);