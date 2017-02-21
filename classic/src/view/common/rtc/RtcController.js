Ext.define('NgcpCsc.view.common.rtc.RtcController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rtc',
    listen: {
        controller: {
            '*': {
                initrtc: 'showRtcPanel',
                emulateCall: 'emulateCall',
                endcall: 'endCall'
            }
        }
    },

    currentStream: {},
    intervalId: '',

    showRtcPanel: function(record, action, switchVideoOn) {
        var panel = this.getView();
        var vm = this.getViewModel();
        vm.set('numberToCall', '');
        switch (action) {
            case 'startCall':
            case 'startVideoCall':
                var buddyUser = Ext.getStore('Chat').findRecord('uid', record.get('uid'));
                var number = (buddyUser) ? buddyUser.get('number') : record.get('caller') || record.get('source_cli') || record.get('mobile');
                var mainView = Ext.ComponentQuery.query('[name=mainView]')[0];
                vm.set('title', Ext.String.format('Call with {0}', number));
                vm.set('thumbnail', (buddyUser) ? buddyUser.get('thumbnail') : this.getViewModel().get('defaultThumbnail'));
                vm.set('status', Ext.String.format('calling {0} ...', (buddyUser) ? buddyUser.get('name') : ''));
                vm.set('callEnabled', false);
                vm.set('micEnabled', false);
                vm.set('phoneComposerHidden', true);
                vm.set('faxComposerHidden', true);
                vm.set('smsComposerHidden', true);
                vm.set('callPanelHidden', false);
                vm.set('videoEnabled', switchVideoOn || false);
                mainView.getViewModel().set('sectionTitle', 'Conversation with ' + number);
                this.redirectTo('conversation-with');
                this.emulateCall(true, action == 'startVideoCall');
                break;
            case 'phoneComposer':
                if(vm.get('connected')){
                    this.fireEvent('showmessage', false, Ngcp.csc.locales.rtc.call_in_progress[localStorage.getItem('languageSelected')]);
                    return;
                }
                vm.set('title', Ngcp.csc.locales.conversations.btns.new_call[localStorage.getItem('languageSelected')]);
                vm.set('phoneComposerHidden', false);
                vm.set('faxComposerHidden', true);
                vm.set('smsComposerHidden', true);
                vm.set('callPanelHidden', true);
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
                break;
        }
        panel.show().expand();
    },

    toogleChat: function(btn) {
        this.fireEvent('togglechat', btn.pressed);
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
        this.endCall();
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
                var duration = ((hours < 10) ? '0' + hours : hours) + ':' +
                    ((minutes < 10) ? '0' + minutes : minutes) + ':' +
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
            btn.removeCls('fa-rotate-180');
            this.emulateCall(true, false);
        } else {
            btn.addCls('fa-rotate-180');
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
        if(this.currentStream.getTracks()){
            Ext.each(this.currentStream.getTracks(), function(mediaTrack) {
                mediaTrack.stop();
            });
        }
        vm.set('status', 'Call ended.');
        vm.set('connected', false);
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
        var record = Ext.create('NgcpCsc.model.Conversation', {
            caller: currentNum
        });
        this.showRtcPanel(record, 'startCall');
    },
    sendFax: function() {
        var vm = this.getViewModel();
        var mainView = Ext.ComponentQuery.query('[name=mainView]')[0];
        var faxForm = this.getView().down('fax-composer');
        if(faxForm.isValid()){
            mainView.getViewModel().set('sectionTitle', 'Conversation with ' + vm.get('numberToCall'));
            this.redirectTo('conversation-with');
            faxForm.reset();
            this.fireEvent('showmessage', true, Ngcp.csc.locales.rtc.fax_sent[localStorage.getItem('languageSelected')]);
        }else{
            this.fireEvent('showmessage', false, Ngcp.csc.locales.common.invalid_form[localStorage.getItem('languageSelected')]);
        }

    },
    sendSms: function() {
        var vm = this.getViewModel();
        var mainView = Ext.ComponentQuery.query('[name=mainView]')[0];
        mainView.getViewModel().set('sectionTitle', 'Conversation with ' + vm.get('numberToCall'));
        this.redirectTo('conversation-with');
        this.fireEvent('showmessage', true, Ngcp.csc.locales.rtc.sms_sent[localStorage.getItem('languageSelected')]);
    }
});
