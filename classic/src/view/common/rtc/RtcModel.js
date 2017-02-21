Ext.define('NgcpCsc.view.rtc.RtcModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.rtc',

    data: {
        title: 123456789,
        defaultThumbnail: 'resources/images/icons/phoneicon.png',
        thumbnail: 'resources/images/icons/phoneicon.png',
        status: 'calling...',
        callPanelHidden:false,
        phoneComposerHidden:false,
        faxComposerHidden:false,
        smsComposerHidden:false,
        callEnabled: false,
        micEnabled: false,
        videoEnabled: false
    }
});
