/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('NgcpCsc.Application', {
    extend: 'Ext.app.Application',

    name: 'NgcpCsc',

    views: [
        'NgcpCsc.view.main.Main',
        'NgcpCsc.view.login.Login',
        'NgcpCsc.view.common.webrtc.WebrtcPanel'
    ],

    stores: [
        'NavigationTree',
        'Calls',
        'CallTypes',
        'VoiceMails',
        'Chat',
        'ChatList',
        'Languages',
        'CallBarringOutgoing',
        'CallBarringIncoming',
        'Addressbook',
        'FaxSpool',
        'FaxSendQuality',
        'Chart',
        'Seats',
        'Devices',
        'DevicesList',
        'Destinations',
        'Sounds'
    ],

    launch: function() {
        // TODO to be replaced with request
        if(localStorage.getItem('remember_me')){
            window.location.hash = '#desktop';
            Ext.create({
                xtype: 'ngcp-main'
            });
        }else{
            window.location.hash = '';
            Ext.create({
                xtype: 'ngcp-login'
            });
        }
    }
});
