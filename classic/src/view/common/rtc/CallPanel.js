Ext.define('NgcpCsc.view.common.rtc.CallPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.call-panel',
    padding: '60 0 0 0',
    bind: {
        hidden: '{!callPanelEnabled}'
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
                        html: '{callActionLabel}' + Ngcp.csc.animations.loading_dots
                    },
                    xtype: 'label'
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
        }, {
            bind: {
                hidden: '{!callAborted}'
            },
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [{
                    bind: {
                        text: Ext.String.format(Ngcp.csc.locales.rtc.call_aborted_by[localStorage.getItem('languageSelected')], '{incomingCaller}')
                    },
                    xtype: 'label',
                    margin: '0 0 20 0'
                }, {
                    bind: {
                        text: Ext.String.format(Ngcp.csc.locales.rtc.abort_reason[localStorage.getItem('languageSelected')], '{abortReason}')
                    },
                    xtype: 'label',
                    margin: '0 0 20 0'
                },
                {
                    xtype: 'button',
                    userCls: 'call-button call-button-close',
                    overCls: 'call-button-close-over',
                    focusCls: 'call-button-close-focus',
                    width: 40,
                    height: 40,
                    html: '<i class="x-fa fa-times call-icon-close"></i>',
                    listeners: {
                        click: 'hideAbortedState'
                    }
                }
            ]
        },
        {
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'

            },
            bind: {
                hidden: '{!incomingCallPending}'
            },
            items: [{
                bind: {
                    html: Ext.String.format(Ngcp.csc.locales.rtc.incoming_call_from[localStorage.getItem('languageSelected')] + Ngcp.csc.animations.loading_dots, '{incomingType}')
                },
                xtype: 'label'
            }, {
                bind: {
                    text: '{incomingCaller}'
                },
                xtype: 'label',
                margin: '0 0 20 0',
                userCls: 'call-number-label'
            }, {
                layout: {
                    type: 'hbox',
                    align: 'center',
                    pack: 'center'
                },
                items: [{
                    xtype: 'button',
                    margin: '0 10 0 0',
                    userCls: 'call-button call-button-accept',
                    overCls: 'call-button-accept-over',
                    focusCls: 'call-button-accept-focus',
                    width: 40,
                    height: 40,
                    html: '<i class="x-fa fa-phone icon-large"></i><i class="x-fa fa-microphone icon-small"></i>',
                    listeners: {
                        click: 'acceptCallAudio'
                    }
                }, {
                    xtype: 'button',
                    margin: '0 10 0 0',
                    userCls: 'call-button call-button-accept',
                    overCls: 'call-button-accept-over',
                    focusCls: 'call-button-accept-focus',
                    width: 40,
                    height: 40,
                    html: '<i class="x-fa fa-phone icon-large"></i><i class="x-fa fa-video-camera icon-small"></i>',
                    listeners: {
                        click: 'acceptCallVideo'
                    }
                }, {
                    xtype: 'button',
                    userCls: 'call-button call-button-cancel call-button-hangup',
                    overCls: 'call-button-cancel-over',
                    focusCls: 'call-button-cancel-focus',
                    width: 40,
                    height: 40,
                    html: '<i class="x-fa fa-phone call-icon-cancel"></i>',
                    listeners: {
                        click: 'declineCall'
                    }
                }]
            }]
        }
    ]
});
