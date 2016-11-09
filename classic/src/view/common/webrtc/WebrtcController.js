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

    showWebrtcPanel: function(record) {
        var panel = this.getView();
        var number = record.get('caller') || record.get('source_cli') || record.get('mobile');
        var user = Ext.getStore('Chat').findRecord('number', number);
        this.getViewModel().set('title', Ext.String.format('{0} <br>{1}', user.get('name'), number));
        panel.show();
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

    beforeClose: function() {
        this.getView().hide();
        return false;
    }

});
