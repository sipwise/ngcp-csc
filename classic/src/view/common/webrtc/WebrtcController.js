Ext.define('NgcpCsc.view.common.webrtc.WebrtcController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.webrtc',

    listen: {
        controller: {
            '*': {
                initwebrtc: 'showWebrtcPanel',
                startcall: 'startCall',
                pausecall: 'pauseCall',
                endcall: 'endCall',
                startvideocall: 'startVideoCall',
                pausevideocall: 'pauseVideoCall',
                endvideocall: 'endVideoCall'
            }
        }
    },

    showWebrtcPanel: function(record, switchVideoOn) {
        var panel = this.getView();
        var vm = this.getViewModel();
        var buddyUser = Ext.getStore('Chat').findRecord('uid', record.get('uid'));
        var number = (buddyUser) ? buddyUser.get('number') : record.get('caller') || record.get('source_cli') || record.get('mobile');
        this.getViewModel().set('title', Ext.String.format('{0}', number));
        vm.set('thumbnail', (buddyUser) ? buddyUser.get('thumbnail') : this.getViewModel().get('defaultThumbnail'));
        vm.set('status', Ext.String.format('calling {0} ...', (buddyUser) ? buddyUser.get('name') : ''));
        vm.set('callEnabled', true);
        vm.set('micEnabled', true);
        vm.set('videoEnabled', switchVideoOn || false);
        panel.show().expand();
    },

    toogleChat: function(btn) {
        this.fireEvent('togglechat', btn.pressed);
    },

    onBeforeClose: function(){
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
