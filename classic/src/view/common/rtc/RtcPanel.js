Ext.define('NgcpCsc.view.common.rtc.RtcPanel', {
    extend: 'Ext.panel.Panel',

    xtype: 'rtc',

    controller: 'rtc',

    viewModel: 'rtc',

    padding: '0 0 0 1',

    width: '30%',

    closable: true,

    collapseDirection:'left',

    cls:'rtc-panel',

    bind: {
        title: '{title}'
    },

    tools: [ {
        glyph: 'xf065@FontAwesome',
        callback: 'toggleFullscreen',
        bind:{
            hidden:'{!videoEnabled}'
        }
    },{
        type: 'minimize',
        callback: 'minimizeRtcPanel'
    }],

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
            width:'100%',
            reference:'videoObj',
            html:"<video width=100% id=videoTag height=240></video>"
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
                iconCls: Ngcp.csc.icons.phone,
                bind: {
                    pressed: '{callEnabled}'
                },
                handler:'toggleCall'
            }, {
                iconCls: Ngcp.csc.icons.microphone,
                bind: {
                    pressed: '{micEnabled}',
                    disabled: '{!connected}',
                    hidden: '{!micEnabled}'
                },
                handler:'toggleAudioVideo'
            },{
                iconCls: Ngcp.csc.icons.microphonemute,
                bind: {
                    pressed: '{micEnabled}',
                    disabled: '{!connected}',
                    hidden: '{micEnabled}'
                },
                handler:'toggleAudioVideo'
            },  {
                iconCls: Ngcp.csc.icons.video,
                bind: {
                    pressed: '{videoEnabled}',
                    disabled: '{!connected}'
                },
                handler:'toggleAudioVideo'
            }, {
                iconCls: Ngcp.csc.icons.chat,
                bind: {
                    pressed: '{chatEnabled}',
                    disabled: '{!connected}'
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
