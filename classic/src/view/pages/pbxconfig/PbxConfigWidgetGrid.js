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

    // DONE: 1a. Toggle visibility of fields based on cmpId
    // DONE: 1b. Toggle visibility of labels based on cmpId
    // DONE: 1c. Add all listeners and create ids in view
    // DONE: 1d. Prepare for ability to save corresp record to store if dirty
    // TODO: 2a. Create controller for "edit ___" in icon row, to toggle all
    // corresp row fields visible, set a vm value clicked_edit_card to true,
    // and on saveRecord hide all fields if clicked_edit_card is true
    // TODO: 2b. Create/fix icon row in view
    // TODO: 3. Make whole name column card header clickable to toggle collapse/
    // expand with events collapsebody and expandbody
    // TODO: 4. Remove top border line
    // TODO: 5. Locales all the things
    // TODO: 6. Add a delete/x-icon for deleting numbers
    // TODO: 7. XTemplate for numbers

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
                        value: '{record.extension}'
                    },
                    listeners: {
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
                // you can either define html here, or place a bottom toolbar outside items
                xtype: 'container',
                bind: {
                    html: 'text' // copy the XTemplate from grid definition, and replace record.get(<fieldname>) with {record.<fieldname>}
                }
            }]
        }
    }]
});
