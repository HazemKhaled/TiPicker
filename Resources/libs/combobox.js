function comboBox(prams) {

	if(prams.height == undefined) {
		prams.height = 252;
	}

	var slide_in = Titanium.UI.createAnimation({
		bottom : 0
	});
	var slide_out = Titanium.UI.createAnimation({
		bottom : -prams.height
	});

	var view = Titanium.UI.createView({
		height : prams.height,
		bottom : -prams.height,
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
		view.fireEvent('afterPickerHidden', {
			selectedRow : view.picker.getSelectedRow(0)
		});
	});
	var spacer = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var toolbar = Ti.UI.iOS.createToolbar({
		barColor : prams.barColor,
		backgroundImage : '/images/bar.png',
		top : 0,
		items : [cancelBtn, spacer, doneBtn]
	});

	view.picker = Titanium.UI.createPicker({
		top : 44,
		selectionIndicator : true
	});
	//view.picker = picker;

	view.btn = function(btn) {

		btn.addEventListener('click', function() {
			view.picker.fireEvent('showMe');
		});
		return btn;
	}

	view.add(toolbar);
	view.add(view.picker);

	return view;
}

module.exports = comboBox;
