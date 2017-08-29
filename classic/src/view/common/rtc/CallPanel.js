Ext.define('NgcpCsc.view.common.rtc.CallPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.call-panel',
    padding: '60 0 0 0',
    bind: {
        hidden: '{!callEnabled}'
    },
    items: [{
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'

            },
            bind: {
                hidden: '{!outgoingCall}'
            },
            items: [{
                    bind: {
                        text: '{callActionLabel}'
                    },
                    xtype: 'label',
                    margin: '0 0 20 0'
                },
                {
                    bind: {
                        text: '{numberToCall}'
                    },
                    xtype: 'label',
                    margin: '0 0 20 0',
                    userCls: 'call-number-label'
                },
                {
                    xtype: 'button',
                    text: '',
                    userCls: 'call-button call-button-cancel call-button-hangup',
                    overCls: 'call-button-cancel-over',
                    focusCls: 'call-button-cancel-focus',
                    width: 40,
                    height: 40,
                    html: '<i class="x-fa fa-phone call-icon-cancel"></i>',
                    listeners: {
                        click: 'cancelOutgoingCall'
                    }
                }
            ]
        },
        {
            bind: {
                hidden: '{!callAborted}'
            },
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [{
                userCls: 'rtc-aborted-label',
                margin: '10 0 0 0',
                bind: {
                    html: Ext.String.format(Ngcp.csc.locales.rtc.call_aborted_by[localStorage.getItem('languageSelected')], '{incomingCaller}') // TODO Locales
                }
            }, {
                userCls: 'rtc-aborted-label',
                margin: '0 0 10 0',
                bind: {
                    html: Ext.String.format(Ngcp.csc.locales.rtc.abort_reason[localStorage.getItem('languageSelected')], '{abortReason}') // TODO Locales
                }
            }, {
                xtype: 'button',
                iconCls: Ngcp.csc.icons.close2x,
                tooltip: Ngcp.csc.locales.rtc.close[localStorage.getItem('languageSelected')],
                userCls: 'rtc-close-call',
                pressedCls: 'rtc-close-call-pressed',
                listeners: {
                    click: 'closeRtcPanel'
                }
            }]

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
