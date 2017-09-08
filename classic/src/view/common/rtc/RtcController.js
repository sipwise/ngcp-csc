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

    getComposer: function() {
        return this.getView().lookupReference('phoneComposer');
    },

    getCallPanel: function() {
        return this.getView().lookupReference('callPanel');
    },

    getOutgoingCallState: function() {
        return this.getView().lookupReference('outgoingCallState');
    },

    getOutgoingCallLabel: function() {
        return this.getView().lookupReference('outgoingCallLabel');
    },

    getCallAbortedState: function() {
        return this.getView().lookupReference('callAbortedState');
    },

    getIncomingCallState: function() {
        return this.getView().lookupReference('incomingCallState');
    },

    hideAllCallStates: function() {
        this.getOutgoingCallState().hide();
        this.getCallAbortedState().hide();
        this.getIncomingCallState().hide();
        this.getView().lookupReference('acceptedCallState').hide();
    },

    cleanupCall: function(reason) {
        var call = this.getViewModel().get('rtcEngineCall');
        var lms = this.getViewModel().get('rtcEngineLocalMediaStream');
        var rms = this.getViewModel().get('rtcEngineRemoteMediaStream');
        if(call !== null && call !== void(0)) {
            call.end(reason);
        }
        if(lms !== null && lms !== void(0)) {
            lms.stop();
            this.getViewModel().set('rtcEngineLocalMediaStream', null);
        }
        if(rms !== null && rms !== void(0)) {
            rms.stop();
            this.getViewModel().set('rtcEngineRemoteMediaStream', null);
        }
    },

    isCallRunning: function() {
        return this.hasCall() && this.getCall().state !== 'ended';
    },

    hasCall: function() {
        return this.getCall() !== null;
    },

    getCall: function() {
        return this.getViewModel().get('rtcEngineCall');
    },

    getPeer: function() {
        var parts = this.getCall().peer.split('@')[0].split(':');
        if(parts.length > 1) {
            return parts[1];
        } else {
            return parts[0];
        }
    },

    getMyNumber: function() {
        var parts = this.getCall().network.getUser().split('@')[0].split(':');
        if(parts.length > 1) {
            return parts[1];
        } else {
            return parts[0];
        }
    },

    composeCall: function() {
        if(!this.isCallRunning()) {
            this.showComposer();
        } else {
            this.showCallPanel();
        }
    },

    showComposer: function() {
        this.getView().setTitle('New Call');
        this.getView().removeCls('rtc-title-call-initiation');
        this.getView().removeCls('x-panel-call');
        this.getView().setClosable(true);
        this.getComposer().show();
        this.getCallPanel().hide();
        if(this.getView().isHidden()) {
            this.getView().show();
        }
        this.lookupReference('callNumberInput').focus();
    },

    showCallPanel: function() {
        this.getView().addCls('rtc-title-call-initiation');
        this.getView().addCls('x-panel-call');
        this.getView().setClosable(false);
        this.getComposer().hide();
        this.getCallPanel().show();
        if(this.getView().isHidden()) {
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
        if (callee !== '' && callee !== null && callee !== void(0)) {
            this.cleanupCall();
            this.createMedia(mediaType).then(function (localMediaStream) {
                $vm.set('rtcEngineLocalMediaStream', localMediaStream);
                $vm.set('rtcEngineCall', network.call(callee, {
                    localMediaStream: localMediaStream
                }));
                $vm.get('rtcEngineCall')
                    .onPending(function () { $ct.outgoingPending(); })
                    .onAccepted(function () { $ct.outgoingAccepted(); })
                    .onRingingStart(function () { $ct.outgoingRingingStart(); })
                    .onRingingStop(function () { $ct.outgoingRingingStop(); })
                    .onRemoteMedia(function (stream) { $ct.outgoingRemoteMedia(stream); })
                    .onRemoteMediaEnded(function () { $ct.outgoingRemoteMediaEnded(); })
                    .onEnded(function () { $ct.outgoingEnded(); });
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
                if(mediaType === 'audio' || mediaType === 'video') {
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
                    success: function(res) { resolve(res); },
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
                    success: function(res) { resolve(res); },
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

                }).onIncomingCall(function(call) {
                    $vm.set('rtcEngineCall', call);
                    $ct.incomingCallPending(call);
                    call
                        .onRemoteMedia(function(stream){
                            $vm.set('rtcEngineRemoteMediaStream', stream);
                            $ct.incomingRemoteMedia(stream);
                        })
                        .onRemoteMediaEnded(function(){ $ct.incomingRemoteMediaEnded(); })
                        .onEnded(function(reason){ $ct.incomingCallEnded(reason) });
                }).onDisconnect(function(){
                    this.hideCall();
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

    attachStreamToDomNode: function(id, stream, muted) {
        $ct = this;
        document.getElementById(id).onplaying = function(){ $ct.getView().updateLayout(); };
        cdk.MediaElementHelper.attachStreamToDomNode(document.getElementById(id), stream);
        if(muted) {
            document.getElementById(id).muted = true;
        }
    },

    outgoingPending: function() {
        console.log('outgoingCallPending');
        var localMediaStream = this.getViewModel().get('rtcEngineLocalMediaStream');
        this.showCallPanel();
        this.hideAllCallStates();
        this.getOutgoingCallState().show();
        this.getOutgoingCallLabel().setHtml('Try to call ' + Ngcp.csc.animations.loading_dots);
        this.getView().lookupReference('outgoingCallPeer').setText(this.getPeer());
        if(localMediaStream.hasVideo()) {
            this.getView().lookupReference('outgoingCallMedia').show();
            this.attachStreamToDomNode('outgoing-call-media', localMediaStream, true);
        } else {
            this.getView().lookupReference('outgoingCallMedia').hide();
        }
    },

    outgoingAccepted: function() {
        console.log('outgoingCallAccepted');
        this.showAcceptedState();
    },

    outgoingRingingStart: function() {
        console.log('outgoingCallRingingStart');
        this.playRingSound();
        this.getOutgoingCallLabel().setHtml('Ringing ' + Ngcp.csc.animations.loading_dots);
    },

    outgoingRingingStop: function() {
        console.log('outgoingCallRingingStop');
        this.stopRingSound();
    },

    outgoingRemoteMedia: function(remoteMediaStream) {
        console.log('outgoingCallRemoteMedia');
        this.getViewModel().set('rtcEngineRemoteMediaStream', remoteMediaStream);
        this.showRemoteMedia(remoteMediaStream);
    },

    outgoingRemoteMediaEnded: function() {
        console.log('outgoingCallRemoteMediaEnded');
    },

    outgoingEnded: function() {
        console.log('outgoingCallEnded');
        this.showAbortedState();
        this.callEnded();
    },

    incomingCallPending: function(call) {
        console.log('incomingCallPending');
        this.playRingSound();
        this.showCallPanel();
        this.hideAllCallStates();
        this.getIncomingCallState().show();
        this.getView().setTitle(Ngcp.csc.locales.rtc.incoming_call[localStorage.getItem('languageSelected')]);
        this.getView().lookupReference('callIncomingType').setHtml(
            Ext.String.format(Ngcp.csc.locales.rtc.incoming_call_from[localStorage.getItem('languageSelected')] +
                Ngcp.csc.animations.loading_dots, 'audio'))
        this.getView().lookupReference('callIncomingPeer').setText(this.getPeer());
    },

    incomingRemoteMedia: function(remoteMediaStream) {
        console.log('incomingRemoteMedia');
        this.getViewModel().set('rtcEngineRemoteMediaStream', remoteMediaStream);
        this.showRemoteMedia(remoteMediaStream);
    },

    incomingRemoteMediaEnded: function() {
        console.log('incomingRemoteMediaEnded');
    },

    incomingCallEnded: function () {
        console.log('incomingCallEnded');
        this.showAbortedState();
        this.callEnded();
    },

    callEnded: function(reason) {
        this.cleanupCall(reason);
    },

    cancelOutgoingCall: function() {
        this.callEnded('aborted');
        this.showComposer();
    },

    showAcceptedState: function() {
        $ct = this;
        $vm = $ct.getViewModel();
        var localMediaStream = $vm.get('rtcEngineLocalMediaStream');
        this.stopRingSound();
        this.hideAllCallStates();
        this.showCallPanel();
        this.getView().lookupReference('acceptedCallState').show();
        if(localMediaStream.hasVideo()) {
            this.getView().lookupReference('callToggleVideo').show();
            this.getView().lookupReference('acceptedLocalMedia').show();
            this.attachStreamToDomNode('accepted-local-media', localMediaStream, true);
        } else {
            this.getView().lookupReference('callToggleVideo').hide();
            this.getView().lookupReference('acceptedLocalMedia').hide();
        }
        this.getView().lookupReference('callToggleVideo').removeCls('call-button-disabled');
        this.getView().lookupReference('callToggleAudio').removeCls('call-button-disabled');
        this.getView().lookupReference('callToggleRemoteAudio').removeCls('call-button-disabled');
    },

    showRemoteMedia: function(remoteMediaStream) {
        var localMediaStream = $vm.get('rtcEngineLocalMediaStream');
        var title = '';
        if(localMediaStream.hasVideo() || remoteMediaStream.hasVideo()) {
            title = 'Video ';
        } else {
            title = 'Audio ';
        }
        title = title + ' call with ' + this.getPeer();
        this.getView().setTitle(title);
        this.getView().lookupReference('acceptedRemoteMedia').show();
        this.attachStreamToDomNode('accepted-remote-media', remoteMediaStream, false);
    },

    showAbortedState: function (by, reason) {
        this.stopRingSound();
        this.hideAllCallStates();
        this.getCallAbortedState().show();
        this.showCallPanel();
        this.getView().lookupReference('callAbortedPeer').setText(
            Ext.String.format(Ngcp.csc.locales.rtc.call_aborted_by[localStorage.getItem('languageSelected')],
                by || this.getPeer()
            )
        );
        this.getView().lookupReference('callAbortedReason').setText(
            Ext.String.format(Ngcp.csc.locales.rtc.abort_reason[localStorage.getItem('languageSelected')],
                reason || this.getCall().endedReason
            )
        );
    },

    hideAbortedState: function () {
        this.stopRingSound();
        if(this.hasCall() && this.getCall().origin === 'local') {
            this.showComposer();
        } else {
            this.closeRtcPanel();
        }
    },

    playRingSound: function () {
        var sound = document.getElementById('ring');
        if (sound.paused) {
            sound.play();
        }
    },

    stopRingSound: function () {
        var sound = document.getElementById('ring');
        sound.pause();
        sound.currentTime = 0;
    },

    closeRtcPanel: function () {
        if(!this.isCallRunning()) {
            this.getView().hide();
        }
    },

    handleBeforeClose: function() {
        this.closeRtcPanel();
        return false;
    },

    declineCall: function () {
        this.cleanupCall();
        this.hideAbortedState();
    },

    endCall: function () {
        this.cleanupCall();
        this.hideAbortedState();
    },

    acceptCallVideo: function () {
        this.acceptCall('video');
    },

    acceptCallAudio: function () {
        this.acceptCall('audio');
    },

    acceptCall: function (mediaType) {
        var $ct = this;
        var $vm = this.getViewModel();
        var call = $vm.get('rtcEngineCall');
        this.createMedia(mediaType).then(function(localMediaStream){
            $vm.set('rtcEngineLocalMediaStream', localMediaStream);
            call.accept({ localMediaStream: localMediaStream });
            $ct.showAcceptedState();
        }).catch(function(err){
            console.error(err);
            $ct.cleanupCall();
            $ct.showAbortedState($ct.getMyNumber(), 'mediaAccessDenied');
        });
    },

    toggleLocalAudio: function() {
        var $vm = this.getViewModel();
        var call = $vm.get('rtcEngineCall');
        if(!this.getView().lookupReference('callToggleAudio').hasCls('call-button-disabled')) {
            call.disableAudio();
            this.getView().lookupReference('callToggleAudio').addCls('call-button-disabled');
        } else {
            call.enableAudio();
            this.getView().lookupReference('callToggleAudio').removeCls('call-button-disabled');
        }
    },

    toggleLocalVideo: function() {
        var $vm = this.getViewModel();
        var call = $vm.get('rtcEngineCall');
        if(!this.getView().lookupReference('callToggleVideo').hasCls('call-button-disabled')) {
            call.disableVideo();
            this.getView().lookupReference('callToggleVideo').addCls('call-button-disabled');
        } else {
            call.enableVideo();
            this.getView().lookupReference('callToggleVideo').removeCls('call-button-disabled');
        }
    },

    toggleRemoteAudio: function() {
        var $vm = this.getViewModel();
        var call = $vm.get('rtcEngineCall');
        if(!this.getView().lookupReference('callToggleRemoteAudio').hasCls('call-button-disabled')) {
            document.getElementById('accepted-remote-media').muted = true;
            this.getView().lookupReference('callToggleRemoteAudio').addCls('call-button-disabled');
        } else {
            document.getElementById('accepted-remote-media').muted = false;
            this.getView().lookupReference('callToggleRemoteAudio').removeCls('call-button-disabled');
        }
    },

    showPhoneComposer: function() {
        if(this.getViewModel().get('phoneKeyboardHidden')) {
            this.getViewModel().set('phoneKeyboardHidden', false);
        } else {
            this.getViewModel().set('phoneKeyboardHidden', true);
        }
    }
});
