Ext.define('NgcpCsc.view.common.composer.IncomingCall', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.incoming-call',

    bind: {
        hidden: '{incomingCallHidden}'
    },

    items: [{
        layout: {
            type: 'vbox',
            align: 'center'
        },
        margin: '20 0 20 0',
        items: [{
            html: 'Incoming audio call from ...'
        }, {
            html: '+4312345'
        }]
    }, {
        xtype: 'container',
        layout: {
            type: 'hbox',
            align: 'middle'
        },
        items: [{
            flex: 2
        }, {
            xtype: 'button',
            iconCls: Ngcp.csc.icons.phone2x,
            width: 50,
            height: 50,
            listeners: {
                click: 'acceptCallAudio'
            }
        }, {
            flex: 2
        }, {
            xtype: 'button',
            iconCls: Ngcp.csc.icons.video2x,
            width: 50,
            height: 50,
            listeners: {
                click: 'acceptCallVideo'
            }
        }, {
            flex: 2
        }, {
            xtype: 'button',
            iconCls: Ngcp.csc.icons.phone_cancel2x,
            userCls: 'rtc-decline-call',
            pressedCls: 'rtc-decline-call-pressed',
            width: 50,
            height: 50,
            listeners: {
                click: 'declineCall'
            }
        }, {
            flex: 2
        }]
    }]
})
