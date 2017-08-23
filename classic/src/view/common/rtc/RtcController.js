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
                endcall: 'endCall',
                callPending: 'callPending',
                callAccepted: 'callAccepted',
                callRingingStart: 'callRingingStart',
                callRingingStop: 'callRingingStop',
                callRemoteMedia: 'callRemoteMedia',
                callRemoteMediaEnded: 'callRemoteMediaEnded',
                callEnded: 'callEnded'
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
        var controller = this;
        var call = null;
        var callee = controller.getViewModel().get('numberToCall');
        var network = controller.getViewModel().get('rtcEngineNetwork');

        if (callee !== '' && callee !== null && callee !== void(0)) {
            this.createMedia(mediaType).then(function (localMediaStream) {
                controller.getViewModel().set('rtcEngineLocalMediaStream', localMediaStream);
                call = network.call(callee, {
                    localMediaStream: localMediaStream
                });
                controller.getViewModel().set('rtcEngineCall', call);
                call.onPending(function () {
                    controller.fireEvent('callPending');
                }).onAccepted(function () {
                    controller.fireEvent('callAccepted');
                }).onRingingStart(function () {
                    controller.fireEvent('callRingingStart');
                }).onRingingStop(function () {
                    controller.fireEvent('callRingingStop');
                }).onRemoteMedia(function (stream) {
                    controller.fireEvent('callRemoteMedia', stream);
                }).onRemoteMediaEnded(function () {
                    controller.fireEvent('callRemoteMediaEnded');
                }).onEnded(function () {
                    controller.fireEvent('callEnded');
                });
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

    callPending: function() {
        console.log("callPending");
    },

    callAccepted: function() {
        console.log("callAccepted");
    },

    callRingingStart: function() {
        console.log("callRingingStart");
    },

    callRingingStop: function() {
        console.log("callRingingStop");
    },

    callRemoteMedia: function() {
        console.log("callRemoteMedia");
    },

    callRemoteMediaEnded: function() {
        console.log("callRemoteMediaEnded");
    },

    callEnded: function() {
        console.log("callEnded");
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
        sample.play();
        setTimeout(function() {
            var seconds = minutes = hours = 0;
            sample.pause();
            sample.currentTime = 0;
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
        var controller = this;
        Ext.Promise.resolve().then(function(){
            return new Ext.Promise(function(resolve, reject){
                Ext.Ajax.request({
                    url: '/api/rtcsessions/',
                    method: 'POST',
                    jsonData: {},
                    success: function(res){ resolve(res) },
                    failure: function(err) { reject(err); },
                    scope: controller
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
                    scope: controller
                });
            });
        }).then(function(res) {
            var viewModel = controller.getViewModel();
            var rtcNetwork = null;
            var rtcSession = Ext.decode(res.responseText);
            var rtcClient = new cdk.Client({
                url: 'wss://' + window.location.host + '/rtc/api',
                userSession: rtcSession.rtc_browser_token
            });
            rtcClient.onConnect(function(){
                console.log('Connected to RTC:Engine');
                viewModel.set('rtcEngineClient', rtcClient);
                rtcNetwork = rtcClient.getNetworkByTag('sip');
                rtcNetwork.onConnect(function(){
                    console.log('Connected to SipNetwork');
                    viewModel.set('rtcEngineNetwork', rtcNetwork);
                }).onDisconnect(function(){
                    console.log('Failed to connected to SipNetwork');
                });
            }).onDisconnect(function(){
                console.log('Failed to connected to RTC:Engine');
            });
            viewModel.set('rtcEngineSession', rtcSession);
        }).catch(function(err){
            console.error(err);
        });
    },

    // parameter state true causes the class for the background color change to
    // be added, and parameter state false causes the class to be removed
    setRtcpanelTitleColor: function (state) {
        var rtcpanel = Ext.getCmp('rtcpanel');
        rtcpanel.toggleCls('rtc-title-call-initiation', state);
    }

});
