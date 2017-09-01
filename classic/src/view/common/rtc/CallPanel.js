Ext.define('NgcpCsc.view.common.rtc.CallPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.call-panel',
    padding: '60 0 0 0',
    bind: {
        hidden: true
    },
    items: [{
            reference: 'outgoingCallState',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            hidden: true,
            items: [{
                    reference: 'outgoingCallLabel',
                    xtype: 'label',
                    hidden: false
                },
                {
                    reference: 'outgoingCallPeer',
                    xtype: 'label',
                    margin: '0 0 20 0',
                    userCls: 'call-number-label',
                    hidden: false
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
                    },
                    hidden: false
                }
            ]
        }, {
            reference: 'callAbortedState',
            hidden: true,
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [{
                    reference: 'callAbortedPeer',
                    xtype: 'label',
                    margin: '0 0 20 0'
                }, {
                    reference: 'callAbortedReason',
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
            reference: 'incomingCallState',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'

            },
            hidden: true,
            items: [{
                reference: 'callIncomingType',
                xtype: 'label'
            }, {
                reference: 'callIncomingPeer',
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
