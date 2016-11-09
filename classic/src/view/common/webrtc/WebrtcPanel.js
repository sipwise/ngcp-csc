Ext.define('NgcpCsc.view.common.webrtc.WebrtcPanel', {
    extend: 'Ext.panel.Panel',

    xtype: 'webrtc',

    controller: 'webrtc',

    viewModel: 'webrtc',

    padding: '0 0 0 1',

    width: 400,

    bind: {
        title: '{title}'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        cls: 'webrtc-container'
    },
    initComponent: function() {
        this.items = [{
            xtype: 'image',
            cls: 'webrtc-avatar',
            width: 100,
            bind: {
                src: '{thumbnail}'
            }
        }, {
            xtype: 'label',
            margin: '20 0 20 0',
            bind: '{status}'
        }, {
            xtype: 'container',
            cls: 'webrtc-btns-container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                xtype: 'button',
                cls: 'webrtc-icons',
                enableToggle: true
            },
            items: [{
                iconCls: 'x-fa fa-phone',
                pressed: true
            }, {
                iconCls: 'x-fa fa-microphone',
                pressed: true
            }, {
                iconCls: 'x-fa fa-video-camera'
            }]
        }, Ext.create('NgcpCsc.view.pages.chat.ChatContainer', {
            controller:'webrtc',
            viewModel: 'webrtc'
        })];
        this.callParent();
    }
})
