Ext.define('NgcpCsc.view.pages.subscriberadmin.devices.Devices', {
    extend: 'Ext.panel.Panel',

    xtype: 'devices',

    viewModel: 'devices',

    controller: 'devices',

    title: Ngcp.csc.locales.subscriberadmin.title[localStorage.getItem('languageSelected')],

    layout: 'responsivecolumn',

    items: [{
        userCls: 'big-30 small-100',
        items: [{
            xtype: 'gridfilters',
            padding: 0,
            _linkedStoreId: 'Devices',
            _subscriberAdminDevices: true
        }, {
            xtype:'form',
            ui: 'core-container',
            padding: 20,
            margin:10,
            reference: 'add-new-device',
            hidden: true,
            defaults: {
                width: '98%'
            },
            items: [{
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{selection.name}',
                fieldLabel: Ngcp.csc.locales.filters.name[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{selection.extension}',
                fieldLabel: Ngcp.csc.locales.filters.extensions[localStorage.getItem('languageSelected')]
            },{
                xtype: 'filefield',
                labelAlign: 'top',
                fieldLabel: Ngcp.csc.locales.filters.pbx_image[localStorage.getItem('languageSelected')],
                bind: {
                    value: '{selection.image}'
                }
            },
            // Todo destinations grid
            {
                xtype: 'radiogroup',
                labelAlign: 'top',
                bind: '{selection.status}',
                simpleValue: true,
                items: [{
                    boxLabel: Ngcp.csc.locales.filters.enabled[localStorage.getItem('languageSelected')],
                    inputValue: 'enabled'
                }, {
                    boxLabel: Ngcp.csc.locales.filters.disabled[localStorage.getItem('languageSelected')],
                    inputValue: 'disabled'
                }]
            },
            {
                layout: 'hbox',
                xtype: 'container',
                defaults: {
                    xtype: 'button',
                    flex: 1
                },
                items: [{
                    text: Ngcp.csc.locales.common.reset[localStorage.getItem('languageSelected')],
                    margin: '0 5 0 0',
                    handler: 'resetChanges'
                }, {
                    text: Ngcp.csc.locales.common.save[localStorage.getItem('languageSelected')],
                    handler: 'saveChanges'
                }]
            }]
        }]
    }, {
        userCls: 'big-70 small-100',
        items: [{
            xtype: 'devices-grid'
        }, {
            margin: 10,
            xtype: 'button',
            text: Ngcp.csc.locales.subscriberadmin.add_new_device[localStorage.getItem('languageSelected')],
            handler: 'addDevice'
        }]
    }]
});
