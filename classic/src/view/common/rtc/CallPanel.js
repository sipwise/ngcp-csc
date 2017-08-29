Ext.define('NgcpCsc.view.common.rtc.CallPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.call-panel',
    layout: 'center',
    bind: {
        hidden: '{!callPanel}'
    },
    items: [{
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
                hidden: '{!outgoingCallPending}'
            },
            xtype: 'label',
            text: 'Start call ...'
        }
    ]
});
