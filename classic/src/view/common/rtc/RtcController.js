Ext.define('NgcpCsc.view.common.rtc.RtcController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rtc',
    listen: {
        controller: {
            '*': {
                initrtc: 'showRtcPanel',
                startcall: 'startCall',
                pausecall: 'pauseCall',
                endcall: 'endCall',
                startvideocall: 'startVideoCall',
                pausevideocall: 'pauseVideoCall',
                endvideocall: 'endVideoCall'
            }
        }
    },

    showRtcPanel: function(record, action) {
        var panel = this.getView();
        var vm = this.getViewModel();
        switch (action) {
            case 'startCall':
            case 'startVideoCall':
                    // TODO
                    // var buddyUser = Ext.getStore('Chat').findRecord('uid', record.get('uid'));
                    // var number = (buddyUser) ? buddyUser.get('number') : record.get('caller') || record.get('source_cli') || record.get('mobile');
                    // vm.set('title', Ext.String.format('{0}', number));
                    // vm.set('thumbnail', (buddyUser) ? buddyUser.get('thumbnail') : this.getViewModel().get('defaultThumbnail'));
                    // vm.set('status', Ext.String.format('calling {0} ...', (buddyUser) ? buddyUser.get('name') : ''));
                    // vm.set('callEnabled', true);
                    // vm.set('micEnabled', true);
                    // vm.set('videoEnabled', switchVideoOn || false);
                break;
            case 'phoneComposer':
                vm.set('phoneComposerHidden', false);
                vm.set('faxComposerHidden', true);
                vm.set('smsComposerHidden', true);
                vm.set('callPanelHidden', true);
                break;
            case 'faxComposer':
                vm.set('phoneComposerHidden', true);
                vm.set('faxComposerHidden', false);
                vm.set('smsComposerHidden', true);
                vm.set('callPanelHidden', true);
                break;
            case 'smsComposer':
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

    onBeforeClose: function() {
        this.getView().hide();
        return false;
    },
    startCall: function() {
        //TODO
    },

    pauseCall: function() {
        //TODO
    },

    endCall: function() {
        //TODO
    },

    startVideoCall: function() {
        //TODO
    },

    pauseVideoCall: function() {
        //TODO
    },

    endVideoCall: function() {
        //TODO
    },

    onPressSubmitBtn: function() {
        // TODO
    },
    onPressEnter: function() {
        // TODO
    }
});
