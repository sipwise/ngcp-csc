Ext.define('NgcpCsc.view.pages.callforward.CallForwardMainForm', {
    extend: 'Ext.form.Panel',

    defaults: {
        width: '100%'
    },

    fieldDefaults: {
        labelSeparator: ''
    },

    margin: '0 10 0 0',

    defaultType: 'textfield',

    ui: 'cf-mainform',

    initComponent: function() {
        var callForwardListAGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardSourcesetGrid', {
            id: this._firstprefix + this._secondprefix + 'cf-sourceset-list-a-grid',
            bind: {
                hidden: '{list_a}'
            },
            store: Ext.create('NgcpCsc.store.CallForwardSourceset', {
                proxy: {
                    type: 'ajax',
                    url: '/resources/data/callForwardListA.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            })
        });
        var callForwardListBGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardSourcesetGrid', {
            id: this._firstprefix + this._secondprefix + 'cf-sourceset-list-b-grid',
            bind: {
                hidden: '{list_b}'
            },
            store: Ext.create('NgcpCsc.store.CallForwardSourceset', {
                proxy: {
                    type: 'ajax',
                    url: '/resources/data/callForwardListB.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            })
        });
        var busyGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardMainGrid', {
            store: Ext.create('NgcpCsc.store.CallForward', {
                storeId: this._firstprefix + this._secondprefix + 'CallForwardBusy',
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
                storeId: this._firstprefix + this._secondprefix + 'CallForwardOnline',
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
                storeId: this._firstprefix + this._secondprefix + 'CallForwardOffline',
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
            xtype: 'form',
            layout: 'hbox',
            bind: {
                hidden: '{hide_lista_titleField}'
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: Ngcp.csc.locales.callforward.sourceset_title[localStorage.getItem('languageSelected')],
                flex: 1,
                bind: '{source_lista_title}'
            }, {
                xtype: 'button',
                html: Ngcp.csc.locales.common.save_caps[localStorage.getItem('languageSelected')],
                id: this._firstprefix + this._secondprefix + 'lista_titleField-saveButton',
                margin: '0 0 0 10',
                handler: 'saveNewTitle'
            }]
        },
                callForwardListAGrid,
            {
                xtype: 'panel',
                layout: 'hbox',
                margin: '15 0 0 0',
                bind: {
                    hidden: '{list_a}'
                },
                items: [{
                    text: Ngcp.csc.locales.callforward.add_new_source[localStorage.getItem('languageSelected')],
                    xtype: 'button',
                    id: this._firstprefix + this._secondprefix + 'addListAButton',
                    width: 135,
                    margin: '0 0 0 500',
                    listeners: {
                        click: 'addEmptyRow'
                    }
                }, {
                    xtype: 'button',
                    html: Ngcp.csc.locales.callforward.change_title[localStorage.getItem('languageSelected')],
                    id: this._firstprefix + this._secondprefix + 'lista_titleField-showButton',
                    margin: '0 0 0 10',
                    handler: 'toggleChangeTitle'
                }]
        }, {
            xtype: 'form',
            layout: 'hbox',
            bind: {
                hidden: '{hide_listb_titleField}'
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: Ngcp.csc.locales.callforward.sourceset_title[localStorage.getItem('languageSelected')],
                flex: 1,
                bind: '{source_listb_title}'
            }, {
                xtype: 'button',
                html: Ngcp.csc.locales.common.save_caps[localStorage.getItem('languageSelected')],
                id: this._firstprefix + this._secondprefix + 'listb_titleField-saveButton',
                margin: '0 0 0 10',
                handler: 'saveNewTitle'
            }]
        },
                callForwardListBGrid,
            {
                xtype: 'panel',
                layout: 'hbox',
                margin: '15 0 0 0',
                bind: {
                    hidden: '{list_b}'
                },
                items: [{
                    text: Ngcp.csc.locales.callforward.add_new_source[localStorage.getItem('languageSelected')],
                    xtype: 'button',
                    id: this._firstprefix + this._secondprefix + 'addListBButton',
                    width: 135,
                    margin: '0 0 0 500',
                    listeners: {
                        click: 'addEmptyRow'
                    }
                }, {
                    xtype: 'button',
                    html: Ngcp.csc.locales.callforward.change_title[localStorage.getItem('languageSelected')],
                    id: this._firstprefix + this._secondprefix + 'listb_titleField-showButton',
                    margin: '0 0 0 10',
                    handler: 'toggleChangeTitle'
                }]
        }, {
                xtype: 'container',
                userCls: 'cf-text cf-subheader',
                html: Ngcp.csc.locales.callforward.when_phone_online[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'panel',
                layout: 'hbox',
                id: this._firstprefix + this._secondprefix + 'onlineFirstRingFields',
                padding: '0 11 0 0',
                width: 500,
                margin: '0 0 0 50',
                items: [{
                    xtype: 'combo',
                    store: ['Own phone', 'Voicemail', 'Fax2Mail', 'None'],
                    id: this._firstprefix + this._secondprefix + 'onlineFirstDest',
                    fieldLabel: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
                    value: 'Own phone',
                    allowBlank: false,
                    editable: false,
                    listeners: {
                        change: 'selectRing'
                    },
                    flex: 4
                }, {
                    xtype: 'combo',
                    store: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260', '270', '280', '290', '300'],
                    value: '10',
                    id: this._firstprefix + this._secondprefix + 'onlineFirstTimeout',
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
                id: this._firstprefix + this._secondprefix + 'onlineThenRingFields',
                layout: 'hbox',
                items: [{
                    xtype: 'combo',
                    store: ['Number', 'Voicemail', 'Fax2Mail'],
                    id: this._firstprefix + this._secondprefix + 'onlineThenDest',
                    bind: '{online_then_dest}',
                    allowBlank: false,
                    editable: false,
                    flex: 2,
                    margin: '0 10 0 0',
                    listeners: {
                        change: 'selectRing'
                    }
                }, {
                    xtype: 'textfield',
                    flex: 2,
                    id: this._firstprefix + this._secondprefix + 'onlineThenNumber',
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
                    id: this._firstprefix + this._secondprefix + 'onlineThenTimeout',
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
                    id: this._firstprefix + this._secondprefix + 'onlineSaveButton',
                    width: 100,
                    listeners: {
                        click: 'addNewDestination'
                    }
                }]
            }, {
                html: Ngcp.csc.locales.callforward.add_new_destination[localStorage.getItem('languageSelected')],
                xtype: 'button',
                id: this._firstprefix + this._secondprefix + 'onlineButton',
                width: 165,
                margin: '15 0 0 0',
                listeners: {
                    click: 'toggleNewDestinationForm'
                }
            }, {
                xtype: 'container',
                userCls: 'cf-text cf-subheader',
                html: Ngcp.csc.locales.callforward.when_phone_busy[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'panel',
                layout: 'hbox',
                id: this._firstprefix + this._secondprefix + 'busyFirstRingFields',
                padding: '0 11 0 0',
                margin: '0 0 0 50',
                width: 500,
                items: [{
                    xtype: 'combo',
                    store: ['Own phone', 'Voicemail', 'Fax2Mail', 'None'],
                    id: this._firstprefix + this._secondprefix + 'busyFirstDest',
                    fieldLabel: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
                    value: 'None',
                    allowBlank: false,
                    editable: false,
                    listeners: {
                        change: 'selectRing'
                    },
                    flex: 4
                }, {
                    xtype: 'combo',
                    store: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260', '270', '280', '290', '300'],
                    value: '10',
                    id: this._firstprefix + this._secondprefix + 'busyFirstTimeout',
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
                id: this._firstprefix + this._secondprefix + 'busyThenRingFields',
                layout: 'hbox',
                height: 31,
                items: [{
                    xtype: 'combo',
                    store: ['Number', 'Voicemail', 'Fax2Mail'],
                    id: this._firstprefix + this._secondprefix + 'busyThenDest',
                    bind: '{busy_then_dest}',
                    allowBlank: false,
                    editable: false,
                    flex: 2,
                    margin: '0 10 0 0',
                    listeners: {
                        change: 'selectRing'
                    }
                }, {
                    xtype: 'textfield',
                    flex: 2,
                    id: this._firstprefix + this._secondprefix + 'busyThenNumber',
                    emptyText: Ngcp.csc.locales.callforward.enter_number[localStorage.getItem('languageSelected')],
                    bind: {
                        hidden: '{busy_then_timeout_hidden}',
                        value: '{busy_then_number}'
                    },
                    listeners: {
                        specialkey: 'onEnterPressed'
                    }
                }, {
                    xtype: 'combo',
                    store: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260', '270', '280', '290', '300'],
                    fieldLabel: Ngcp.csc.locales.callforward.and_ring_for[localStorage.getItem('languageSelected')],
                    id: this._firstprefix + this._secondprefix + 'busyThenTimeout',
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
                        hidden: '{busy_then_timeout_hidden}'
                    }
                }, {
                    xtype: 'button',
                    text: Ngcp.csc.locales.common.save_caps[localStorage.getItem('languageSelected')],
                    id: this._firstprefix + this._secondprefix + 'busySaveButton',
                    width: 100,
                    listeners: {
                        click: 'addNewDestination'
                    }
                }]
            }, {
                html: Ngcp.csc.locales.callforward.add_new_destination[localStorage.getItem('languageSelected')],
                xtype: 'button',
                id: this._firstprefix + this._secondprefix + 'busyButton',
                width: 165,
                margin: '15 0 0 0',
                listeners: {
                    click: 'toggleNewDestinationForm'
                }
            }, {
                xtype: 'container',
                userCls: 'cf-text cf-subheader',
                html: Ngcp.csc.locales.callforward.when_phone_offline[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'panel',
                layout: 'hbox',
                id: this._firstprefix + this._secondprefix + 'offlineFirstRingFields',
                padding: '0 11 0 0',
                margin: '0 0 0 50',
                width: 500,
                items: [{
                    xtype: 'combo',
                    store: ['Own phone', 'Voicemail', 'Fax2Mail', 'None'],
                    id: this._firstprefix + this._secondprefix + 'offlineFirstDest',
                    fieldLabel: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
                    value: 'None',
                    allowBlank: false,
                    editable: false,
                    listeners: {
                        change: 'selectRing'
                    },
                    flex: 4
                }, {
                    xtype: 'combo',
                    store: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260', '270', '280', '290', '300'],
                    value: '10',
                    id: this._firstprefix + this._secondprefix + 'offlineFirstTimeout',
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
                id: this._firstprefix + this._secondprefix + 'offlineThenRingFields',
                layout: 'hbox',
                items: [{
                    xtype: 'combo',
                    store: ['Number', 'Voicemail', 'Fax2Mail'],
                    id: this._firstprefix + this._secondprefix + 'offlineThenDest',
                    bind: '{offline_then_dest}',
                    allowBlank: false,
                    editable: false,
                    flex: 2,
                    margin: '0 10 0 0',
                    listeners: {
                        change: 'selectRing'
                    }
                }, {
                    xtype: 'textfield',
                    flex: 2,
                    id: this._firstprefix + this._secondprefix + 'offlineThenNumber',
                    emptyText: Ngcp.csc.locales.callforward.enter_number[localStorage.getItem('languageSelected')],
                    bind: {
                        hidden: '{offline_then_timeout_hidden}',
                        value: '{offline_then_number}'
                    },
                    listeners: {
                        specialkey: 'onEnterPressed'
                    }
                }, {
                    xtype: 'combo',
                    store: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260', '270', '280', '290', '300'],
                    fieldLabel: Ngcp.csc.locales.callforward.and_ring_for[localStorage.getItem('languageSelected')],
                    id: this._firstprefix + this._secondprefix + 'offlineThenTimeout',
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
                    id: this._firstprefix + this._secondprefix + 'offlineSaveButton',
                    width: 100,
                    listeners: {
                        click: 'addNewDestination'
                    }
                }]
            }, {
                html: Ngcp.csc.locales.callforward.add_new_destination[localStorage.getItem('languageSelected')],
                xtype: 'button',
                id: this._firstprefix + this._secondprefix + 'offlineButton',
                width: 165,
                margin: '15 0 0 0',
                listeners: {
                    click: 'toggleNewDestinationForm'
                }
        }];

        this.callParent();
    }

});
