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
            text: 'Name',
            dataIndex: 'name',
            header: false,
            width: '96%'
        }]
    },
    userCls: Ext.os.is.Desktop ? 'pbx-widget-grid big-820' : 'pbx-widget-grid small-100',


    // TODO: 0. Add new functionality, add new empty row, and focus on first field
    // TODO: 1. Locales all the things
    // TODO: 2. XTemplate for numbers
    // TODO: 3. Add a delete/x-icon for deleting numbers
    // TODO: 4. When expanding card, the cards below are "pushed" down and out
    // of sight. Assumign related to issue we had in Conversations, where we
    // solved with view.grid.updateLayout()
    // TODO: 5. Remove any unneeded files/code
    // TODO: 6. Post on sencha forums about bound causing layout break
    // TODO: 7. Remove top border line

    plugins: [{
        // TODO: for groups and device use different Id to prevent conflicts
        pluginId:'rowwidget',
        ptype: 'rowwidget',
        widget: {
            xtype: 'form',
            defaultBindProperty: 'hidden',
            controller: 'pbxconfig', // Superfluous?
            bind: '{!record}',
            defaults: {
                layout: 'hbox'
            },

            items: [{
                name: 'extension',
                defaults: {
                    padding: '0 0 15 0'
                },
                items: [{
                    xtype: 'label',
                    cls: 'pbx-data-value',
                    text: 'Extension:', // TODO: Locales
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
                        // NOTE: Workaround to binding, as when binding is used any change
                        // in any record field triggers a layout break in the row which
                        // looks like row collapse, but in fact is not
                        // TODO: Move it to controller. cmp is the first param of callback
                        // and is the field itself. you can rename it as you want.
                        // http://docs.sencha.com/extjs/6.2.0/classic/Ext.form.field.Base.html#event-focus
                        focus: function(cmp) {
                            var recId = cmp.id.split("-")[2];
                            var store = Ext.getStore('Seats');
                            var rec = store.findRecord('id', recId);
                            this.setValue(rec.get('extension'));
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
                    text: 'Groups:', // TODO: Locales
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
                        focus: function(cmp) {
                            var recId = cmp.id.split("-")[2];
                            var store = Ext.getStore('Seats');
                            var rec = store.findRecord('id', recId);
                            this.setValue(rec.get('groups'));
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
                    text: 'Numbers:', // TODO: Locales
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
                        focus: function(cmp) {
                            var recId = cmp.id.split("-")[2];
                            var store = Ext.getStore('Seats');
                            var rec = store.findRecord('id', recId);
                            this.setValue(rec.get('numbers'));
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
                    text: 'Phone/devices:', // TODO: Locales
                    width: 120
                }, {
                    xtype: 'label',
                    bind: {
                        id: 'label-phone-{record.id}',
                        text: '{record.phone_devices}'
                    }
                }, {
                    xtype: 'textfield',
                    hidden: true,
                    bind: {
                        id: 'textfield-phone-{record.id}'
                    },
                    listeners: {
                        focus: function(cmp) {
                            var recId = cmp.id.split("-")[2];
                            var store = Ext.getStore('Seats');
                            var rec = store.findRecord('id', recId);
                            this.setValue(rec.get('phone_devices'));
                        }
                    }
                }]
            }, {
                xtype: 'label',
                bind: {
                    html: '<div class="card-wrapper"><div class="card-icon-row">' +
                    '<div id="removeSeat-{record.id}" class="card-icon" data-callback="removeSeat" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_seat[localStorage.getItem('languageSelected')] + '"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    '<div id="editSeat-{record.id}" class="card-icon" data-callback="editSeat" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_seat[localStorage.getItem('languageSelected')] + '"><i class="fa fa-edit green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    // '<div id="saveSeat-{record.id}" class="card-icon" data-callback="saveSeat" data-qtip="Save seat"><i class="fa fa-floppy-o green-icon fa-2x pointer" aria-hidden="true"></i></div>' + // TODO: Locales
                    '</div></div>'
                }
            }]
        }
    }]
});
