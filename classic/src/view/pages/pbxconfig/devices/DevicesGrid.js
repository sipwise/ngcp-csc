Ext.define('NgcpCsc.view.pages.pbxconfig.devices.DevicesGrid', {
    extend: 'NgcpCsc.view.core.GridCards',

    // XXX: Cvenusino: Adding this makes top card border-top go away, but
    // removed the whole border. The css only sets 'border-width: 0', which
    // works for conversations and callblocking modules. Could you please look
    // into this?
    cls: 'card-grid',
    reference: 'devicesGrid',
    store: 'Devices',

    viewConfig: {
        stripeRows: false,
        enableTextSelection: true
    },

    listeners: {
        click: {
            fn: 'onIconClicked',
            element: 'el',
            delegate: 'div.card-icon'
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
            xtype: 'form',
            defaultBindProperty: 'hidden',
            bind: '{!record}',
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
                    text: Ngcp.csc.locales.pbxconfig.name[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'label',
                    hidden: true,
                    bind: {
                        id: 'devices-label-name-{record.id}',
                        text: '{record.name}'
                    }
                }, {
                    xtype: 'textfield',
                    required: true,
                    hidden: true,
                    emptyText: 'Enter new name',
                    bind: {
                        id: 'devices-textfield-name-{record.id}'
                    },
                    listeners: {
                        // NOTE: Workaround. Issue when binding is used, any
                        // change in any record field triggers a layout break in
                        // the row which looks like row collapse, but is not
                        focus: {
                            fn: 'setFieldValue'
                        }
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
                    bind: {
                        id: 'devices-label-device-{record.id}',
                        text: '{record.device}'
                    }
                }, {
                    xtype: 'textfield',
                    required: true,
                    hidden: true,
                    emptyText: 'Enter new device',
                    bind: {
                        id: 'devices-textfield-device-{record.id}'
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        }
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
                    bind: {
                        id: 'devices-label-mac-{record.id}',
                        text: '{record.mac}'
                    }
                }, {
                    xtype: 'textfield',
                    required: true,
                    hidden: true,
                    emptyText: 'Enter new mac address',
                    bind: {
                        id: 'devices-textfield-mac-{record.id}'
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        }
                    }
                }]
            }, {
                name: 'status',
                defaults: {
                    padding: '0 0 15 0'
                },
                items: [{
                    xtype: 'label',
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.pbxconfig.status[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'label',
                    bind: {
                        id: 'devices-label-status-{record.id}',
                        text: '{record.status}'
                    }
                }, {
                    xtype: 'textfield',
                    required: true,
                    hidden: true,
                    emptyText: 'Enter new status',
                    bind: {
                        id: 'devices-textfield-status-{record.id}'
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        }
                    }
                }]
            }, {
                xtype: 'label',
                bind: {
                    html: '<div class="card-wrapper"><div class="card-icon-row">' +
                    '<div id="removeDevice-{record.id}" class="card-icon" data-callback="removeCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_seat[localStorage.getItem('languageSelected')] + '"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    '<div id="editDevice-{record.id}" class="card-icon" data-callback="editCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_seat[localStorage.getItem('languageSelected')] + '"><i class="fa fa-edit green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    '</div></div>'
                }
            }]
        }
    }]
});
