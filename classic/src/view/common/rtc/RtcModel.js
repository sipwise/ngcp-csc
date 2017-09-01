Ext.define('NgcpCsc.view.rtc.RtcModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.rtc',
    data: {
        phoneKeyboardHidden: true,
        numberToCall: '',
        rtcEngineLocalMediaStream: null,
        rtcEngineRemoteMediaStream: null,
        rtcEngineCall: null,
        rtcEngineNetwork: null,
        rtcEngineClient: null,
        rtcEngineSession: null
    }
});
