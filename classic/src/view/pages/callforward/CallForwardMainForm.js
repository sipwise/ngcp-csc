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
        var callForwardAfterGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardTimesetGrid', {
            id: 'cf-timeset-after-grid',
            store: Ext.create('NgcpCsc.store.CallForwardTimeset', {
                proxy: {
                    type: 'ajax',
                    url: '/resources/data/callForwardAfter.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            })
        });
        var callForwardCompanyGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardTimesetGrid', {
            id: 'cf-timeset-company-grid',
            store: Ext.create('NgcpCsc.store.CallForwardTimeset', {
                proxy: {
                    type: 'ajax',
                    url: '/resources/data/callForwardCompany.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            })
        });
        var callForwardListAGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardSourcesetGrid', {
            id: 'cf-sourceset-list-a-grid',
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
            id: 'cf-sourceset-list-b-grid',
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
                reference: 'alwaysButton',
                text: Ngcp.csc.locales.callforward.time_one[localStorage.getItem('languageSelected')]
            }, {
                value: 'afterHours',
                id: 'afterHoursButton',
                reference: 'afterHoursButton',
                text: Ngcp.csc.locales.callforward.time_two[localStorage.getItem('languageSelected')],
                iconCls: Ngcp.csc.icons.pencil,
                iconAlign: 'right'
            }, {
                value: 'companyHours',
                id: 'companyHoursButton',
                reference: 'companyHoursButton',
                text: Ngcp.csc.locales.callforward.time_three[localStorage.getItem('languageSelected')],
                iconCls: Ngcp.csc.icons.pencil,
                iconAlign: 'right'
            }]
        }, {
            xtype: 'container',
            userCls: 'cf-embed-row',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                width: '33.5%'
            },
            items: [{
                id: 'alwaysButtonBelow'
            }, {
                id: 'afterHoursButtonBelow',
                items: [{
                    reference: 'cf-after-widget',
                    bind: {
                        hidden: '{after_hours}'
                    },
                    items: [
                        callForwardAfterGrid,
                        {
                            layout: 'hbox',
                            width: '100%',
                            margin: '10 0 0 0',
                            defaults: {
                                xtype: 'button',
                                flex: 1
                            },
                            items: [{
                                text: Ngcp.csc.locales.common.save[localStorage.getItem('languageSelected')],
                                margin: '0 5 0 0'
                            }, {
                                text: Ngcp.csc.locales.common.reset[localStorage.getItem('languageSelected')],
                                id: 'resetAfter',
                                handler: 'resetTimesetWidget'
                            }]
                        }
                    ]
                }]
            }, {
                id: 'companyHoursButtonBelow',
                items: [{
                    reference: 'cf-company-widget',
                    bind: {
                        hidden: '{company_hours}'
                    },
                    items: [
                        callForwardCompanyGrid,
                        {
                            layout: 'hbox',
                            width: '100%',
                            margin: '10 0 0 0',
                            defaults: {
                                xtype: 'button',
                                flex: 1
                            },
                            items: [{
                                text: Ngcp.csc.locales.common.save[localStorage.getItem('languageSelected')],
                                margin: '0 5 0 0'
                            }, {
                                text: Ngcp.csc.locales.common.reset[localStorage.getItem('languageSelected')],
                                id: 'resetCompany',
                                handler: 'resetTimesetWidget'
                            }]
                        }
                    ]
                }]
            }]
        }, {
            xtype: 'container',
            userCls: 'cf-text',
            html: Ngcp.csc.locales.callforward.for_calling_parties[localStorage.getItem('languageSelected')],
            margin: '10 0 10 0'
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
                reference: 'everybodyButton',
                text: Ngcp.csc.locales.callforward.source_one[localStorage.getItem('languageSelected')]
            }, {
                value: 'listA',
                id: 'listAButton',
                reference: 'listAButton',
                text: Ngcp.csc.locales.callforward.source_two[localStorage.getItem('languageSelected')],
                iconCls: Ngcp.csc.icons.pencil,
                iconAlign: 'right'
            }, {
                value: 'listB',
                id: 'listBButton',
                reference: 'listBButton',
                text: Ngcp.csc.locales.callforward.source_three[localStorage.getItem('languageSelected')],
                iconCls: Ngcp.csc.icons.pencil,
                iconAlign: 'right'
            }]
        }, {
            xtype: 'container',
            userCls: 'cf-embed-row',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                width: '33.5%'
            },
            items: [{
                id: 'everybodyButtonBelow'
            }, {
                id: 'listAButtonBelow',
                items: [{
                    reference: 'cf-list-a-widget',
                    bind: {
                        hidden: '{list_a}'
                    },
                    items: [{
                        xtype: 'panel',
                        ui: 'cf-widget',
                        width: '100%',
                        items: [
                            callForwardListAGrid,
                            {
                                text: Ngcp.csc.locales.callforward.add_new_source[localStorage.getItem('languageSelected')],
                                xtype: 'button',
                                id: 'addListAButton',
                                width: 135,
                                margin: '15 0 0 0',
                                listeners: {
                                    click: 'addEmptyRow'
                                }
                            }
                        ]
                    }]
                }]
            }, {
                id: 'listBHoursButtonBelow',
                items: [{
                    reference: 'cf-list-b-widget',
                    bind: {
                        hidden: '{list_b}'
                    },
                    items: [{
                        xtype: 'panel',
                        ui: 'cf-widget',
                        width: '100%',
                        items: [
                            callForwardListBGrid,
                            {
                                text: Ngcp.csc.locales.callforward.add_new_source[localStorage.getItem('languageSelected')],
                                xtype: 'button',
                                id: 'addListBButton',
                                width: 135,
                                margin: '15 0 0 0',
                                listeners: {
                                    click: 'addEmptyRow'
                                }
                            }
                        ]
                    }]
                }]
            }]
        }, {
            xtype: 'statusbar',
            reference: 'loadingBar'
        }, {
            xtype: 'container',
            userCls: 'cf-text cf-subheader',
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
                store: ['for 0 secs', 'for 10 secs', 'for 20 secs', 'for 30 secs', 'for 40 secs', 'for 50 secs', 'for 60 secs', 'for 70 secs', 'for 80 secs', 'for 90 secs', 'for 100 secs', 'for 110 secs', 'for 120 secs', 'for 130 secs', 'for 140 secs', 'for 150 secs', 'for 160 secs', 'for 170 secs', 'for 180 secs', 'for 190 secs', 'for 200 secs', 'for 210 secs', 'for 220 secs', 'for 230 secs', 'for 240 secs', 'for 250 secs', 'for 260 secs', 'for 270 secs', 'for 280 secs', 'for 290 secs', 'for 300 secs'],
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
                userCls: 'cf-thentext'
            },
                onlineGrid
            ]
        }, {
            xtype: 'panel',
            margin: '10 0 0 194',
            bind: {
                hidden: '{online_add_new_then_hidden}'
            },
            id: 'onlineThenRingFields',
            layout: 'hbox',
            items: [{
                html: '<i class="fa fa-circle cf-tpl-fa" aria-hidden="true"></i>',
                margin: '8 0 0 0'
            }, {
                xtype: 'combo',
                store: ['Number', 'Voicemail', 'Fax2Mail'],
                id: 'onlineThenDest',
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
                id: 'onlineThenNumber',
                emptyText: Ngcp.csc.locales.callforward.enter_number[localStorage.getItem('languageSelected')],
                bind: {
                    hidden: '{online_then_timeout_hidden}',
                    value: '{online_then_number}'
                }
            }, {
                xtype: 'combo',
                store: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260', '270', '280', '290', '300'],
                fieldLabel: Ngcp.csc.locales.callforward.and_ring_for[localStorage.getItem('languageSelected')],
                id: 'onlineThenTimeout',
                bind: {
                    value: '{online_then_timeout}',
                    hidden: '{online_then_timeout_hidden}'
                },
                allowBlank: false,
                editable: false,
                flex: 2,
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
                text: Ngcp.csc.locales.callforward.save[localStorage.getItem('languageSelected')],
                id: 'onlineSaveButton',
                width: 100,
                listeners: {
                    click: 'addNewDestination'
                }
            }]
        }, {
            html: Ngcp.csc.locales.callforward.add_new_destination[localStorage.getItem('languageSelected')],
            xtype: 'button',
            id: 'onlineButton',
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
                store: ['for 0 secs', 'for 10 secs', 'for 20 secs', 'for 30 secs', 'for 40 secs', 'for 50 secs', 'for 60 secs', 'for 70 secs', 'for 80 secs', 'for 90 secs', 'for 100 secs', 'for 110 secs', 'for 120 secs', 'for 130 secs', 'for 140 secs', 'for 150 secs', 'for 160 secs', 'for 170 secs', 'for 180 secs', 'for 190 secs', 'for 200 secs', 'for 210 secs', 'for 220 secs', 'for 230 secs', 'for 240 secs', 'for 250 secs', 'for 260 secs', 'for 270 secs', 'for 280 secs', 'for 290 secs', 'for 300 secs'],
                value: 'for 10 secs',
                id: 'busyFirstTimeout',
                allowBlank: false,
                editable: false,
                flex: 2,
                margin: '0 0 0 10',
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
            margin: '10 0 0 194',
            bind: {
                hidden: '{busy_add_new_then_hidden}'
            },
            id: 'busyThenRingFields',
            layout: 'hbox',
            items: [{
                html: '<i class="fa fa-circle cf-tpl-fa" aria-hidden="true"></i>',
                margin: '8 0 0 0'
            }, {
                xtype: 'combo',
                store: ['Number', 'Voicemail', 'Fax2Mail'],
                id: 'busyThenDest',
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
                id: 'busyThenNumber',
                emptyText: Ngcp.csc.locales.callforward.enter_number[localStorage.getItem('languageSelected')],
                bind: {
                    hidden: '{busy_then_timeout_hidden}',
                    value: '{busy_then_number}'
                }
            }, {
                xtype: 'combo',
                store: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260', '270', '280', '290', '300'],
                fieldLabel: Ngcp.csc.locales.callforward.and_ring_for[localStorage.getItem('languageSelected')],
                id: 'busyThenTimeout',
                bind: {
                    value: '{busy_then_timeout}',
                    hidden: '{busy_then_timeout_hidden}'
                },
                allowBlank: false,
                editable: false,
                flex: 2,
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
                text: Ngcp.csc.locales.callforward.save[localStorage.getItem('languageSelected')],
                id: 'busySaveButton',
                width: 100,
                listeners: {
                    click: 'addNewDestination'
                }
            }]
        }, {
            html: Ngcp.csc.locales.callforward.add_new_destination[localStorage.getItem('languageSelected')],
            xtype: 'button',
            id: 'busyButton',
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
                store: ['for 0 secs', 'for 10 secs', 'for 20 secs', 'for 30 secs', 'for 40 secs', 'for 50 secs', 'for 60 secs', 'for 70 secs', 'for 80 secs', 'for 90 secs', 'for 100 secs', 'for 110 secs', 'for 120 secs', 'for 130 secs', 'for 140 secs', 'for 150 secs', 'for 160 secs', 'for 170 secs', 'for 180 secs', 'for 190 secs', 'for 200 secs', 'for 210 secs', 'for 220 secs', 'for 230 secs', 'for 240 secs', 'for 250 secs', 'for 260 secs', 'for 270 secs', 'for 280 secs', 'for 290 secs', 'for 300 secs'],
                value: 'for 10 secs',
                id: 'offlineFirstTimeout',
                allowBlank: false,
                editable: false,
                flex: 2,
                margin: '0 0 0 10',
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
            margin: '10 0 0 194',
            bind: {
                hidden: '{offline_add_new_then_hidden}'
            },
            id: 'offlineThenRingFields',
            layout: 'hbox',
            items: [{
                html: '<i class="fa fa-circle cf-tpl-fa" aria-hidden="true"></i>',
                margin: '8 0 0 0'
            }, {
                xtype: 'combo',
                store: ['Number', 'Voicemail', 'Fax2Mail'],
                id: 'offlineThenDest',
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
                id: 'offlineThenNumber',
                emptyText: Ngcp.csc.locales.callforward.enter_number[localStorage.getItem('languageSelected')],
                bind: {
                    hidden: '{offline_then_timeout_hidden}',
                    value: '{offline_then_number}'
                }
            }, {
                xtype: 'combo',
                store: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260', '270', '280', '290', '300'],
                fieldLabel: Ngcp.csc.locales.callforward.and_ring_for[localStorage.getItem('languageSelected')],
                id: 'offlineThenTimeout',
                bind: {
                    value: '{offline_then_timeout}',
                    hidden: '{offline_then_timeout_hidden}'
                },
                allowBlank: false,
                editable: false,
                flex: 2,
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
                text: Ngcp.csc.locales.callforward.save[localStorage.getItem('languageSelected')],
                id: 'offlineSaveButton',
                width: 100,
                listeners: {
                    click: 'addNewDestination'
                }
            }]
        }, {
            html: Ngcp.csc.locales.callforward.add_new_destination[localStorage.getItem('languageSelected')],
            xtype: 'button',
            id: 'offlineButton',
            width: 165,
            margin: '15 0 0 0',
            listeners: {
                click: 'showNewDestinationForm'
            }
        }];

        this.callParent();
    }

});
