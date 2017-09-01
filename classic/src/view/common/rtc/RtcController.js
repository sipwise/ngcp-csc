Ext.define('NgcpCsc.view.common.rtc.RtcController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rtc',
    id: 'rtc',
    listen: {
        global: {
            mainAppLoaded: 'initRtcEngineClient'
        },
        controller: {
            '*': {
                composeCall: 'composeCall'
            }
        }
    },

    currentStream: null,
    intervalId: '',

    cleanupCall: function(reason) {
        var call = this.getViewModel().get('rtcEngineCall');
        var lms = this.getViewModel().get('rtcEngineLocalMediaStream');
        var rms = this.getViewModel().get('rtcEngineRemoteMediaStream');
        if(call !== null && call !== void(0)) {
            call.end(reason);
            this.getViewModel().set('rtcEngineCall', null);
        }
        if(lms !== null && lms !== void(0)) {
            lms.stop();
            this.getViewModel().set('rtcEngineLocalMediaStream', null);
        }

        if(rms !== null && rms !== void(0)) {
            this.getViewModel().set('rtcEngineRemoteMediaStream', null);
        }
    },

    composeCall: function() {
        if(this.getViewModel().get('rtcEngineCall') === null) {
            this.getViewModel().set('phoneComposerHidden', false);
            this.getViewModel().set('title', 'New Call');
        }
        if(!this.getView().isVisible()) {
            this.getView().show();
        }
    },

    sendAudio: function(){
        this.initCall('audio');
    },

    sendVideo: function() {
        this.initCall('video');
    },

    initCall: function(mediaType) {
        var $ct = this;
        var $vm = this.getViewModel();
        var callee = $vm.get('numberToCall');
        var network = $vm.get('rtcEngineNetwork');
        var localMediaStream = $vm.get('rtcEngineLocalMediaStream');
        if (callee !== '' && callee !== null && callee !== void(0)) {
            $vm.set('callPanelEnabled', true);
            this.cleanupCall();
            this.createMedia(mediaType).then(function (localMediaStream) {
                // Todo: attache stream to video element
                // if(mediaType === 'video') {
                //     cdk.MediaElementHelper.attachStreamToDomNode(
                //         document.getElementById('call-local-preview'),
                //         localMediaStream
                //     );
                // }
                var call = network.call(callee, { localMediaStream: localMediaStream });
                call.onPending(function () { $ct.outgoingPending(); })
                    .onAccepted(function () { $ct.outgoingAccepted(); })
                    .onRingingStart(function () { $ct.outgoingRingingStart(); })
                    .onRingingStop(function () { $ct.outgoingRingingStop(); })
                    .onRemoteMedia(function (stream) { $ct.outgoingRemoteMedia(); })
                    .onRemoteMediaEnded(function () { $ct.outgoingRemoteMediaEnded(); })
                    .onEnded(function () { $ct.outgoingEnded(); });
                $vm.set('rtcEngineLocalMediaStream', localMediaStream);
                $vm.set('rtcEngineCall', call);
            }).catch(function (err) {
                console.error(err);
            });
        }
    },

    createMedia: function(mediaType) {
        return new Ext.Promise(function(resolve, reject){
            var localMediaStream;
            localMediaStream = new cdk.LocalMediaStream();
            localMediaStream.queryMediaSources(function(sources){
                if(mediaType === 'audio') {
                    localMediaStream.setAudio(sources.defaultAudio);
                }
                if(mediaType === 'video') {
                    localMediaStream.setVideo(sources.defaultVideo);
                }
                localMediaStream.build(function(err){
                    if(err) {
                        reject(err);
                    } else {
                        resolve(localMediaStream);
                    }
                });
            });
        });
    },

    minimizeRtcPanel: function() {
        this.getView().collapse();
    },

    onBeforeClose: function() {
        var vm = this.getViewModel();
        this.getView().hide();
        vm.set('status', '');
        clearInterval(this.intervalId);
        if (vm.get('connected')) {
            this.endCall();
        }
        this.fireEvent('expandContacts');
        return false;
    },

    toggleAudioVideo: function() {
        var me = this;
        var vm = this.getViewModel();
        var video = document.querySelector("video");
        Ext.each(this.currentStream.getTracks(), function(mediaTrack) {
            if (mediaTrack.readyState == 'live') {
                video.pause();
                video.src = "";
                mediaTrack.stop();
            }
        });
        if (vm.get('micEnabled') || vm.get('videoEnabled')) {
            me.startMedia(vm.get('micEnabled'), vm.get('videoEnabled'));
        }
    },

    initRtcEngineClient: function() {
        var $ct = this;
        var $vm = $ct.getViewModel();
        Ext.Promise.resolve().then(function(){
            return new Ext.Promise(function(resolve, reject){
                Ext.Ajax.request({
                    url: '/api/rtcsessions/',
                    method: 'POST',
                    jsonData: {},
                    success: function(res){ resolve(res) },
                    failure: function(err) { reject(err); },
                    scope: $ct
                });
            });
        }).then(function(res) {
            return new Ext.Promise(function(resolve, reject){
                Ext.Ajax.request({
                    url: res.getResponseHeader('Location'),
                    method: 'GET',
                    jsonData: {},
                    success: function(res){ resolve(res) },
                    failure: function(err) { reject(err); },
                    scope: $ct
                });
            });
        }).then(function(res) {
            var rtcSession = Ext.decode(res.responseText);
            var rtcClient = new cdk.Client({
                url: 'wss://' + window.location.host + '/rtc/api',
                userSession: rtcSession.rtc_browser_token
            });
            $vm.set('rtcEngineClient', rtcClient);
            rtcClient.onConnect(function() {
                var rtcNetwork = rtcClient.getNetworkByTag('sip');
                $vm.set('rtcEngineNetwork', rtcNetwork);
                rtcNetwork.onConnect(function() {
                    $vm.set('callPanelEnabled', true);
                }).onIncomingCall(function(call) {
                    $ct.incomingCallPending(call);
                    call.onRemoteMedia(function(stream){
                            $vm.set('rtcEngineRemoteMediaStream', stream);
                            $ct.incomingRemoteMedia(stream);
                        })
                        // XXX @hherzog Should these both be invoking the same function?
                        // I separated them for now, as they were causing double invoking
                        // of incomingRemoteMediaEnded()
                        .onRemoteMediaEnded(function(){ $ct.incomingRemoteMediaEnded(); })
                        .onEnded(function(reason){ $ct.incomingCallEnded(reason) });
                }).onDisconnect(function(){
                    $vm.set('callPanelEnabled', false);
                    $vm.set('callDisabledReason', rtcNetwork.disconnectReason);
                });
            }).onDisconnect(function(){
                $vm.set('callPanelEnabled', false);
                $vm.set('callDisabledReason', rtcClient.disconnectReason);
            });
        }).catch(function(err){
            $vm.set('callPanelEnabled', false);
            $vm.set('callDisabledReason', err.message);
            console.error(err);
        });
    },

    outgoingPending: function() {
        console.log('outgoingCallPending');
        this.showOutgoingCallPendingState();
    },

    outgoingAccepted: function() {
        console.log('outgoingCallAccepted');
    },

    outgoingRingingStart: function() {
        console.log('outgoingCallRingingStart');
        this.showOutgoingCallRingingState();
    },

    outgoingRingingStop: function() {
        console.log('outgoingCallRingingStop');
        this.stopRingSound();
    },

    outgoingRemoteMedia: function(stream) {
        console.log('outgoingCallRemoteMedia');
    },

    outgoingRemoteMediaEnded: function() {
        console.log('outgoingCallRemoteMediaEnded');
    },

    outgoingEnded: function() {
        console.log('outgoingCallEnded');
        this.callEnded();
        this.composeCall();
        this.getViewModel().set('callPanelEnabled', false);
    },

    incomingCallPending: function(call) {
        console.log('incomingCallPending');
        var peerNum = call.peer.split(/(:|@)/)[2];
        var type = call.type == 'call' ? 'audio' : call.type;
        this.getView().show().expand();
        this.showIncomingCallPendingState(peerNum, type);
    },

    incomingRemoteMedia: function(stream) {
        console.log('incomingRemoteMedia');
    },

    incomingRemoteMediaEnded: function() {
        console.log('incomingRemoteMediaEnded');
    },

    incomingCallEnded: function (reason) {
        this.hideIncomingCallPendingState();
        this.showAbortedState(reason);
    },

    incomingEnded: function() {
        console.log('incomingEnded');
        this.callEnded();
    },

    callEnded: function(reason) {
        this.cleanupCall(reason);
    },

    cancelOutgoingCall: function() {
        this.callEnded('aborted');
        this.composeCall();
        this.getViewModel().set('callPanelEnabled', false);
    },

    showOutgoingCallPendingState: function() {
        this.getViewModel().set('callPending', true);
        this.getViewModel().set('callActionLabel', 'Try to call');
        this.getViewModel().set('phoneComposerHidden', true);
    },

    showOutgoingCallRingingState: function() {
        this.getViewModel().set('callRinging', true);
        this.getViewModel().set('callPending', false);
        this.getViewModel().set('callActionLabel', 'Ringing');
        this.playRingSound();
    },

    showAbortedState: function (reason) {
        var $vm = this.getViewModel();
        $vm.set('abortReason', reason || 'declined');
        $vm.set('phoneComposerHidden', true);
        $vm.set('callAborted', true);
    },

    hideAbortedState: function () {
        var $vm = this.getViewModel();
        $vm.set('abortReason', '');
        $vm.set('callAborted', false);
        $vm.set('incomingCaller', '');
        this.closeRtcPanel();
    },

    setRtcpanelTitleColor: function (state) {
        // parameters: true to change color, and false to revert
        var rtcpanel = Ext.getCmp('rtcpanel');
        rtcpanel.toggleCls('rtc-title-call-initiation', state);
    },

    playRingSound: function () {
        var sound = document.getElementById('ring');
        if (sound.paused) {
            sound.play();
        };
    },

    stopRingSound: function () {
        var sound = document.getElementById('ring');
        sound.pause();
        sound.currentTime = 0;
    },

    closeRtcPanel: function () {
        var rtcpanel = Ext.getCmp('rtcpanel');
        if (rtcpanel) {
            rtcpanel.close();
        };
    },

    showIncomingCallPendingState: function (caller, type) {
        var $vm = this.getViewModel();
        $vm.set('callPanel', true);
        $vm.set('incomingCallPending', true);
        $vm.set('phoneComposerHidden', true);
        $vm.set('title', Ngcp.csc.locales.rtc.incoming_call[localStorage.getItem('languageSelected')]);
        $vm.set('incomingCaller', caller);
        $vm.set('incomingType', type);
        $vm.set('incomingCallHidden', false);
        this.setRtcpanelTitleColor(true);
    },

    hideIncomingCallPendingState: function () {
        var vm = this.getViewModel();
        var rtcpanel = Ext.getCmp('rtcpanel');
        this.setRtcpanelTitleColor(false);
        vm.set('callPanel', false);
        vm.set('incomingCallPending', false);
        vm.set('title', '');
        vm.set('incomingType', '');
        this.setRtcpanelTitleColor(false);
    },

    declineCall: function () {
        this.hideIncomingCallPendingState();
    }

});
