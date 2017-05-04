Ext.define('NgcpCsc.view.rtc.RtcModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.rtc',

    data: {
        uid: '',
        title: 123456789,
        defaultThumbnail: 'resources/images/icons/phoneicon.png',
        thumbnail: 'resources/images/icons/phoneicon.png',
        status: 'calling...',
        callPanelHidden: true,
        phoneComposerHidden: true,
        faxComposerHidden: true,
        smsComposerHidden: true,
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
        minimized: true
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
            return get('numberToCall').length < 1;
        },
        setuserCls:function(get){
            return get('callEnabled') ? '' : 'fa-rotate-180';
        }
    }
});
