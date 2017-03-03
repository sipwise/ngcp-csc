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


    // DONE: 1a. Implement a third button for saving, either greyed out or hidden,
    // in the icon row.
    // TODO: 1b. Remove blur listeners, and rewrite saveRecord to setText for labels
    // if field isNot empty
    // TODO: 2. Make whole name column card header clickable to toggle collapse/
    // expand with events collapsebody and expandbody
    // TODO: 3. Remove top border line
    // TODO: 4. Locales all the things
    // TODO: 5. Add a delete/x-icon for deleting numbers
    // TODO: 6. XTemplate for numbers
    // TODO: 7. When expanding card, the cards below are "pushed" down and out
    // of sight. Assumign related to issue we had in Conversations, where we
    // solved with view.grid.updateLayout()
    // TODO: 8. Remove any unneeded files/code
    // TODO: 9. Post on sencha forums about bound causing layout break

    plugins: [{
        pluginId:'rowwidget',
        ptype: 'rowwidget',
        widget: {
            xtype: 'form',
            defaultBindProperty: 'hidden',
            controller: 'pbxconfig',
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
                    listeners: {
                        // Workound due to rowwidget click listeners not working
                        afterrender: function(cmp) {
                        	cmp.getEl().addListener('click', function(){
                        		cmp.fireEvent('label-clicked', cmp)
                        	}, this)
                        }
                    }
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
                        // XXX: Cvenusino: can we put this in controller? If so,
                        // how do we pass cmp (define with element:?) and this scope
                        // to controller?
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
                    },
                    listeners: {
                        afterrender: function(cmp) {
                        	cmp.getEl().addListener('click', function(){
                        		cmp.fireEvent('label-clicked', cmp)
                        	}, this)
                        }
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
                    },
                    listeners: {
                        afterrender: function(cmp) {
                        	cmp.getEl().addListener('click', function(){
                        		cmp.fireEvent('label-clicked', cmp)
                        	}, this)
                        }
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
                    },
                    listeners: {
                        afterrender: function(cmp) {
                        	cmp.getEl().addListener('click', function(){
                        		cmp.fireEvent('label-clicked', cmp)
                        	}, this)
                        }
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
                    '<div id="removeCard-{record.id}" class="card-icon" data-callback="removeCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_seat[localStorage.getItem('languageSelected')] + '"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    '<div id="editCard-{record.id}" class="card-icon" data-callback="editCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_seat[localStorage.getItem('languageSelected')] + '"><i class="fa fa-edit green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                    '<div id="saveCard-{record.id}" class="card-icon hidden" data-callback="saveCard" data-qtip="Save seat"><i class="fa fa-floppy-o green-icon fa-2x pointer" aria-hidden="true"></i></div>' + // TODO: Locales
                    '</div></div>'
                }
            }]
        }
    }]
});
