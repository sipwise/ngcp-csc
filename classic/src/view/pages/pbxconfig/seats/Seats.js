Ext.define('NgcpCsc.view.pages.pbxconfig.seats.Seats', {
    extend: 'Ext.panel.Panel',

    xtype: 'seats',

    viewModel: 'seats',

    controller: 'seats',

    layout: 'responsivecolumn',

    items: [{
        userCls: 'big-30 small-100',
        items: [{
            xtype: 'form',
            ui: 'core-container',
            padding: 20,
            margin: 10,
            reference: 'add-new-seat',
            hidden: true,
            defaults: {
                width: '98%'
            },
            items: [{
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{selection.name}',
                name:'seatName',
                fieldLabel: Ngcp.csc.locales.common.name[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{selection.extension}',
                fieldLabel: Ngcp.csc.locales.filters.extension[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{selection.groups}',
                renderer: 'renderSeatsText'
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{selection.numbers}',
                fieldLabel: Ngcp.csc.locales.filters.numbers[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{selection.phone_devices}',
                fieldLabel: Ngcp.csc.locales.filters.phone_devices[localStorage.getItem('languageSelected')]
            }, {
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
            reference:'addNewBtn',
            text: Ngcp.csc.locales.pbxconfig.add_new_seat[localStorage.getItem('languageSelected')],
            handler: 'addSeat'
        }]
    }]
});
