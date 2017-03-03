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

    // TODO: 1. Click controller to toggle visibility of fields/labels
    // TODO: 2. Fix icon row
    // TODO: 3. Remove top border line
    // TODO: 4. Locales all the things
    // TODO: 5. Add a delete/x-icon for deleting numbers
    // TODO: 6. XTemplate for numbers

    plugins: [{
        ptype: 'rowwidget',
        widget: {
            xtype: 'form',
            controller: 'pbxconfig',
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
                    text: 'Extension:', // to locales :)
                    width: 120
                }, {
                    xtype: 'label',
                    bind: {
                        id: 'label-extension-{record.id}',
                        html: '{record.extension}'
                    },
                    listeners: {
                        // Workound due to rowwidget click listeners not working
                        afterrender: function(cmp){
                        	cmp.getEl().addListener('click', function(){
                        		cmp.fireEvent('label-clicked', cmp.id)
                        	}, this)
                        }
                    }
                }, {
                    xtype: 'textfield',
                    itemId: 'textfield-extension-1',
                    hidden: true,
                    bind: {
                        value: '{record.extension}'
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
                    text: 'Groups:', // to locales :)
                    width: 120
                }, {
                    xtype: 'label',
                    bind: {
                        text: '{record.groups}'
                    },
                    listeners: {
                        click: {
                            fn: 'toggleEdit', // change visibility of associated textfield / numberfield
                            el: 'element'
                        }
                    }
                }, {
                    xtype: 'textfield',
                    hidden: true,
                    bind: {
                        value: '{record.groups}'
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
                    text: 'Numbers:', // to locales :)
                    width: 120
                }, {
                    xtype: 'label',
                    bind: {
                        text: '{record.numbers}'
                    },
                    listeners: {
                        click: {
                            fn: 'toggleEdit', // change visibility of associated textfield / numberfield
                            el: 'element'
                        }
                    }
                }, {
                    xtype: 'textfield',
                    hidden: true,
                    bind: {
                        value: '{record.numbers}'
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
                    text: 'Phone/devices:', // to locales :)
                    width: 120
                }, {
                    xtype: 'label',
                    bind: {
                        text: '{record.phone_devices}'
                    },
                    listeners: {
                        click: {
                            fn: 'toggleEdit', // change visibility of associated textfield / numberfield
                            el: 'element'
                        }
                    }
                }, {
                    xtype: 'textfield',
                    hidden: true,
                    bind: {
                        value: '{record.phone_devices}'
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
