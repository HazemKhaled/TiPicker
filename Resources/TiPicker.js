/**
 *
 */

module.exports = function(prams) {

    if (prams == undefined) {
        prams = {};
    }

    var selectedRow = prams.hasOwnProperty('selectedRow') ? prams.selectedRow : 0;

    var iOSBtnProperties = ['left', 'right', 'top', 'bottom', 'width', 'height'];
    var iOSBtnPrams = {
        value : prams.hasOwnProperty('iOSButtonTitle') ? prams.iOSButtonTitle : '',
        height : 40,
        width : '90%',
        enabled : false,
        borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
    };

    // merge prams
    for (var i in prams) {
        if (iOSBtnProperties.indexOf(i) > -1) {
            iOSBtnPrams[i] = prams[i];

            // remove positions if not android
            if (Ti.Platform.getOsname() !== 'android') {
                delete prams[i];
            }
        }
    }

    // toolbar offfset
    if (Ti.Platform.getOsname() === 'iphone') {
        prams.top = 44;
    }

    var picker = Ti.UI.createPicker(prams);
    picker.addEventListener('change', afterSelect);

    // set selected on android nley
    picker.setSelectedRow(0, selectedRow);

    var iOSPickerContainer = null;
    var iOSButton = null

    if (Ti.Platform.getOsname() === 'iphone') {

        // iphone bottom view
        iOSPickerContainer = Ti.UI.createView({
            height : 252,
            bottom : -252,
            zIndex : 99,
            backgroundColor : 'red'
        });

        var slideUpAnimation = Ti.UI.createAnimation({
            bottom : 0
        });
        var slideDownAnimation = Ti.UI.createAnimation({
            bottom : -252
        });

        // show and hide piker
        iOSPickerContainer.addEventListener('slideUp', function() {
            iOSPickerContainer.animate(slideUpAnimation);

            picker.setSelectedRow(0, selectedRow, true);
        });
        iOSPickerContainer.addEventListener('slideDown', function() {
            iOSPickerContainer.animate(slideDownAnimation);
        });

        // toolbar
        var cancelBtn = Ti.UI.createButton({
            title : L('Cancel'),
            style : Ti.UI.iPhone.SystemButtonStyle.BORDERED
        });
        cancelBtn.addEventListener('click', function() {
            iOSPickerContainer.fireEvent('slideDown');
        });

        var doneBtn = Ti.UI.createButton({
            title : L('Done'),
            style : Ti.UI.iPhone.SystemButtonStyle.DONE
        });
        doneBtn.addEventListener('click', afterSelect);
        doneBtn.addEventListener('click', function() {
            iOSPickerContainer.fireEvent('slideDown');
        });

        var toolbar = Ti.UI.iOS.createToolbar({
            top : 0,
            items : [cancelBtn, Ti.UI.createButton({
                systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
            }), doneBtn]
        });

        iOSPickerContainer.add(toolbar);

    } else if (Ti.Platform.getOsname() === 'ipad') {

        // ipad popover
        iOSPickerContainer = Ti.UI.iPad.createPopover({
            width : 200,
            height : 200,
            title : prams.hasOwnProperty('title') ? prams.title : '',
            arrowDirection : Ti.UI.iPad.POPOVER_ARROW_DIRECTION_ANY
        });
    }

    // iOS
    if (Ti.Platform.getOsname() !== 'android') {

        // add picker to popover or slider view
        iOSPickerContainer.add(picker);

        var transform = Ti.UI.create2DMatrix();

        iOSButton = Ti.UI.createTextField(iOSBtnPrams);

        if (prams.hasOwnProperty('rtl')) {
            iOSButton.leftButton = Ti.UI.createButton({
                style : Ti.UI.iPhone.SystemButton.DISCLOSURE,
                transform : transform.rotate(90)
            });

            iOSButton.setTextAlign(Ti.UI.TEXT_ALIGNMENT_RIGHT)
        } else {
            iOSButton.rightButton = Ti.UI.createButton({
                style : Ti.UI.iPhone.SystemButton.DISCLOSURE,
                transform : transform.rotate(90)
            });
        }

        iOSButton.addEventListener('click', function() {

            if (Ti.Platform.getOsname() === 'ipad') {

                iOSPickerContainer.show({
                    view : iOSButton,
                    animated : true
                });
                picker.setSelectedRow(0, selectedRow, true);
            } else {
                iOSPickerContainer.fireEvent('slideUp');
            }
        });
    }

    this.getUI = function() {

        if (Ti.Platform.getOsname() === 'android') {
            return picker;
        } else if (Ti.Platform.getOsname() === 'iphone') {
            return [iOSButton, iOSPickerContainer];
        } else if (Ti.Platform.getOsname() === 'ipad') {
            return iOSButton;
        }
    };

    this.getPicker = function() {

        return picker;
    };

    this.getiOSPickerContainer = function() {

        return iOSPickerContainer;
    };

    this.getiOSButton = function() {

        return iOSButton;
    };

    function afterSelect(e) {

        if (Ti.Platform.getOsname() === 'iphone') {
            //iOSPickerContainer.fireEvent('slideDown');
        }

        if (iOSButton) {

            // iPad only
            selectedRow = e.rowIndex;

            //iOSButton.setValue(e.row.changedName);
            iOSButton.setValue(picker.getSelectedRow(0).changedName);
        }

    }

    return this;
}