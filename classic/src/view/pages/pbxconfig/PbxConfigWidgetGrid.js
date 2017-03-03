Ext.define('NgcpCsc.view.pages.PbxConfigWidgetGrid', {
    extend: 'NgcpCsc.view.core.GridCards',

    viewConfig: {
        stripeRows: false,
        enableTextSelection: true
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

    // DONE: 1aa. Create/fix icon row in view
    // TODO: 1ab. Fix onclick for icons
    // TODO: 1b. Create editCard for edit icon row to toggle all
    // corresp row fields visible, set a vm value clicked_edit_card to true,
    // and on saveRecord hide all fields if clicked_edit_card is true
    // TODO: 1c. Rewrite removeCard in controller
    // TODO: 2a. Update the label in saveRecord callback on field blur
    // TODO: 2b. Remove bind and add focus listener to other labels
    // TODO: 3. Make whole name column card header clickable to toggle collapse/
    // expand with events collapsebody and expandbody
    // TODO: 4. Remove top border line
    // TODO: 5. Locales all the things
    // TODO: 6. Add a delete/x-icon for deleting numbers
    // TODO: 7. XTemplate for numbers
    // TODO: 8. Post on sencha forums about bound causing layout break

    plugins: [{
        ptype: 'rowwidget',
        widget: {
            xtype: 'form',
            defaultBindProperty: 'hidden',
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
                        id: 'textfield-extension-{record.id}',
                    },
                    listeners: {
                        // Workaround to binding, as when binding is used any change
                        // in any record field triggers a layout break in the row which
                        // looks like row collapse, but in fact is not
                        focus:function(cmp){
                            var recId = cmp.id.split("-")[2];
                            var store = Ext.getStore('Seats');
                            var rec = store.findRecord('id', recId);
                            this.setValue(rec.get('extension'));
                        },
                        blur: 'saveRecord'
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
                        id: 'textfield-groups-{record.id}',
                        value: '{record.groups}'
                    },
                    listeners: {
                        blur: 'saveRecord'
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
                        id: 'textfield-numbers-{record.id}',
                        value: '{record.numbers}'
                    },
                    listeners: {
                        blur: 'saveRecord'
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
                        id: 'textfield-phone-{record.id}',
                        value: '{record.phone_devices}'
                    },
                    listeners: {
                        blur: 'saveRecord'
                    }
                }]
            }, {
                xtype: 'label',
                html: '<div class="card-wrapper"><div class="card-icon-row">' +
                '<div id="removeCard-{record.id}" class="card-icon" data-callback="removeCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_seat[localStorage.getItem('languageSelected')] + '"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true" onClick="onIconClicked"></i></div>' +
                '<div id="editCard-{record.id}" class="card-icon" data-callback="editCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_seat[localStorage.getItem('languageSelected')] + '"><i class="fa fa-edit green-icon fa-2x pointer" aria-hidden="true" onClick="onIconClicked"></i></div>' +
                '</div></div>'
            }]
        }
    }]
});
