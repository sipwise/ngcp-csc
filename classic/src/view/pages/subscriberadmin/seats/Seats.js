Ext.define('NgcpCsc.view.pages.subscriberadmin.seats.Seats', {
    extend: 'Ext.panel.Panel',

    xtype: 'seats',

    viewModel: 'seats',

    controller: 'seats',

    title: Ngcp.csc.locales.subscriberadmin.title[localStorage.getItem('languageSelected')],

    layout: 'responsivecolumn',

    items: [{
        userCls: 'big-30 small-100',
        items: [{
            xtype: 'gridfilters',
            padding: 0,
            _linkedStoreId: 'Seats',
            _subscriberAdmin: true
        }, {
            xtype:'form',
            ui: 'core-container',
            padding: 20,
            margin:10,
            reference: 'add-new-seat',
            hidden: true,
            defaults: {
                width: '98%'
            },
            items: [{
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{selection.name}',
                fieldLabel: Ngcp.csc.locales.common.name[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{selection.extension}',
                fieldLabel: Ngcp.csc.locales.filters.extensions[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{selection.groups}',
                fieldLabel: Ngcp.csc.locales.filters.groups[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{selection.pbx_devices}',
                fieldLabel: Ngcp.csc.locales.filters.pbx_devices[localStorage.getItem('languageSelected')]
            },{
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
            xtype: 'seats-grid'
        }, {
            margin: 10,
            xtype: 'button',
            text: Ngcp.csc.locales.subscriberadmin.add_new_seat[localStorage.getItem('languageSelected')],
            handler: 'addSeat'
        }]
    }]
});
