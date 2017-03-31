Ext.define('NgcpCsc.view.pages.pbxconfig.devices.DevicesGrid', {
    extend: 'NgcpCsc.view.core.GridCards',

    // TODO: Missing top border for topmost grid card
    cls: 'card-grid',
    reference: 'devicesGrid',
    store: 'Devices',

    viewModel: 'devices',

    viewConfig: {
        stripeRows: false,
        enableTextSelection: true
    },

    listeners: {
        click: {
            fn: 'onIconClicked',
            element: 'el',
            delegate: '.card-icon'
        },
        mouseenter: {
            fn: 'onMouseEntered',
            element: 'el',
            delegate: '.card-icon'
        },
        cellclick: 'expandRow',
        rowbodyclick: 'expandRow'
    },

    columns: {
        defaults: {
            menuDisabled: true,
            resizable: false
        },
        items: [{
            dataIndex: 'name',
            renderer: 'nameRenderer',
            header: false,
            width: '96%'
        }]
    },
    userCls: Ext.os.is.Desktop ? 'pbx-widget-grid big-820' : 'pbx-widget-grid small-100',

    plugins: [{
        pluginId: 'rowwidgetDevices',
        ptype: 'rowwidget',
        widget: {
            cls: 'devices',
            xtype: 'form',
            defaultBindProperty: 'hidden',
            bind: {
                hidden: '{!record}',
                id: 'devices-{record.id}'
            },
            defaults: {
                layout: 'hbox'
            },
            items: [{
                    name: 'name',
                    defaults: {
                        padding: '0 0 15 0'
                    },
                    items: [{
                        xtype: 'label',
                        bind: {
                            id: 'devices-label-mainname-{record.id}'
                        },
                        hidden: true,
                        cls: 'pbx-data-value',
                        text: Ngcp.csc.locales.pbxconfig.station_name[localStorage.getItem('languageSelected')],
                        width: 120
                    }, {
                        xtype: 'textfield',
                        required: true,
                        hidden: true,
                        emptyText: Ngcp.csc.locales.pbxconfig.enter_new_name[localStorage.getItem('languageSelected')],
                        bind: {
                            id: 'devices-textfield-name-{record.id}'
                        },
                        listeners: {
                            // Workaround. Issue when binding is used, any change in any record field triggers a
                            // layout break in the row which looks like row collapse, but is not
                            focus: {
                                fn: 'setFieldValue'
                            },
                            specialkey: 'onEnterPressed'
                        }
                    }]
                }, {
                    name: 'mac',
                    defaults: {
                        padding: '0 0 15 0'
                    },
                    items: [{
                        xtype: 'label',
                        cls: 'pbx-data-value',
                        text: Ngcp.csc.locales.pbxconfig.mac[localStorage.getItem('languageSelected')],
                        width: 120
                    }, {
                        xtype: 'label',
                        hidden: false,
                        bind: {
                            id: 'devices-label-mac-{record.id}',
                            text: '{record.mac}'
                        }
                    }, {
                        xtype: 'textfield',
                        required: true,
                        hidden: true,
                        emptyText: Ngcp.csc.locales.pbxconfig.enter_new_mac_address[localStorage.getItem('languageSelected')],
                        bind: {
                            id: 'devices-textfield-mac-{record.id}'
                        },
                        listeners: {
                            focus: {
                                fn: 'setFieldValue'
                            },
                            specialkey: 'onEnterPressed'
                        }
                    }]
                }, {
                    name: 'device',
                    defaults: {
                        padding: '0 0 15 0'
                    },
                    items: [{
                        xtype: 'label',
                        cls: 'pbx-data-value',
                        text: Ngcp.csc.locales.pbxconfig.device[localStorage.getItem('languageSelected')],
                        width: 120
                    }, {
                        xtype: 'label',
                        hidden: false,
                        bind: {
                            id: 'devices-label-device-{record.id}',
                            text: '{record.device}'
                        }
                    }, {
                        xtype: 'combo',
                        required: true,
                        autoSelect: false,
                        hidden: true,
                        emptyText: Ngcp.csc.locales.pbxconfig.enter_new_device[localStorage.getItem('languageSelected')],
                        bind: {
                            id: 'devices-textfield-device-{record.id}'
                        },
                        listeners: {
                            focus: 'setFieldValue',
                            specialkey: 'onEnterPressed',
                            select: 'deviceSelected'
                        },
                        store: ['Cisco Pbx 1', 'Cisco Pbx 2', 'Cisco Pbx 3']
                    }]
                }, {
                    name: 'extension',
                    defaults: {
                        padding: '0 0 15 0'
                    },
                    items: [{
                        xtype: 'label',
                        cls: 'pbx-data-value',
                        text: Ngcp.csc.locales.pbxconfig.extension[localStorage.getItem('languageSelected')] + " 1:",
                        width: 120
                    }, {
                        xtype: 'label',
                        hidden: false,
                        bind: {
                            id: 'devices-label-extension-{record.id}',
                            text: '{record.extension}'
                        }
                    }, {
                        xtype: 'combo',
                        required: true,
                        hidden: true,
                        emptyText: Ngcp.csc.locales.pbxconfig.enter_new_extension[localStorage.getItem('languageSelected')],
                        bind: {
                            id: 'devices-textfield-extension-{record.id}'
                        },
                        listeners: {
                            focus: {
                                fn: 'setFieldValue'
                            },
                            specialkey: 'onEnterPressed'
                        },
                        store: ['Ext1', 'Ext2', 'Ext3']
                    }]
                }, {
                    name: 'extension2',
                    defaults: {
                        padding: '0 0 15 0'
                    },
                    items: [{
                        xtype: 'label',
                        cls: 'pbx-data-value',
                        text: Ngcp.csc.locales.pbxconfig.extension[localStorage.getItem('languageSelected')] + " 2:",
                        width: 120
                    }, {
                        xtype: 'label',
                        hidden: false,
                        bind: {
                            id: 'devices-label-extension2-{record.id}',
                            text: '{record.extension2}'
                        }
                    }, {
                        xtype: 'combo',
                        required: true,
                        hidden: true,
                        emptyText: Ngcp.csc.locales.pbxconfig.enter_new_extension[localStorage.getItem('languageSelected')],
                        bind: {
                            id: 'devices-textfield-extension2-{record.id}'
                        },
                        listeners: {
                            focus: {
                                fn: 'setFieldValue'
                            },
                            specialkey: 'onEnterPressed'
                        },
                        store: ['Ext1', 'Ext2', 'Ext3']
                    }]
                },


                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox'
                    },
                    defaults: {
                        margin: 20
                    },
                    items: [{
                        cls: 'device-img',
                        xtype: 'label',
                        width: 550,
                        height: 550,
                        bind: {
                            html: '{record.imageWithButtons}',
                            hidden: '{!record.image}'
                        },
                        listeners: {
                            render: 'onImgRendered'
                        }
                    }, {
                        xtype: 'fieldset',
                        width: 150,
                        collapsible: false,
                        hidden: true,
                        defaults: {
                            xtype:'label',
                            labelWidth: 50,
                            anchor: '100%',
                        },
                        bind:{
                            id: 'seat-show-panel-{record.id}'
                        },
                        items: [ {
                            name: 'typeValue'
                        },{
                            xtype: 'buttongroup',
                            name: 'editBtns',
                            columns: 3,
                            hidden: true,
                            cls: 'edit-panel',
                            border: 0,
                            defaults:{
                                width: 50
                            },
                            items: [{
                                iconCls: Ngcp.csc.icons.edit,
                                handler: 'editSeat'
                            },
                            {
                                iconCls: Ngcp.csc.icons.trash,
                                handler: 'deleteSeat',
                                name: 'deleteBtn'
                            }]
                        }
                    ]
                    },{
                        xtype: 'fieldset',
                        width: 150,
                        collapsible: false,
                        hidden: true,
                        defaults: {
                            labelWidth: 40,
                            anchor: '100%',
                        },
                        bind:{
                            id: 'seat-edit-panel-{record.id}'
                        },
                        items: [{
                            xtype: 'combo',
                            name: 'typeValue',
                            fieldLabel: 'Type',
                            store: ['Shared', 'Speed dial', 'Busy lamp', 'Private'],
                            allowBlank: false
                        }, {
                            xtype: 'combo',
                            store: ['User1', 'User2', 'User3', 'User4'],
                            name: 'seat',
                            fieldLabel: 'User',
                            allowBlank: false
                        },{
                            xtype: 'buttongroup',
                            name: 'editBtns',
                            columns: 3,
                            cls: 'edit-panel',
                            border: 0,
                            defaults:{
                                width: 50
                            },
                            items: [{
                                iconCls: Ngcp.csc.icons.floppy,
                                handler: 'saveSeat'
                            },
                            {
                                iconCls: Ngcp.csc.icons.block,
                                handler: 'discardChanges'
                            }]
                        }]
                    }]
                }, {
                    xtype: 'label',
                    bind: {
                        html: '<div class="card-wrapper"><div class="card-icon-row">' +
                            '<div id="removeDevice-{record.id}" class="card-icon" data-callback="removeCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_seat[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.trash2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                            '<div id="editDevice-{record.id}" class="card-icon" data-callback="editCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_seat[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.edit2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                            '<div id="cancelDevice-{record.id}" class="card-icon hidden" data-callback="cancelCard" data-qtip="' + Ngcp.csc.locales.pbxconfig.cancel_operation[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.block2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                            '</div></div>'
                    }
                }
            ]
        }
    }]
});
