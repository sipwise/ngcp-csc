Ext.define('NgcpCsc.view.pages.callforward.CallForwardMainForm', {
    extend: 'Ext.form.Panel',

    xtype: 'callforwardmainform',

    defaults: {
        width: '100%'
    },

    fieldDefaults: {
        labelAlign: 'top'
    },

    defaultType: 'textfield',

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
            value: 'alwaysButton',
            items: [{
                value: 'alwaysButton',
                id: 'alwaysButton',
                text: Ngcp.csc.locales.callforward.time_one[localStorage.getItem('languageSelected')],
                listeners: {
                    element: 'el',
                    click: 'clickTimesetButton'
                }
            }, {
                id: 'afterHoursButton',
                text: Ngcp.csc.locales.callforward.time_two[localStorage.getItem('languageSelected')],
                listeners: {
                    element: 'el',
                    click: 'clickTimesetButton'
                }
            }, {
                id: 'companyHoursButton',
                text: Ngcp.csc.locales.callforward.time_three[localStorage.getItem('languageSelected')],
                listeners: {
                    element: 'el',
                    click: 'clickTimesetButton'
                }
            }]
        }, {
            xtype: 'segmentedbutton',
            itemId: 'sourceButtons',
            value: 'everybodyButton',
            items: [{
                value: 'everybodyButton',
                text: Ngcp.csc.locales.callforward.source_one[localStorage.getItem('languageSelected')]
            }, {
                text: Ngcp.csc.locales.callforward.source_two[localStorage.getItem('languageSelected')]
            }, {
                text: Ngcp.csc.locales.callforward.source_three[localStorage.getItem('languageSelected')]
            }]
        }, {
            xtype: 'panel',
            userCls: 'cf-subheader-large',
            html: Ngcp.csc.locales.callforward.when_phone_online[localStorage.getItem('languageSelected')] + '<hr>',
            height: 50,
            ui: 'cf-container',
            margin: '0 0 10 0'
        }, {
            xtype: 'container',
            userCls: 'cf-subheader',
            html: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
            height: 25
        }, {
            xtype: 'panel',
            layout: 'hbox',
            id: 'onlineFirstRingFields',
            height: 50,
            padding: '0 11 0 0',
            items: [{
                xtype: 'combo',
                store: ['Own phone', 'Voicemail', 'Fax2Mail', 'None'],
                id: 'onlineFirstDest',
                value: 'Own phone',
                allowBlank: false,
                editable: false,
                listeners: {
                    change: 'selectFirstRing'
                },
                flex: 5
            }, {
                xtype: 'combo',
                store: ['for 10 secs', 'for 20 secs', 'for 30 secs', 'for 40 secs', 'for 50 secs', 'for 60 secs'],
                value: 'for 10 secs',
                id: 'onlineFirstTimeout',
                allowBlank: false,
                editable: false,
                flex: 1,
                bind: {
                    hidden: '{online_timeout_hidden}'
                }
            }]
        }, {
            xtype: 'container',
            html: Ngcp.csc.locales.callforward.then_forward_to[localStorage.getItem('languageSelected')],
            userCls: 'cf-subheader'
        },
            onlineGrid,
        {
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
            xtype: 'panel',
            userCls: 'cf-subheader-large',
            html: Ngcp.csc.locales.callforward.when_phone_busy[localStorage.getItem('languageSelected')] + '<hr>',
            height: 50,
            ui: 'cf-container',
            margin: '0 0 10 0'
        }, {
            xtype: 'container',
            userCls: 'cf-subheader',
            html: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
            height: 25
        }, {
            xtype: 'panel',
            layout: 'hbox',
            id: 'busyFirstRingFields',
            height: 50,
            padding: '0 11 0 0',
            items: [{
                xtype: 'combo',
                store: ['Own phone', 'Voicemail', 'Fax2Mail', 'None'],
                id: 'busyFirstDest',
                value: 'None',
                allowBlank: false,
                editable: false,
                listeners: {
                    change: 'selectFirstRing'
                },
                flex: 5
            }, {
                xtype: 'combo',
                store: ['for 10 secs', 'for 20 secs', 'for 30 secs', 'for 40 secs', 'for 50 secs', 'for 60 secs'],
                value: 'for 10 secs',
                id: 'busyFirstTimeout',
                allowBlank: false,
                editable: false,
                flex: 1,
                bind: {
                    hidden: '{busy_timeout_hidden}'
                }
            }]
        }, {
            xtype: 'container',
            html: Ngcp.csc.locales.callforward.then_forward_to[localStorage.getItem('languageSelected')],
            userCls: 'cf-subheader'
        },
            busyGrid,
        {
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
            xtype: 'panel',
            userCls: 'cf-subheader-large',
            html: Ngcp.csc.locales.callforward.when_phone_offline[localStorage.getItem('languageSelected')] + '<hr>',
            height: 50,
            ui: 'cf-container',
            margin: '0 0 10 0'
        }, {
            xtype: 'container',
            userCls: 'cf-subheader',
            html: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
            height: 25
        }, {
            xtype: 'panel',
            layout: 'hbox',
            id: 'offlineFirstRingFields',
            height: 50,
            padding: '0 11 0 0',
            items: [{
                xtype: 'combo',
                store: ['Own phone', 'Voicemail', 'Fax2Mail', 'None'],
                id: 'offlineFirstDest',
                value: 'None',
                allowBlank: false,
                editable: false,
                listeners: {
                    change: 'selectFirstRing'
                },
                flex: 5
            }, {
                xtype: 'combo',
                store: ['for 10 secs', 'for 20 secs', 'for 30 secs', 'for 40 secs', 'for 50 secs', 'for 60 secs'],
                value: 'for 10 secs',
                id: 'offlineFirstTimeout',
                allowBlank: false,
                editable: false,
                flex: 1,
                bind: {
                    hidden: '{offline_timeout_hidden}'
                }
            }]
        }, {
            xtype: 'container',
            html: Ngcp.csc.locales.callforward.then_forward_to[localStorage.getItem('languageSelected')],
            userCls: 'cf-subheader'
        },
            offlineGrid,
        {
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
