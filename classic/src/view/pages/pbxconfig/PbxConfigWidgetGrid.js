Ext.define('NgcpCsc.view.pages.PbxConfigWidgetGrid', {
    extend: 'NgcpCsc.view.core.GridCards',

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

    // DONE: 1. Fixed width for labels (already done? check master to see what Andreas saw)
    // DONE: 2. Move focus listeners to controller
    // DONE: 3a. "Add new" functionality, add new empty row, and focus on first field
    // DONE: 3b. Add renderer to account for empty "name" column
    // TODO: 3c. Add placeholder text if empty "name" value (or fill in value)
    // TODO: 4. Issue when more cards than view allows, layout pushed to left
    // TODO: 5. Remove top border line
    // TODO: 6. Replicate Seats for Groups and Devices
    // TODO: 7. Remove any unneeded files/code

    plugins: [{
        // TODO: for groups and device use different Id to prevent conflicts
        pluginId:'rowwidget',
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
                        id: 'mainlabel-name-{record.id}'
                    },
                    hidden: true,
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.pbxconfig.name[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'label',
                    hidden: true,
                    bind: {
                        id: 'label-name-{record.id}',
                        text: '{record.name}'
                    }
                }, {
                    xtype: 'textfield',
                    hidden: true,
                    bind: {
                        id: 'textfield-name-{record.id}'
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
                name: 'extension',
                defaults: {
                    padding: '0 0 15 0'
                },
                items: [{
                    xtype: 'label',
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.pbxconfig.extension[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'label',
                    bind: {
                        id: 'label-extension-{record.id}',
                        text: '{record.extension}'
                    },

                }, {
                    xtype: 'textfield',
                    hidden: true,
                    bind: {
                        id: 'textfield-extension-{record.id}'
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        }
                    }
                }]
            }, {
                name: 'groups',
                defaults: {
                    padding: '0 0 15 0'
                },
                items: [{
                    xtype: 'label',
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.pbxconfig.groups[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'label',
                    bind: {
                        id: 'label-groups-{record.id}',
                        text: '{record.groups}'
                    }
                }, {
                    xtype: 'textfield',
                    hidden: true,
                    bind: {
                        id: 'textfield-groups-{record.id}'
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        }
                    }
                }]
            }, {
                name: 'numbers',
                defaults: {
                    padding: '0 0 15 0'
                },
                items: [{
                    xtype: 'label',
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.pbxconfig.numbers[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'label',
                    bind: {
                        id: 'label-numbers-{record.id}',
                        text: '{record.numbers}'
                    }
                }, {
                    xtype: 'textfield',
                    hidden: true,
                    bind: {
                        id: 'textfield-numbers-{record.id}'
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        }
                    }
                }]
            }, {
                name: 'phone_devices',
                defaults: {
                    padding: '0 0 15 0'
                },
                items: [{
                    xtype: 'label',
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.pbxconfig.phone_devices[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'label',
                    bind: {
                        id: 'label-phone_devices-{record.id}',
                        text: '{record.phone_devices}'
                    }
                }, {
                    xtype: 'textfield',
                    hidden: true,
                    bind: {
                        id: 'textfield-phone_devices-{record.id}'
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
                    '<div id="removeSeat-{record.id}" class="card-icon" data-callback="removeCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_seat[localStorage.getItem('languageSelected')] + '"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    '<div id="editSeat-{record.id}" class="card-icon" data-callback="editSeat" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_seat[localStorage.getItem('languageSelected')] + '"><i class="fa fa-edit green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    '</div></div>'
                }
            }]
        }
    }]
});
