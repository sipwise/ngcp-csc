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

    // DONE: 1. Disable editor for phone value
    // DONE: 2. Disable old "add new" in grid functionality
    // DONE: 3. Create new "add new" form, incl "SAVE" button and combobox
    // TODO: 4. Style form with bulletpoint and margins
    // TODO: 5. Toggle hide/show "add new" form
    // TODO: 6. Change addEmptyRow logic to work with form instead

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
            userCls: 'cf-embed-row',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                width: '33.5%'
            },
            items: [{
                userCls: 'cf-widget-cell',
                id: 'alwaysButtonBelow'
            }, {
                userCls: 'cf-widget-cell',
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
                userCls: 'cf-widget-cell',
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
            userCls: 'cf-embed-row',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                width: '33.5%'
            },
            items: [{
                userCls: 'cf-widget-cell',
                id: 'everybodyButtonBelow'
            }, {
                userCls: 'cf-widget-cell',
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
                                    element: 'el',
                                    click: 'addEmptyRow'
                                }
                            }
                        ]
                    }]
                }]
            }, {
                userCls: 'cf-widget-cell',
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
                                    element: 'el',
                                    click: 'addEmptyRow'
                                }
                            }
                        ]
                    }]
                }]
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
            xtype: 'panel',
            margin: '10 0 0 50',
            layout: 'hbox',
            items: [{
                html: '<i class="fa fa-circle cf-tpl-fa" aria-hidden="true"></i>'
            }, {
                xtype: 'combo',
                store: ['Number', 'Voicemail', 'Fax2Mail'],
                id: 'todo-a',
                fieldLabel: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
                value: 'Number',
                allowBlank: false,
                editable: false,
                listeners: {
                    change: '// TODO'
                },
                flex: 8
            }, {
                xtype: 'combo',
                store: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260', '270', '280', '290', '300'],
                value: '10',
                fieldLabel: 'and ring for',
                id: 'todo-b',
                allowBlank: false,
                editable: false,
                flex: 2,
                margin: '0 0 0 10',
                bind: {
                    hidden: '{online_then_timeout_hidden}'
                }
            }, {
                xtype: 'container',
                html: 'secs'
            }, {
                xtype: 'button',
                text: 'SAVE'
            }]
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
            xtype: 'panel',
            margin: '10 0 0 50',
            layout: 'hbox',
            items: [{
                html: '<i class="fa fa-circle cf-tpl-fa" aria-hidden="true"></i>'
            }, {
                xtype: 'combo',
                store: ['Number', 'Voicemail', 'Fax2Mail'],
                id: 'todo-c',
                fieldLabel: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
                value: 'Number',
                allowBlank: false,
                editable: false,
                listeners: {
                    change: '// TODO'
                },
                flex: 8
            }, {
                xtype: 'combo',
                store: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260', '270', '280', '290', '300'],
                value: '10',
                fieldLabel: 'and ring for',
                id: 'todo-d',
                allowBlank: false,
                editable: false,
                flex: 2,
                margin: '0 0 0 10',
                bind: {
                    hidden: '{online_then_timeout_hidden}'
                }
            }, {
                xtype: 'container',
                html: 'secs'
            }, {
                xtype: 'button',
                text: 'SAVE'
            }]
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
            xtype: 'panel',
            margin: '10 0 0 50',
            layout: 'hbox',
            items: [{
                html: '<i class="fa fa-circle cf-tpl-fa" aria-hidden="true"></i>'
            }, {
                xtype: 'combo',
                store: ['Number', 'Voicemail', 'Fax2Mail'],
                id: 'todo-e',
                fieldLabel: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
                value: 'Number',
                allowBlank: false,
                editable: false,
                listeners: {
                    change: '// TODO'
                },
                flex: 8
            }, {
                xtype: 'combo',
                store: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200', '210', '220', '230', '240', '250', '260', '270', '280', '290', '300'],
                value: '10',
                fieldLabel: 'and ring for',
                id: 'todo-f',
                allowBlank: false,
                editable: false,
                flex: 2,
                margin: '0 0 0 10',
                bind: {
                    hidden: '{online_then_timeout_hidden}'
                }
            }, {
                xtype: 'container',
                html: 'secs'
            }, {
                xtype: 'button',
                text: 'SAVE'
            }]
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
