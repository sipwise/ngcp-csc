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
                initrtc: 'showRtcPanel',
                emulateCall: 'emulateCall',
                endcall: 'endCall'
            }
        }
    },

    currentStream: null,
    intervalId: '',

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
            console.log('if was true');
            this.createMedia(mediaType).then(function (localMediaStream) {
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

    showRtcPanel: function(record, action, switchVideoOn, preventReloadConversation) {
        var me = this;
        var panel = this.getView();
        var vm = this.getViewModel();
        var fieldToFocus;
        vm.set('numberToCall', '');
        switch (action) {
            case 'startCall':
            case 'startVideoCall':
                var number = record.get('name') || record.get('source_cli') || record.get('callee');
                var mainView = Ext.ComponentQuery.query('[name=mainView]')[0];
                var notification = Ext.create('NgcpCsc.model.Notification', {
                    'id': Ext.id(),
                    'conversation_type': 'call',
                    'name': number,
                    'direction': 'outgoing',
                    'status': 'answered',
                    'start_time': Date.now(),
                    "author": "Administrator",
                    "thumbnail": Ext.manifest.resources.path + "/images/user-profile/2.png"
                });
                vm.set('uid', record.get('uid') || number);
                vm.set('title', Ext.String.format(Ngcp.csc.locales.rtc.calling[localStorage.getItem('languageSelected')], number));
                vm.set('thumbnail', record.get('thumbnail') || this.getViewModel().get('defaultThumbnail'));
                vm.set('status', Ext.String.format(Ngcp.csc.locales.rtc.calling[localStorage.getItem('languageSelected')] + ' ...', number));
                vm.set('callEnabled', false);
                vm.set('micEnabled', false);
                vm.set('phoneComposerHidden', true);
                vm.set('faxComposerHidden', true);
                vm.set('smsComposerHidden', true);
                vm.set('callPanelHidden', false);
                vm.set('videoEnabled', switchVideoOn || false);
                mainView.getViewModel().set('sectionTitle', 'Conversation with ' + number);
                this.emulateCall(true, action == 'startVideoCall');
                if (!preventReloadConversation) {
                    this.redirectTo('conversation-with');
                    Ext.Function.defer(function() {
                        me.fireEvent('openpmtab', null, record);
                    }, 100);
                }
                break;
            case 'phoneComposer':
                if (vm.get('connected')) {
                    this.fireEvent('showmessage', false, Ngcp.csc.locales.rtc.call_in_progress[localStorage.getItem('languageSelected')]);
                    return;
                }
                vm.set('title', Ngcp.csc.locales.conversations.btns.new_call[localStorage.getItem('languageSelected')]);
                vm.set('phoneComposerHidden', false);
                vm.set('faxComposerHidden', true);
                vm.set('smsComposerHidden', true);
                vm.set('callPanelHidden', true);
                fieldToFocus = this.lookupReference('callNumberInput');
                break;
            case 'faxComposer':
                if (record) {
                    vm.set('numberToCall', record.get('source_cli'));
                }
                vm.set('title', Ngcp.csc.locales.conversations.btns.new_fax[localStorage.getItem('languageSelected')]);
                vm.set('phoneComposerHidden', true);
                vm.set('faxComposerHidden', false);
                vm.set('smsComposerHidden', true);
                vm.set('callPanelHidden', true);
                fieldToFocus = this.lookupReference('faxNumberInput');
                break;
            case 'smsComposer':
                if (record) {
                    vm.set('numberToCall', record.get('source_cli'));
                }
                vm.set('title', Ngcp.csc.locales.conversations.btns.new_sms[localStorage.getItem('languageSelected')]);
                vm.set('phoneComposerHidden', true);
                vm.set('faxComposerHidden', true);
                vm.set('smsComposerHidden', false);
                vm.set('callPanelHidden', true);
                fieldToFocus = this.lookupReference('smsTextArea');
                break;
            case 'incomingCall':
                me.showIncomingCallPendingState();
                break;
        }
        panel.show().expand();
        if (fieldToFocus) {
            Ext.Function.defer(function() { // needs to be executed when field is visible
                fieldToFocus.focus();
            }, 50)
        }
        this.fireEvent('collapseContacts');
    },

    toogleChat: function(btn) {
        var me = this;
        var vm = this.getViewModel();
        var contactsStore = Ext.getStore('Contacts');
        var contact = contactsStore.findRecord('uid', vm.get('uid')) || Ext.create('Ext.data.Model', {
            id: vm.get('uid'),
            name: vm.get('number')
        });
        me.fireEvent('updateconversationtitle', 'conversation-with', contact);
        me.redirectTo('conversation-with');
        Ext.Function.defer(function() {
            me.fireEvent('openpmtab', null, contact, true);
        }, 100);
    },

    toggleFullscreen: function() {
        var video = document.querySelector("video");
        var videoInProgress = false;
        Ext.each(this.currentStream.getTracks(), function(mediaTrack) {
            if (mediaTrack.readyState == 'live' && mediaTrack.kind == "video") {
                videoInProgress = true;
                return;
            }
        });
        if (videoInProgress) {
            if (Ext.isWebKit) {
                video.webkitEnterFullScreen();
            } else {
                video.mozRequestFullScreen();
            }
        }
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

    emulateCall: function(audioOn, videoOn) {
        var me = this;
        var vm = me.getViewModel();
        var sample = document.getElementById("ring");
        var ringDuration = 3000;
        if (this.intervalId !== '') {
            clearInterval(me.intervalId);
        }
        vm.set('status', 'calling...');
        me.playRingSound();
        setTimeout(function() {
            var seconds = minutes = hours = 0;
            me.stopRingSound();
            vm.set('callEnabled', true);
            vm.set('micEnabled', true);

            me.startMedia(audioOn, videoOn);

            me.intervalId = setInterval(function() {
                seconds++;
                if (seconds == 60) {
                    seconds = 0;
                    minutes++;
                }
                if (minutes == 60) {
                    minutes = 0;
                    hours++;
                }
                if (hours == 24) {
                    hours = 0;
                }
                var duration = ((hours < 10) ? '0' + hours : hours) + ': ' +
                    ((minutes < 10) ? '0' + minutes : minutes) + ': ' +
                    ((seconds < 10) ? '0' + seconds : seconds);
                vm.set('status', 'connected ' + duration);
            }, 1000);
        }, ringDuration);
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

    toggleCall: function(btn) {
        if (btn.pressed) { // this can be also checked against vm.get('callEnabled')
            this.emulateCall(true, false);
        } else {
            this.endCall();
        }
    },

    endCall: function() {
        var vm = this.getViewModel();
        var videoObj = this.lookupReference('videoObj');
        var video = document.querySelector("video");
        var me = this;
        this.lookupReference('avatar').show();
        clearInterval(this.intervalId);
        video.pause();
        video.src = "";
        videoObj.hide();
        if (this.currentStream) {
            Ext.each(this.currentStream.getTracks(), function(mediaTrack) {
                mediaTrack.stop();
            });
        }
        vm.set('status', 'Call ended.');
        vm.set('connected', false);
        this.fireEvent('notify', 'call');
    },

    startMedia: function(audio, video) {
        var me = this;
        var vm = me.getViewModel();
        //Wrap the getUserMedia function from the different browsers
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        //Our success callback where we get the media stream object and assign it to a video tag on the page
        function onSuccess(mediaObj) {
            me.currentStream = mediaObj;
            me.lookupReference('avatar').setVisible(!vm.get('videoEnabled'));
            me.lookupReference('videoObj').setVisible(vm.get('videoEnabled'));
            vm.set('connected', true);
            window.stream = mediaObj;
            var video = document.querySelector("video");
            video.src = window.URL.createObjectURL(mediaObj);
            video.play();
        }

        //Our error callback where we will handle any issues
        function onError(errorObj) {
            console.log("There was an error: " + errorObj);
        }

        //We can select to request audio and video or just one of them
        var mediaConstraints = {
            video: video,
            audio: audio
        };

        //Call our method to request the media object - this will trigger the browser to prompt a request.
        navigator.getUserMedia(mediaConstraints, onSuccess, onError);
    },

    showPhoneComposer: function(btn) {
        var vm = this.getViewModel();
        vm.set('phoneKeyboardHidden', !btn.pressed);
    },

    digitNumber: function(btn) {
        var vm = this.getViewModel();
        var currentNum = vm.get('numberToCall');
        vm.set('numberToCall', currentNum + btn.getText())
    },

    startNewCall: function() {
        var vm = this.getViewModel();
        var currentNum = vm.get('numberToCall');
        var record = Ext.create('Ext.data.Model', {
            callee: currentNum
        });
        this.showRtcPanel(record, 'startCall');
    },

    sendFax: function() {
        var me = this;
        var vm = me.getViewModel();
        var mainView = Ext.ComponentQuery.query('[name=mainView]')[0];
        var faxForm = me.getView().down('fax-composer');
        var record = Ext.create('NgcpCsc.model.Notification', {
            'id': Ext.id(),
            'conversation_type': 'fax',
            'name': vm.get('numberToCall') || 'Administrator',
            'direction': 'outgoing',
            'status': 'answered',
            'start_time': Date.now(),
            "thumbnail": Ext.manifest.resources.path + "/images/user-profile/2.png"
        });
        if (faxForm.isValid()) {
            mainView.getViewModel().set('sectionTitle', 'Conversation with ' + vm.get('numberToCall'));
            me.redirectTo('conversation-with');
            Ext.Function.defer(function() {
                me.fireEvent('openpmtab', null, record);
                me.fireEvent('notify', 'fax');
            }, 100);
            faxForm.reset();
            me.fireEvent('showmessage', true, Ngcp.csc.locales.rtc.fax_sent[localStorage.getItem('languageSelected')]);
        } else {
            me.fireEvent('showmessage', false, Ngcp.csc.locales.common.invalid_form[localStorage.getItem('languageSelected')]);
        }
        this.getView().close();

    },

    sendSms: function() {
        var me = this;
        var vm = me.getViewModel();
        var mainView = Ext.ComponentQuery.query('[name=mainView]')[0];
        var smsForm = me.getView().down('sms-composer');
        var record = Ext.create('NgcpCsc.model.Notification', {
            'id': Ext.id(),
            'conversation_type': 'sms',
            'name': vm.get('numberToCall'),
            'direction': 'outgoing',
            'status': 'answered',
            'text': vm.get('smsText'),
            'start_time': Date.now(),
            "author": "Administrator",
            "thumbnail": Ext.manifest.resources.path + "/images/user-profile/2.png"
        });
        mainView.getViewModel().set('sectionTitle', 'Conversation with ' + vm.get('numberToCall'));
        me.redirectTo('conversation-with');
        Ext.Function.defer(function() {
            me.fireEvent('openpmtab', null, record);
            me.fireEvent('notify', 'sms', vm.get('smsText'));
            smsForm.reset();
            me.getView().close();
        }, 100);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.rtc.sms_sent[localStorage.getItem('languageSelected')]);
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
                    $vm.set('callEnabled', true);
                }).onIncomingCall(function(call) {
                    call.onPending(function(){ $ct.incomingCallPending(); })
                        .onRemoteMedia(function(stream){ $ct.incomingRemoteMedia(stream); })
                        .onRemoteMediaEnded(function(){ $ct.incomingRemoteMediaEnded(); })
                        .onEnded(function(){ $ct.incomingRemoteMediaEnded() });
                }).onDisconnect(function(){
                    $vm.set('callEnabled', false);
                    $vm.set('callDisabledReason', rtcNetwork.disconnectReason);
                });
            }).onDisconnect(function(){
                $vm.set('callEnabled', false);
                $vm.set('callDisabledReason', rtcClient.disconnectReason);
            });
        }).catch(function(err){
            $vm.set('callEnabled', false);
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
    },

    outgoingRingingStop: function() {
        console.log('outgoingCallRingingStop');
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
    },

    incomingCallPending: function() {
        console.log('incomingCallPending');
    },

    incomingRemoteMedia: function(stream) {
        console.log('incomingRemoteMedia');
    },

    incomingRemoteMediaEnded: function() {
        console.log('incomingRemoteMediaEnded');
    },

    incomingEnded: function() {
        console.log('incomingEnded');
        this.callEnded();
    },

    callEnded: function() {
        var $ct = this;
        var $vm = $ct.getViewModel();
        var localMediaStream = $vm.get('rtcEngineLocalMediaStream');
        if(localMediaStream !== null) {
            localMediaStream.stop();
            $vm.set('rtcEngineLocalMediaStream', null);
        }
    },

    setRtcpanelTitleColor: function (state) {
        // parameter true to change color, and false to revert
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

    showOutgoingCallPendingState: function() {
        var vm = this.getViewModel();
        vm.set('callPanel', true);
        vm.set('outgoingCallPending', true);
        vm.set('phoneComposerHidden', true);
    },

    showIncomingCallPendingState: function (caller, type) {
        // parameters: caller should be a string containing the number of the
        // caller, type should be a string containing the media type of the call
        var vm = this.getViewModel();
        var caller = caller || '+4312345';
        var type = type || 'audio';
        vm.set('callPanel', true);
        vm.set('incomingCallPending', true);
        vm.set('phoneComposerHidden', true);
        vm.set('title', Ngcp.csc.locales.rtc.incoming_call[localStorage.getItem('languageSelected')]);
        vm.set('incomingCaller', caller);
        vm.set('incomingType', type);
        vm.set('incomingCallHidden', false);
        this.setRtcpanelTitleColor(true);
    },

    hideIncomingCallPendingState: function () {
        var vm = this.getViewModel();
        var rtcpanel = Ext.getCmp('rtcpanel');
        this.setRtcpanelTitleColor(false);
        vm.set('callPanel', false);
        vm.set('incomingCallPending', false);
        vm.set('title', '');
        vm.set('incomingCaller', '');
        vm.set('incomingType', '');
        if (rtcpanel) { // Closes rtcpanel
            rtcpanel.close();
        };
    },

    // TODO Call: Implement decline button functionality
    // DONE a. Close call panel
    // DONE b. End call (call.end(...))
    // DONE c. Cleanup local media (stream.stop())
    // TODO d. Add remote media stream to view model
    // TODO e. Cleanup remote media (stream.stop())

    declineCall: function () {
        var $vm = this.getViewModel();
        var call = $vm.get('rtcEngineCall');
        var localMediaStream = $vm.get('rtcEngineLocalMediaStream');
        // var remoteMediaStream = ??;
        call.end('decline');
        localMediaStream.stop();
        // TODO: Uncomment to complete todo a.
        // this.hideIncomingCallPendingState();
    }

});
