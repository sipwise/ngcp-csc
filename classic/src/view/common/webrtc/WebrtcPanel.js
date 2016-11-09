Ext.define('NgcpCsc.view.common.webrtc.WebrtcPanel', {
    extend: 'Ext.form.Panel',

    xtype: 'webrtc',

    controller: 'webrtc',

    viewModel: 'webrtc',

    padding: '0 0 0 1',

    width: 400,

    closable: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        cls: 'webrtc-container'
    },
    items: [{
        xtype: 'label',
        bind: '{title}'
    }, {
        xtype: 'image',
        cls: 'webrtc-avatar',
        width: 100,
        bind: {
            src: '{thumbnail}'
        }
    }, {
        xtype: 'label',
        bind: '{status}'
    }, {
        xtype: 'container',
        cls:'webrtc-btns-container',
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
    }],

    listeners: {
        beforeclose: 'beforeClose'
    }
})
