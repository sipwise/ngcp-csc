Ext.define('NgcpCsc.view.common.rtc.CallPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.call-panel',
    hidden: true,
    items: [{
            reference: 'outgoingCallState',
            padding: '40 0 0 0',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            hidden: true,
            items: [{
                    reference: 'outgoingCallLabel',
                    xtype: 'label'
                },
                {
                    reference: 'outgoingCallPeer',
                    xtype: 'label',
                    margin: '0 0 20 0',
                    userCls: 'call-number-label',
                },{
                    reference: 'outgoingCallMedia',
                    hidden: true,
                    padding: '0 0 20 0',
                    width: '100%',
                    html: '<video id="outgoing-call-media" autoplay style="width: 100%"></video>'
                },{
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
            padding: '40 0 0 0',
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
            padding: '40 0 0 0',
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
        },{
            reference: 'acceptedCallState',
            padding: '0 0 0 0',
            hidden: true,
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [{
                    reference: 'acceptedRemoteMedia',
                    hidden: true,
                    padding: '0 0 0 0',
                    width: '100%',
                    html: '<video id="accepted-remote-media" autoplay style="width: 100%"></video>'
                }, {
                    reference: 'acceptedLocalMedia',
                    hidden: true,
                    padding: '20 0 20 0',
                    width: '33%',
                    html: '<video id="accepted-local-media" autoplay style="width: 100%"></video>'
                },{
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
                        html: '<i class="x-fa fa-microphone icon-normal"></i></i>',
                        listeners: {
                        }
                    }, {
                        xtype: 'button',
                        margin: '0 10 0 0',
                        userCls: 'call-button call-button-accept',
                        overCls: 'call-button-accept-over',
                        focusCls: 'call-button-accept-focus',
                        width: 40,
                        height: 40,
                        html: '<i class="x-fa fa-video-camera icon-normal"></i></i>',
                        listeners: {
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
                        }
                    }]
                }
            ]
        }
    ]
});
