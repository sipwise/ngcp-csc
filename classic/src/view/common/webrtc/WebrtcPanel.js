Ext.define('NgcpCsc.view.common.webrtc.WebrtcPanel', {
    extend: 'Ext.panel.Panel',

    xtype: 'webrtc',

    controller: 'webrtc',

    viewModel: 'webrtc',

    padding: '0 0 0 1',

    width: 500,
    
    bind: {
        title: '{title}'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function() {
        this.items = [{
            flex: 4,
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'center'
            },
            defaults: {
                cls: 'webrtc-container'
            },
            items: [{
                cls: 'webrtc-avatar-container',
                items: {
                    xtype: 'image',
                    cls: 'webrtc-avatar',
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
                cls: 'webrtc-btns-container',
                layout: {
                    type: 'hbox',
                    align: 'stretch',
                    pack: 'center'
                },
                defaults: {
                    xtype: 'button',
                    cls: 'webrtc-icons',
                    enableToggle: true
                },
                items: [{
                    iconCls: 'x-fa fa-phone',
                    bind: {
                        pressed: '{callEnabled}'
                    }
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
        }, Ext.create('NgcpCsc.view.pages.chat.ChatContainer', {
            flex: 3,
            cls: 'webrtc-chat-tbar',
            bind: {
                hidden: '{!chatEnabled}'
            },
            items: [{
                xtype: 'chat-notifications',
                closable: false,
                scrollable: true,
                cls: 'private-conversation-text',
                deferEmptyText: false,
                store: Ext.create('Ext.data.Store', {
                    model: 'NgcpCsc.model.ChatNotification'
                })
            }]
        })];
        this.callParent();
    }
})
