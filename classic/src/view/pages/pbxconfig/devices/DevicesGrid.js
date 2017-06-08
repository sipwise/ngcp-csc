Ext.define('NgcpCsc.view.pages.pbxconfig.devices.DevicesGrid', {
    extend: 'NgcpCsc.view.core.GridCards',

    // TODO: Missing top border for topmost grid card
    cls: 'card-grid',
    reference: 'devicesGrid',
    store: 'Devices',

    viewModel: 'devices',

    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true
    },

    listeners: {
        mousedown: {
            fn: 'onIconClicked',
            element: 'el',
            delegate: '.card-icon'
        },
        mouseenter: {
            fn: 'onMouseEntered',
            element: 'el',
            delegate: '.card-icon'
        },
        mouseleave: {
            fn: 'onMouseLeave',
            element: 'el',
            delegate: '.card-icon'
        },
        cellclick: 'expandRow',
        rowbodyclick: 'expandRow',
        focus: function() {
            var scrollPosition = grid.getEl().down('.x-grid-view').getScroll();
            grid.getEl().down('.x-grid-view').scrollTo('top', scrollPosition.top, false);
        }
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
        selectRowOnExpand: true,
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
                        width: 250,
                        emptyText: Ngcp.csc.locales.pbxconfig.enter_new_name[localStorage.getItem('languageSelected')],
                        bind: {
                            id: 'devices-textfield-name-{record.id}'
                        },
                        msgTarget: 'side',
                        listeners: {
                            // Workaround. Issue when binding is used, any change in any record field triggers a
                            // layout break in the row which looks like row collapse, but is not
                            focus: {
                                fn: 'setFieldValue'
                            },
                            blur: {
                                fn: 'fieldBlurred',
                                el: 'element'
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
                        msgTarget: 'side',
                        maxLength: 17,
                        enforceMaxLength: true,
                        regex: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
                        regexText: Ngcp.csc.locales.pbxconfig.valid_mac_address[localStorage.getItem('languageSelected')],
                        listeners: {
                            focus: {
                                fn: 'setFieldValue'
                            },
                            blur: {
                                fn: 'fieldBlurred',
                                el: 'element'
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
                        valueField: 'name',
                        displayField: 'name',
                        hidden: true,
                        editable: false,
                        emptyText: Ngcp.csc.locales.pbxconfig.enter_new_device[localStorage.getItem('languageSelected')],
                        bind: {
                            id: 'devices-textfield-device-{record.id}'
                        },
                        listeners: {
                            focus: 'setFieldValue',
                            blur: {
                                fn: 'fieldBlurred',
                                el: 'element'
                            },
                            specialkey: 'onEnterPressed',
                            select: 'deviceSelected'
                        },
                        store: 'DeviceModels'
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
                        editable: false,
                        valueField: 'name',
                        displayField: 'name',
                        _skipSaveValidation: true,
                        hidden: true,
                        emptyText: Ngcp.csc.locales.pbxconfig.enter_new_extension[localStorage.getItem('languageSelected')],
                        bind: {
                            id: 'devices-textfield-extension-{record.id}'
                        },
                        listeners: {
                            focus: {
                                fn: 'setFieldValue'
                            },
                            blur: {
                                fn: 'fieldBlurred',
                                el: 'element'
                            },
                            specialkey: 'onEnterPressed'
                        },
                        store: 'Extensions'
                    }]
                }, {
                    name: 'extension2',
                    editable: false,
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
                        _skipSaveValidation: true,
                        valueField: 'name',
                        displayField: 'name',
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
                            blur: {
                                fn: 'fieldBlurred',
                                el: 'element'
                            },
                            specialkey: 'onEnterPressed'
                        },
                        store: "Extensions"
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
                        width: 500,
                        height: 500,
                        bind: {
                            html: '{record.imageWithButtons}',
                            hidden: '{!record.image}'
                        }
                    }, {
                        xtype: 'fieldset',
                        width: 200,
                        margin: '200 0 0 0',
                        collapsible: false,
                        hidden: true,
                        cls: 'devices-seat-fieldset',
                        defaults: {
                            xtype: 'label',
                            labelWidth: 50,
                            anchor: '100%'
                        },
                        bind: {
                            id: 'seat-show-panel-{record.id}'
                        },
                        items: [{
                            name: 'typeValue'
                        }]
                    }, {
                        xtype: 'fieldset',
                        margin: '200 0 0 0',
                        padding: '20 10 10 10',
                        width: 200,
                        collapsible: false,
                        hidden: true,
                        defaults: {
                            labelWidth: 40,
                            anchor: '100%'
                        },
                        bind: {
                            id: 'seat-edit-panel-{record.id}'
                        },
                        items: [{
                            xtype: 'combo',
                            editable: false,
                            name: 'typeValue',
                            valueField: 'name',
                            displayField: 'name',
                            _skipSaveValidation: true,
                            fieldLabel: 'Type',
                            store: 'SeatTypes',
                            allowBlank: false
                        }, {
                            xtype: 'combo',
                            editable: false,
                            _skipSaveValidation: true,
                            store: 'Seats',
                            name: 'seat',
                            displayField: 'name',
                            valueField: 'id',
                            fieldLabel: 'User',
                            allowBlank: false
                        }, {
                            xtype: 'buttongroup',
                            name: 'editBtns',
                            columns: 3,
                            cls: 'edit-panel',
                            border: 0,
                            defaults: {
                                width: 50
                            },
                            items: [{
                                iconCls: Ngcp.csc.icons.block,
                                handler: 'discardChanges',
                                tooltip: Ngcp.csc.locales.common.reset[localStorage.getItem('languageSelected')]
                            }, {
                                iconCls: Ngcp.csc.icons.trash,
                                handler: 'deleteSeat',
                                name: 'deleteBtn',
                                tooltip: Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')]
                            }, {
                                iconCls: Ngcp.csc.icons.floppy,
                                handler: 'saveSeat',
                                tooltip: Ngcp.csc.locales.common.save[localStorage.getItem('languageSelected')]
                            }]
                        }]
                    }]
                }, {
                    xtype: 'label',
                    bind: {
                        html: '<div class="card-wrapper"><div class="card-icon-row">' +
                            '<div id="cancelDevice-{record.id}" class="card-icon hidden" data-callback="cancelCard" data-qtip="' + Ngcp.csc.locales.pbxconfig.cancel_operation[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.block2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                            '<div id="removeDevice-{record.id}" class="card-icon" data-callback="removeCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_entry[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.trash2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                            '<div id="editDevice-{record.id}" class="card-icon" data-callback="editCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_entry[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.edit2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                            '</div></div>'
                    }
                }
            ]
        }
    }]
});
