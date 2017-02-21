Ext.define('NgcpCsc.view.rtc.RtcModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.rtc',

    data: {
        title: 123456789,
        defaultThumbnail: 'resources/images/icons/phoneicon.png',
        thumbnail: 'resources/images/icons/phoneicon.png',
        status: 'calling...',
        callPanelHidden: false,
        phoneComposerHidden: false,
        faxComposerHidden: false,
        smsComposerHidden: false,
        phoneKeyboardHidden: true,
        callEnabled: false,
        connected: false,
        micEnabled: false,
        videoEnabled: false,
        numberToCall: '',
        // fax only fields
        faxPageHeader: '',
        faxContent: '',
        faxSelectedQuality: '',
        faxChosenFile: '',
        // sms only fields
        smsText: '',
        // panel status
        minimized: false
    },
    formulas: {
        disableSubmit: function(get) {
            var digitNumber = get('numberToCall');
            if (digitNumber.length < 1) {
                return true;
            } else {
                return !digitNumber.match(/^[0-9#*+]+$/);
            };
        },
        disableSmsSubmit: function(get) {
            return get('smsText').length > 140;
        }
    }
});
