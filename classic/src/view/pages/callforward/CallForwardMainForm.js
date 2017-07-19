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

    _isEverybody: true,

    initComponent: function() {

        var storeList = Ext.getStore('CallForwardList') || Ext.create('NgcpCsc.store.CallForwardSourceset', {
            storeId: 'CallForwardList'
        });

        if(!storeList.isLoaded()){
            storeList.load();
        }

        var callForwardList = Ext.create('NgcpCsc.view.pages.callforward.CallForwardSourcesetGrid', {
            id: this._firstprefix + this._secondprefix + 'cf-sourceset-list-grid',
            store: storeListA
        });

        var busyGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardMainGrid', {
            store: Ext.create('NgcpCsc.store.CallForward', {
                storeId: this._firstprefix + this._secondprefix + 'CallForwardBusy'
            })
        });
        var onlineGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardMainGrid', {
            store: Ext.create('NgcpCsc.store.CallForward', {
                storeId: this._firstprefix + this._secondprefix + 'CallForwardOnline'
            })
        });
        var offlineGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardMainGrid', {
            store: Ext.create('NgcpCsc.store.CallForward', {
                storeId: this._firstprefix + this._secondprefix + 'CallForwardOffline'
            })
        });


        this.items = [{
            xtype: 'panel',
            hidden: this._isEverybody,
            title: this.title || '',
            collapsible: true,
            collapsed: true,
            items: [{
                xtype: 'form',
                layout: 'hbox',
                margin: '10 0 0 0',
                items: [{
                    xtype: 'textfield',
                    userCls: 'cf-sourceset-textfield',
                    fieldLabel: Ngcp.csc.locales.callforward.sourceset_title[localStorage.getItem('languageSelected')],
                    flex: 1,
                    title: this.title || ''
                }, {
                    xtype: 'button',
                    html: Ngcp.csc.locales.common.cancel_caps[localStorage.getItem('languageSelected')],
                    id: this._firstprefix + this._secondprefix + 'listb_titleField-cancelButton',
                    margin: '0 0 0 10',
                    handler: 'cancelNewTitle'
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
                    items: [
                        {
                        xtype: 'button',
                        text: Ngcp.csc.locales.callforward.add_new_source[localStorage.getItem('languageSelected')],
                        id: this._firstprefix + this._secondprefix + 'addListButton',
                        width: 135,
                        margin: '0 0 0 620',
                        // margin: '0 0 0 10',
                        listeners: {
                            click: 'addEmptySourcesetRow'
                        }
                    }]
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
                    store: 'FirstRingActions',
                    valueField: 'name',
                    displayField: 'name',
                    id: this._firstprefix + this._secondprefix + 'onlineFirstDest',
                    fieldLabel: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
                    value: 'Own phone',
                    allowBlank: false,
                    editable: false,
                    listeners: {
                        change: 'selectRing'
                    },
                    flex: 5
                }, {
                    xtype: 'numberfield',
                    step: 10,
                    minValue:0,
                    maxValue: 300,
                    value: '10',
                    id: this._firstprefix + this._secondprefix + 'onlineFirstTimeout',
                    allowBlank: false,
                    editable: true,
                    flex: 4,
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
                    displayField: 'name',
                    valueField: 'name',
                    store: 'Forwards',
                    id: this._firstprefix + this._secondprefix + 'onlineThenDest',
                    bind: '{online_then_dest}',
                    allowBlank: false,
                    editable: false,
                    flex: 3,
                    margin: '0 10 0 0',
                    listeners: {
                        change: 'selectRing'
                    }
                }, {
                    xtype: 'textfield',
                    flex: 3,
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
                    xtype: 'numberfield',
                    step: 10,
                    minValue:0,
                    maxValue: 300,
                    labelWidth: 80,
                    fieldLabel: Ngcp.csc.locales.callforward.and_ring_for[localStorage.getItem('languageSelected')],
                    id: this._firstprefix + this._secondprefix + 'onlineThenTimeout',
                    bind: {
                        value: '{online_then_timeout}',
                        hidden: '{online_then_timeout_hidden}'
                    },
                    allowBlank: false,
                    editable: true,
                    flex: 4,
                    margin: '0 0 0 10'
                }, {
                    xtype: 'container',
                    html: Ngcp.csc.locales.callforward.secs[localStorage.getItem('languageSelected')],
                    padding: '7 0 0 10',
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
                margin: '15 0 0 155',
                listeners: {
                    click: 'toggleNewDestinationForm'
                },
                bind: {
                    hidden: '{online_add_button_hidden}'
                }
            }, {
                html: Ngcp.csc.locales.callforward.cancel_destination[localStorage.getItem('languageSelected')],
                xtype: 'button',
                id: this._firstprefix + this._secondprefix + 'onlineButtonCancel',
                width: 165,
                margin: '15 0 0 155',
                listeners: {
                    click: 'toggleNewDestinationForm'
                },
                bind: {
                    hidden: '{online_cancel_button_hidden}'
                }
            }, {
                xtype: 'container',
                userCls: 'cf-text cf-subheader',
                html: Ngcp.csc.locales.callforward.when_phone_busy[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 0 50',
                items: [{
                        xtype: 'container',
                        html: Ngcp.csc.locales.callforward.forward_to[localStorage.getItem('languageSelected')],
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
                items: [{
                    xtype: 'combo',
                    displayField: 'name',
                    valueField: 'name',
                    store: 'Forwards',
                    id: this._firstprefix + this._secondprefix + 'busyThenDest',
                    bind: '{busy_then_dest}',
                    allowBlank: false,
                    editable: false,
                    flex: 3,
                    margin: '0 10 0 0',
                    listeners: {
                        change: 'selectRing'
                    }
                }, {
                    xtype: 'textfield',
                    flex: 3,
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
                    xtype: 'numberfield',
                    step: 10,
                    minValue:0,
                    maxValue: 300,
                    labelWidth: 80,
                    fieldLabel: Ngcp.csc.locales.callforward.and_ring_for[localStorage.getItem('languageSelected')],
                    id: this._firstprefix + this._secondprefix + 'busyThenTimeout',
                    bind: {
                        value: '{busy_then_timeout}',
                        hidden: '{busy_then_timeout_hidden}'
                    },
                    allowBlank: false,
                    editable: true,
                    flex: 4,
                    margin: '0 0 0 10'
                }, {
                    xtype: 'container',
                    html: Ngcp.csc.locales.callforward.secs[localStorage.getItem('languageSelected')],
                    padding: '7 0 0 10',
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
                margin: '15 0 0 155',
                listeners: {
                    click: 'toggleNewDestinationForm'
                },
                bind: {
                    hidden: '{busy_add_button_hidden}'
                }
            }, {
                html: Ngcp.csc.locales.callforward.cancel_destination[localStorage.getItem('languageSelected')],
                xtype: 'button',
                id: this._firstprefix + this._secondprefix + 'busyButtonCancel',
                width: 165,
                margin: '15 0 0 155',
                listeners: {
                    click: 'toggleNewDestinationForm'
                },
                bind: {
                    hidden: '{busy_cancel_button_hidden}'
                }
            }, {
                xtype: 'container',
                userCls: 'cf-text cf-subheader',
                html: Ngcp.csc.locales.callforward.when_phone_offline[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 0 50',
                items: [{
                        xtype: 'container',
                        html: Ngcp.csc.locales.callforward.forward_to[localStorage.getItem('languageSelected')],
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
                    displayField: 'name',
                    valueField: 'name',
                    store: 'Forwards',
                    id: this._firstprefix + this._secondprefix + 'offlineThenDest',
                    bind: '{offline_then_dest}',
                    allowBlank: false,
                    editable: false,
                    flex: 3,
                    margin: '0 10 0 0',
                    listeners: {
                        change: 'selectRing'
                    }
                }, {
                    xtype: 'textfield',
                    flex: 3,
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
                    xtype: 'numberfield',
                    step: 10,
                    minValue:0,
                    maxValue: 300,
                    labelWidth: 80,
                    fieldLabel: Ngcp.csc.locales.callforward.and_ring_for[localStorage.getItem('languageSelected')],
                    id: this._firstprefix + this._secondprefix + 'offlineThenTimeout',
                    bind: {
                        value: '{offline_then_timeout}',
                        hidden: '{offline_then_timeout_hidden}'
                    },
                    allowBlank: false,
                    editable: true,
                    flex: 4,
                    margin: '0 0 0 10'
                }, {
                    xtype: 'container',
                    html: Ngcp.csc.locales.callforward.secs[localStorage.getItem('languageSelected')],
                    padding: '7 0 0 10',
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
                margin: '15 0 0 155',
                listeners: {
                    click: 'toggleNewDestinationForm'
                },
                bind: {
                    hidden: '{offline_add_button_hidden}'
                }
            }, {
                html: Ngcp.csc.locales.callforward.cancel_destination[localStorage.getItem('languageSelected')],
                xtype: 'button',
                id: this._firstprefix + this._secondprefix + 'offlineButtonCancel',
                width: 165,
                margin: '15 0 0 155',
                listeners: {
                    click: 'toggleNewDestinationForm'
                },
                bind: {
                    hidden: '{offline_cancel_button_hidden}'
                }
        }];

        this.callParent();
    }

});
