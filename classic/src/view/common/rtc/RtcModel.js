Ext.define('NgcpCsc.view.rtc.RtcModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.rtc',

    // left inline by purpose as it's not coming from API
    data: {
        uid: '',
        title: '',
        defaultThumbnail: Ext.manifest.resources.path + '/images/icons/phoneicon.png',
        thumbnail: Ext.manifest.resources.path + '/images/icons/phoneicon.png',
        status: 'calling...',
        callPanelHidden: true,
        phoneComposerHidden: true,
        faxComposerHidden: true,
        smsComposerHidden: true,
        phoneKeyboardHidden: true,
        incomingCallHidden: true,
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
        minimized: true,
        rtcEngineLocalMediaStream: null,
        rtcEngineCall: null,
        rtcEngineNetwork: null,
        rtcEngineClient: null,
        rtcEngineSession: null,
        callPanel: true,
        outgoingCallPending: false,
        incomingCallPending: false,
        incomingType: '',
        incomingCaller: ''
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
