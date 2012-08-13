/**
 *
 */

//TODO: add UI direction support

module.exports = function(prams) {

    var picker = null;
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
            title : 'Picker',
            arrowDirection : Ti.UI.iPad.POPOVER_ARROW_DIRECTION_LEFT
        });

        //iOSPickerContainer.addEventListener('hide', afterSelect);
    }

    // iOS
    if (Ti.Platform.getOsname() !== 'android') {

        var transform = Ti.UI.create2DMatrix();

        iOSButton = Ti.UI.createTextField({
            value : 'Test',
            height : 40,
            width : 300,
            top : 60,
            enabled : false,
            borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            rightButton : Ti.UI.createButton({
                style : Ti.UI.iPhone.SystemButton.DISCLOSURE,
                transform : transform.rotate(90)
            }),
            rightButtonMode : Ti.UI.INPUT_BUTTONMODE_ALWAYS
        });

        iOSButton.addEventListener('click', function() {

            if (Ti.Platform.getOsname() === 'ipad') {

                iOSPickerContainer.show({
                    view : iOSButton,
                    animated : true
                });
            } else {
                iOSPickerContainer.fireEvent('slideUp');
            }
        });
    }

    var iOSBtnProperties = ['left', 'right', 'top', 'bottom', 'width', 'height', 'title'];
    var iOSBtnPrams = {};

    if (iOSPickerContainer) {
        for (var i in prams) {
            if (iOSBtnProperties.indexOf(i) > -1) {
                iOSButton[i] = prams[i];
                delete prams[i];
            }
        }

        // toolbar offfset
        if (Ti.Platform.getOsname() === 'iphone') {
            prams.top = 44;
        }
    }

    picker = Ti.UI.createPicker(prams);
    picker.addEventListener('change', afterSelect);

    // iOS only
    if (iOSPickerContainer) {

        iOSPickerContainer.add(picker);
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

    function afterSelect(e) {

        if (Ti.Platform.getOsname() === 'iphone') {
            //iOSPickerContainer.fireEvent('slideDown');
        }

        if (iOSButton) {
            //iOSButton.setValue(e.row.changedName);
            iOSButton.setValue(picker.getSelectedRow(0).changedName);
        }

    }

    return this;

}