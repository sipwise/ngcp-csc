Ext.define('NgcpCsc.view.pages.callforward.afterhours.AfterHoursMainForm', {
    extend: 'Ext.form.Panel',

    xtype: 'afterhoursmainform',

    defaults: {
        width: '100%'
    },

    fieldDefaults: {
        labelSeparator: ''
    },

    margin: '0 10 0 0',

    defaultType: 'textfield',

    ui: 'cf-mainform',

    _prefix: null,

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
                xtype: 'container',
                userCls: 'cf-text cf-subheader',
                html: Ngcp.csc.locales.callforward.when_phone_online[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'panel',
                layout: 'hbox',
                id: this._prefix + 'afterhours-onlineFirstRingFields',
                padding: '0 11 0 0',
                width: 500,
                margin: '0 0 0 50',
                items: [{
                    xtype: 'combo',
                    store: ['Own phone', 'Voicemail', 'Fax2Mail', 'None'],
                    id: this._prefix + 'afterhours-onlineFirstDest',
                    fieldLabel: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
                    value: 'Own phone',
                    allowBlank: false,
                    editable: false,
                    listeners: {
                        change: 'selectFirstRing'
                    },
                    flex: 4
                }, {
                    xtype: 'combo',
                    store: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260', '270', '280', '290', '300'],
                    value: '10',
                    id: this._prefix + 'afterhours-onlineFirstTimeout',
                    allowBlank: false,
                    editable: false,
                    flex: 3,
                    margin: '0 0 0 10',
                    bind: {
                        hidden: '{online_first_timeout_hidden}'
                    },
                    fieldLabel: Ngcp.csc.locales.callforward.and_ring_for[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'container',
                    html: Ngcp.csc.locales.callforward.secs[localStorage.getItem('languageSelected')],
                    padding: '7 0 0 20',
                    flex: 1,
                    bind: {
                        hidden: '{online_first_timeout_hidden}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 0 50',
                items: [{
                        xtype: 'container',
                        html: Ngcp.csc.locales.callforward.then_forward_to[localStorage.getItem('languageSelected')],
                        userCls: 'cf-thentext'
                    },
                    onlineGrid
                ]
            }, {
                xtype: 'panel',
                margin: '10 7 0 155',
                bind: {
                    hidden: '{online_add_new_then_hidden}'
                },
                id: this._prefix + 'afterhours-onlineThenRingFields',
                layout: 'hbox',
                items: [{
                    xtype: 'combo',
                    store: ['Number', 'Voicemail', 'Fax2Mail'],
                    id: this._prefix + 'afterhours-onlineThenDest',
                    bind: '{online_then_dest}',
                    allowBlank: false,
                    editable: false,
                    flex: 2,
                    margin: '0 10 0 0',
                    listeners: {
                        change: 'selectThenRing'
                    }
                }, {
                    xtype: 'textfield',
                    flex: 2,
                    id: this._prefix + 'afterhours-onlineThenNumber',
                    emptyText: Ngcp.csc.locales.callforward.enter_number[localStorage.getItem('languageSelected')],
                    bind: {
                        hidden: '{online_then_timeout_hidden}',
                        value: '{online_then_number}'
                    },
                    listeners: {
                        specialkey: 'onEnterPressed'
                    }
                }, {
                    xtype: 'combo',
                    store: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260', '270', '280', '290', '300'],
                    fieldLabel: Ngcp.csc.locales.callforward.and_ring_for[localStorage.getItem('languageSelected')],
                    id: this._prefix + 'afterhours-onlineThenTimeout',
                    bind: {
                        value: '{online_then_timeout}',
                        hidden: '{online_then_timeout_hidden}'
                    },
                    allowBlank: false,
                    editable: false,
                    flex: 3,
                    margin: '0 0 0 10'
                }, {
                    xtype: 'container',
                    html: Ngcp.csc.locales.callforward.secs[localStorage.getItem('languageSelected')],
                    padding: '7 0 0 20',
                    flex: 1,
                    bind: {
                        hidden: '{online_then_timeout_hidden}'
                    }
                }, {
                    xtype: 'button',
                    text: Ngcp.csc.locales.common.save_caps[localStorage.getItem('languageSelected')],
                    id: this._prefix + 'afterhours-onlineSaveButton',
                    width: 100,
                    listeners: {
                        click: 'addNewDestination'
                    }
                }]
            }, {
                html: Ngcp.csc.locales.callforward.add_new_destination[localStorage.getItem('languageSelected')],
                xtype: 'button',
                id: this._prefix + 'afterhours-onlineButton',
                width: 165,
                margin: '15 0 0 0',
                listeners: {
                    click: 'showNewDestinationForm'
                }
            }, {
                xtype: 'container',
                userCls: 'cf-text cf-subheader',
                html: Ngcp.csc.locales.callforward.when_phone_busy[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'panel',
                layout: 'hbox',
                id: this._prefix + 'afterhours-busyFirstRingFields',
                padding: '0 11 0 0',
                margin: '0 0 0 50',
                width: 500,
                items: [{
                    xtype: 'combo',
                    store: ['Own phone', 'Voicemail', 'Fax2Mail', 'None'],
                    id: this._prefix + 'afterhours-busyFirstDest',
                    fieldLabel: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
                    value: 'None',
                    allowBlank: false,
                    editable: false,
                    listeners: {
                        change: 'selectFirstRing'
                    },
                    flex: 4
                }, {
                    xtype: 'combo',
                    store: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260', '270', '280', '290', '300'],
                    value: '10',
                    id: this._prefix + 'afterhours-busyFirstTimeout',
                    allowBlank: false,
                    editable: false,
                    flex: 3,
                    margin: '0 0 0 10',
                    bind: {
                        hidden: '{busy_first_timeout_hidden}'
                    },
                    fieldLabel: Ngcp.csc.locales.callforward.and_ring_for[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'container',
                    html: Ngcp.csc.locales.callforward.secs[localStorage.getItem('languageSelected')],
                    padding: '7 0 0 20',
                    flex: 1,
                    bind: {
                        hidden: '{busy_first_timeout_hidden}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 0 50',
                items: [{
                        xtype: 'container',
                        html: Ngcp.csc.locales.callforward.then_forward_to[localStorage.getItem('languageSelected')],
                        userCls: 'cf-thentext'
                    },
                    busyGrid
                ]
            }, {
                xtype: 'panel',
                margin: '10 7 0 155',
                bind: {
                    hidden: '{busy_add_new_then_hidden}'
                },
                id: this._prefix + 'afterhours-busyThenRingFields',
                layout: 'hbox',
                height: 31,
                items: [{
                    xtype: 'combo',
                    store: ['Number', 'Voicemail', 'Fax2Mail'],
                    id: this._prefix + 'afterhours-busyThenDest',
                    bind: '{busy_then_dest}',
                    allowBlank: false,
                    editable: false,
                    flex: 2,
                    margin: '0 10 0 0',
                    listeners: {
                        change: 'selectThenRing'
                    }
                }, {
                    xtype: 'textfield',
                    flex: 2,
                    id: this._prefix + 'afterhours-busyThenNumber',
                    emptyText: Ngcp.csc.locales.callforward.enter_number[localStorage.getItem('languageSelected')],
                    bind: {
                        hidden: '{busy_then_timeout_hidden}',
                        value: '{busy_then_number}'
                    }
                }, {
                    xtype: 'combo',
                    store: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260', '270', '280', '290', '300'],
                    fieldLabel: Ngcp.csc.locales.callforward.and_ring_for[localStorage.getItem('languageSelected')],
                    id: this._prefix + 'afterhours-busyThenTimeout',
                    bind: {
                        value: '{busy_then_timeout}',
                        hidden: '{busy_then_timeout_hidden}'
                    },
                    allowBlank: false,
                    editable: false,
                    flex: 3,
                    margin: '0 0 0 10'
                }, {
                    xtype: 'container',
                    html: Ngcp.csc.locales.callforward.secs[localStorage.getItem('languageSelected')],
                    padding: '7 0 0 20',
                    flex: 1,
                    bind: {
                        hidden: '{online_then_timeout_hidden}'
                    }
                }, {
                    xtype: 'button',
                    text: Ngcp.csc.locales.common.save_caps[localStorage.getItem('languageSelected')],
                    id: this._prefix + 'afterhours-busySaveButton',
                    width: 100,
                    listeners: {
                        click: 'addNewDestination'
                    }
                }]
            }, {
                html: Ngcp.csc.locales.callforward.add_new_destination[localStorage.getItem('languageSelected')],
                xtype: 'button',
                id: this._prefix + 'afterhours-busyButton',
                width: 165,
                margin: '15 0 0 0',
                listeners: {
                    click: 'showNewDestinationForm'
                }
            }, {
                xtype: 'container',
                userCls: 'cf-text cf-subheader',
                html: Ngcp.csc.locales.callforward.when_phone_offline[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'panel',
                layout: 'hbox',
                id: this._prefix + 'afterhours-offlineFirstRingFields',
                padding: '0 11 0 0',
                margin: '0 0 0 50',
                width: 500,
                items: [{
                    xtype: 'combo',
                    store: ['Own phone', 'Voicemail', 'Fax2Mail', 'None'],
                    id: this._prefix + 'afterhours-offlineFirstDest',
                    fieldLabel: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
                    value: 'None',
                    allowBlank: false,
                    editable: false,
                    listeners: {
                        change: 'selectFirstRing'
                    },
                    flex: 4
                }, {
                    xtype: 'combo',
                    store: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260', '270', '280', '290', '300'],
                    value: '10',
                    id: this._prefix + 'afterhours-offlineFirstTimeout',
                    allowBlank: false,
                    editable: false,
                    flex: 3,
                    margin: '0 0 0 10',
                    bind: {
                        hidden: '{offline_first_timeout_hidden}'
                    },
                    fieldLabel: Ngcp.csc.locales.callforward.and_ring_for[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'container',
                    html: Ngcp.csc.locales.callforward.secs[localStorage.getItem('languageSelected')],
                    padding: '7 0 0 20',
                    flex: 1,
                    bind: {
                        hidden: '{offline_first_timeout_hidden}'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 0 50',
                items: [{
                        xtype: 'container',
                        html: Ngcp.csc.locales.callforward.then_forward_to[localStorage.getItem('languageSelected')],
                        userCls: 'cf-thentext'
                    },
                    offlineGrid
                ]
            }, {
                xtype: 'panel',
                margin: '10 7 0 155',
                bind: {
                    hidden: '{offline_add_new_then_hidden}'
                },
                id: this._prefix + 'afterhours-offlineThenRingFields',
                layout: 'hbox',
                items: [{
                    xtype: 'combo',
                    store: ['Number', 'Voicemail', 'Fax2Mail'],
                    id: this._prefix + 'afterhours-offlineThenDest',
                    bind: '{offline_then_dest}',
                    allowBlank: false,
                    editable: false,
                    flex: 2,
                    margin: '0 10 0 0',
                    listeners: {
                        change: 'selectThenRing'
                    }
                }, {
                    xtype: 'textfield',
                    flex: 2,
                    id: this._prefix + 'afterhours-offlineThenNumber',
                    emptyText: Ngcp.csc.locales.callforward.enter_number[localStorage.getItem('languageSelected')],
                    bind: {
                        hidden: '{offline_then_timeout_hidden}',
                        value: '{offline_then_number}'
                    }
                }, {
                    xtype: 'combo',
                    store: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260', '270', '280', '290', '300'],
                    fieldLabel: Ngcp.csc.locales.callforward.and_ring_for[localStorage.getItem('languageSelected')],
                    id: this._prefix + 'afterhours-offlineThenTimeout',
                    bind: {
                        value: '{offline_then_timeout}',
                        hidden: '{offline_then_timeout_hidden}'
                    },
                    allowBlank: false,
                    editable: false,
                    flex: 3,
                    margin: '0 0 0 10'
                }, {
                    xtype: 'container',
                    html: Ngcp.csc.locales.callforward.secs[localStorage.getItem('languageSelected')],
                    padding: '7 0 0 20',
                    flex: 1,
                    bind: {
                        hidden: '{offline_then_timeout_hidden}'
                    }
                }, {
                    xtype: 'button',
                    text: Ngcp.csc.locales.common.save_caps[localStorage.getItem('languageSelected')],
                    id: this._prefix + 'afterhours-offlineSaveButton',
                    width: 100,
                    listeners: {
                        click: 'addNewDestination'
                    }
                }]
            }, {
                html: Ngcp.csc.locales.callforward.add_new_destination[localStorage.getItem('languageSelected')],
                xtype: 'button',
                id: this._prefix + 'afterhours-offlineButton',
                width: 165,
                margin: '15 0 0 0',
                listeners: {
                    click: 'showNewDestinationForm'
                }
        }];

        this.callParent();
    }

});
