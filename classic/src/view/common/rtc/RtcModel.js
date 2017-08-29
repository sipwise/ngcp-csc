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
        callPanelEnabled: false,
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
        rtcEngineRemoteMediaStream: null,
        rtcEngineCall: null,
        rtcEngineNetwork: null,
        rtcEngineClient: null,
        rtcEngineSession: null,
        callPanel: true,
        callActionLabel: '',
        callPending: false,
        callRinging: false,
        outgoingCallPending: false,
        incomingCallPending: false,
        incomingType: '',
        incomingCaller: '',
        callAborted: false,
        abortReason: ''
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
            return get('callPanelEnabled') ? '' : 'fa-rotate-180';
        },
        callEnabled: {
            bind: {
                callPending: '{callPending}',
                callRinging: '{callRinging}',
                incomingCallPending: '{incomingCallPending}'
            },
            get: function (data) {
                return data.callPending || data.callRinging || data.incomingCallPending;
            }
        },
        outgoingCall: {
            bind: {
                callPending: '{callPending}',
                callRinging: '{callRinging}'
            },
            get: function (data) {
                return data.callPending || data.callRinging;
            }
        },
        callLocalPreview: {
            get: function (data) {
                return data.rtcEngineLocalMediaStream && data.rtcEngineLocalMediaStream.hasVideo();
            }
        }
    }
});
