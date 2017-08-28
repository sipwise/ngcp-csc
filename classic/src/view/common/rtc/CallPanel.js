Ext.define('NgcpCsc.view.common.rtc.CallPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.call-panel',
    layout: 'center',
    bind: {
        hidden: '{!callPanel}'
    },
    items: [{
            bind: {
                hidden: '{!outgoingCallPending}'
            },
            xtype: 'label',
            userCls: 'rtc-outgoing-label',
            html: Ngcp.csc.locales.rtc.start_call[localStorage.getItem('languageSelected')] + Ngcp.csc.animations.loading_dots
        },
        {
            bind: {
                hidden: '{!incomingCallPending}'
            },
            items: [{
                userCls: 'rtc-incoming-label',
                height: 50,
                bind: {
                    html: Ext.String.format(Ngcp.csc.locales.rtc.incoming_call_from[localStorage.getItem('languageSelected')] + Ngcp.csc.animations.loading_dots, '{incomingType}')
                }
            }, {
                userCls: 'rtc-incoming-number',
                height: 40,
                bind: {
                    html: '{incomingCaller}'
                }
            }, {
                xtype: 'button',
                iconCls: Ngcp.csc.icons.phone2x,
                width: 50,
                height: 50,
                userCls: 'rtc-button-margin',
                listeners: {
                    click: 'acceptCallAudio'
                }
            }, {
                xtype: 'button',
                iconCls: Ngcp.csc.icons.video2x,
                width: 50,
                height: 50,
                userCls: 'rtc-button-margin',
                listeners: {
                    click: 'acceptCallVideo'
                }
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
            }]
        }
    ]
});
