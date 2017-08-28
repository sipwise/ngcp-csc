Ext.define('NgcpCsc.view.common.call.IncomingCall', {
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
        margin: '20 0 10 0',
        items: [{
            userCls: 'rtc-incoming-label-section',
            height: 50,
            bind: {
                html: '<p class="rtc-incoming-label">' + Ext.String.format(Ngcp.csc.locales.rtc.incoming_call_from[localStorage.getItem('languageSelected')] + '<span>.</span><span>.</span><span>.</span></p>', '{incoming_call_type}')
            }
        }, {
            userCls: 'rtc-incoming-number',
            height: 40,
            bind: {
                html: '{incoming_caller}'
            }
        }]
    }, {
        xtype: 'container',
        layout: {
            type: 'hbox',
            align: 'center'
        },
        items: [{
            flex: 2
        }, {
            xtype: 'button',
            iconCls: Ngcp.csc.icons.phone2x,
            width: 50,
            height: 50,
            listeners: {
                click: 'acceptCallAudio' // TODO
            }
        }, {
            flex: 2
        }, {
            xtype: 'button',
            iconCls: Ngcp.csc.icons.video2x,
            width: 50,
            height: 50,
            listeners: {
                click: 'acceptCallVideo' // TODO
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
                click: 'declineCall' // TODO
            }
        }, {
            flex: 2
        }]
    }]
})
