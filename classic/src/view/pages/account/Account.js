Ext.define('NgcpCsc.view.pages.account.Account', {
    extend: 'Ext.panel.Panel',

    xtype: 'account',

    viewModel: 'account',

    controller: 'account',

    title: Ngcp.csc.locales.account.title[localStorage.getItem('languageSelected')],

    layout: 'responsivecolumn',

    defaults: {
        ui: 'core-container',
        margin: 10,
        userCls: 'big-33 small-100',
        bbar: [{
            text: 'Configure',
            handler: 'onConfigure',
            margin: 20
        }]
    },
    items: [{
        title: Ngcp.csc.locales.account.seats[localStorage.getItem('languageSelected')],
        xtype: 'account-pie',
        name: 'seats',
        store: {
            type: 'Chart',
            proxy: {
                type: 'ajax',
                url: '/resources/data/charts/seats.json',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }, {
        title: Ngcp.csc.locales.common.groups[localStorage.getItem('languageSelected')],
        xtype: 'account-pie',
        name: 'groups',
        store: {
            type: 'Chart',
            proxy: {
                type: 'ajax',
                url: '/resources/data/charts/groups.json',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }, {
        title: Ngcp.csc.locales.account.devices[localStorage.getItem('languageSelected')],
        xtype: 'account-pie',
        name: 'devices',
        store: {
            type: 'Chart',
            proxy: {
                type: 'ajax',
                url: '/resources/data/charts/devices.json',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }]
});
