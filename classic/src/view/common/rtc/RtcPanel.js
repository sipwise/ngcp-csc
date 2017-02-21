Ext.define('NgcpCsc.view.common.rtc.RtcPanel', {
    extend: 'Ext.panel.Panel',

    xtype: 'rtc',

    controller: 'rtc',

    viewModel: 'rtc',

    padding: '0 0 0 1',

    width: '30%',

    closable: true,

    resizble: true,

    bind: {
        title: '{title}'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        beforeclose: 'onBeforeClose'
    },

    items: [{
        flex: 4,
        reference: 'callpanel',
        bind: {
            hidden: '{callPanelHidden}'
        },
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'center'
        },
        defaults: {
            cls: 'rtc-container'
        },
        items: [
        {
            margin:20,
            hidden:true,
            reference:'videoObj',
            html:"<video width=100% height=240 controls></video>"
        },{
            cls: 'rtc-avatar-container',
            reference:'avatar',
            items: {
                xtype: 'image',
                cls: 'rtc-avatar',
                bind: {
                    src: '{thumbnail}'
                }
            }
        }, {
            xtype: 'label',
            margin: '20 0 20 0',
            bind: '{status}'
        }, {
            xtype: 'container',
            cls: 'rtc-btns-container',
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'center'
            },
            defaults: {
                xtype: 'button',
                cls: 'rtc-icons',
                enableToggle: true
            },
            items: [{
                iconCls: 'x-fa fa-phone',
                bind: {
                    pressed: '{callEnabled}'
                },
                handler:'endCall'
            }, {
                iconCls: 'x-fa fa-microphone',
                bind: {
                    pressed: '{micEnabled}'
                }
            }, {
                iconCls: 'x-fa fa-video-camera',
                bind: {
                    pressed: '{videoEnabled}'
                }
            }, {
                iconCls: 'x-fa fa-wechat',
                bind: {
                    pressed: '{chatEnabled}'
                },
                handler: 'toogleChat'
            }]
        }]
    }, {
        xtype: 'phone-composer'
    }, {
        xtype: 'sms-composer'
    }, {
        xtype: 'fax-composer'
    }]
})
