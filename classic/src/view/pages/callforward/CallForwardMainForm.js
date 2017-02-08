Ext.define('NgcpCsc.view.pages.callforward.CallForwardMainForm', {
    extend: 'Ext.form.Panel',

    xtype: 'callforwardmainform',

    defaults: {
        width: '100%'
    },

    fieldDefaults: {
        labelSeparator : ''
    },

    margin: '0 10 0 0',

    defaultType: 'textfield',

    ui: 'cf-mainform',

    initComponent: function() {
        var busyGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardMainGrid', {
            store: Ext.create('NgcpCsc.store.CallForward', {
                storeId: 'CallForwardBusy',
                proxy: {
                    type: 'ajax',
                    url: '/resources/data/callForwardBusy.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            })
        });
        var onlineGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardMainGrid', {
            store: Ext.create('NgcpCsc.store.CallForward', {
                storeId: 'CallForwardOnline',
                proxy: {
                    type: 'ajax',
                    url: '/resources/data/callForwardOnline.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            })
        });
        var offlineGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardMainGrid', {
            store: Ext.create('NgcpCsc.store.CallForward', {
                storeId: 'CallForwardOffline',
                proxy: {
                    type: 'ajax',
                    url: '/resources/data/callForwardOffline.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            })
        });

        this.items = [{
            xtype: 'segmentedbutton',
            itemId: 'timeButtons',
            value: 'always',
            defaults: {
                handler: 'clickSegmentedButton'
            },
            items: [{
                value: 'always',
                id: 'alwaysButton',
                text: Ngcp.csc.locales.callforward.time_one[localStorage.getItem('languageSelected')]
            }, {
                value: 'afterHours',
                id: 'afterHoursButton',
                text: Ngcp.csc.locales.callforward.time_two[localStorage.getItem('languageSelected')],
                iconCls: 'x-fa fa-pencil',
                iconAlign: 'right'
            }, {
                value: 'companyHours',
                id: 'companyHoursButton',
                text: Ngcp.csc.locales.callforward.time_three[localStorage.getItem('languageSelected')],
                iconCls: 'x-fa fa-pencil',
                iconAlign: 'right'
            }]
        }, {
            xtype: 'container',
            userCls: 'cf-formtext',
            html: Ngcp.csc.locales.callforward.for_calling_parties[localStorage.getItem('languageSelected')]
        }, {
            xtype: 'segmentedbutton',
            itemId: 'sourceButtons',
            value: 'everybody',
            defaults: {
                handler: 'clickSegmentedButton'
            },
            ui: 'cf-segmentedbutton',
            items: [{
                value: 'everybody',
                id: 'everybodyButton',
                text: Ngcp.csc.locales.callforward.source_one[localStorage.getItem('languageSelected')]
            }, {
                value: 'listA',
                id: 'listAButton',
                text: Ngcp.csc.locales.callforward.source_two[localStorage.getItem('languageSelected')],
                iconCls: 'x-fa fa-pencil',
                iconAlign: 'right'
            }, {
                value: 'listB',
                id: 'listBButton',
                text: Ngcp.csc.locales.callforward.source_three[localStorage.getItem('languageSelected')],
                iconCls: 'x-fa fa-pencil',
                iconAlign: 'right'
            }]
        }, {
            xtype: 'container',
            userCls: 'cf-formtext cf-subheader',
            html: Ngcp.csc.locales.callforward.when_phone_online[localStorage.getItem('languageSelected')]
        }, {
            xtype: 'panel',
            layout: 'hbox',
            id: 'onlineFirstRingFields',
            padding: '0 11 0 0',
            margin: '0 0 0 50',
            items: [{
                xtype: 'combo',
                store: ['Own phone', 'Voicemail', 'Fax2Mail', 'None'],
                id: 'onlineFirstDest',
                fieldLabel: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
                value: 'Own phone',
                allowBlank: false,
                editable: false,
                listeners: {
                    change: 'selectFirstRing'
                },
                flex: 8
            }, {
                xtype: 'combo',
                store: ['for 10 secs', 'for 20 secs', 'for 30 secs', 'for 40 secs', 'for 50 secs', 'for 60 secs'],
                value: 'for 10 secs',
                id: 'onlineFirstTimeout',
                allowBlank: false,
                editable: false,
                flex: 2,
                margin: '0 0 0 10',
                bind: {
                    hidden: '{online_timeout_hidden}'
                }
            }]
        }, {
            xtype: 'container',
            layout: 'hbox',
            margin: '10 0 0 50',
            items: [{
                xtype: 'container',
                html: Ngcp.csc.locales.callforward.then_forward_to[localStorage.getItem('languageSelected')],
                userCls: 'cf-formtext'
            },
                onlineGrid
            ]
        }, {
            html: Ngcp.csc.locales.callforward.add_new_destination[localStorage.getItem('languageSelected')],
            xtype: 'button',
            id: 'onlineButton',
            width: 165,
            margin: '15 0 0 0',
            listeners: {
                element: 'el',
                click: 'addEmptyRow'
            }
        }, {
            xtype: 'container',
            userCls: 'cf-formtext cf-subheader',
            html: Ngcp.csc.locales.callforward.when_phone_busy[localStorage.getItem('languageSelected')]
        }, {
            xtype: 'panel',
            layout: 'hbox',
            id: 'busyFirstRingFields',
            padding: '0 11 0 0',
            margin: '0 0 0 50',
            items: [{
                xtype: 'combo',
                store: ['Own phone', 'Voicemail', 'Fax2Mail', 'None'],
                id: 'busyFirstDest',
                fieldLabel: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
                value: 'None',
                allowBlank: false,
                editable: false,
                listeners: {
                    change: 'selectFirstRing'
                },
                flex: 8
            }, {
                xtype: 'combo',
                store: ['for 10 secs', 'for 20 secs', 'for 30 secs', 'for 40 secs', 'for 50 secs', 'for 60 secs'],
                value: 'for 10 secs',
                id: 'busyFirstTimeout',
                allowBlank: false,
                editable: false,
                flex: 2,
                margin: '0 0 0 10',
                bind: {
                    hidden: '{busy_timeout_hidden}'
                }
            }]
        }, {
            xtype: 'container',
            layout: 'hbox',
            margin: '10 0 0 50',
            items: [{
                xtype: 'container',
                html: Ngcp.csc.locales.callforward.then_forward_to[localStorage.getItem('languageSelected')],
                userCls: 'cf-formtext'
            },
                busyGrid
            ]
        }, {
            html: Ngcp.csc.locales.callforward.add_new_destination[localStorage.getItem('languageSelected')],
            xtype: 'button',
            id: 'busyButton',
            width: 165,
            margin: '15 0 0 0',
            listeners: {
                element: 'el',
                click: 'addEmptyRow'
            }
        }, {
            xtype: 'container',
            userCls: 'cf-formtext cf-subheader',
            html: Ngcp.csc.locales.callforward.when_phone_offline[localStorage.getItem('languageSelected')]
        }, {
            xtype: 'panel',
            layout: 'hbox',
            id: 'offlineFirstRingFields',
            padding: '0 11 0 0',
            margin: '0 0 0 50',
            items: [{
                xtype: 'combo',
                store: ['Own phone', 'Voicemail', 'Fax2Mail', 'None'],
                id: 'offlineFirstDest',
                fieldLabel: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
                value: 'None',
                allowBlank: false,
                editable: false,
                listeners: {
                    change: 'selectFirstRing'
                },
                flex: 8
            }, {
                xtype: 'combo',
                store: ['for 10 secs', 'for 20 secs', 'for 30 secs', 'for 40 secs', 'for 50 secs', 'for 60 secs'],
                value: 'for 10 secs',
                id: 'offlineFirstTimeout',
                allowBlank: false,
                editable: false,
                flex: 2,
                margin: '0 0 0 10',
                bind: {
                    hidden: '{offline_timeout_hidden}'
                }
            }]
        }, {
            xtype: 'container',
            layout: 'hbox',
            margin: '10 0 0 50',
            items: [{
                xtype: 'container',
                html: Ngcp.csc.locales.callforward.then_forward_to[localStorage.getItem('languageSelected')],
                userCls: 'cf-formtext'
            },
                offlineGrid
            ]
        }, {
            html: Ngcp.csc.locales.callforward.add_new_destination[localStorage.getItem('languageSelected')],
            xtype: 'button',
            id: 'offlineButton',
            width: 165,
            margin: '15 0 0 0',
            listeners: {
                element: 'el',
                click: 'addEmptyRow'
            }
        }];

        this.callParent();
    }

});
