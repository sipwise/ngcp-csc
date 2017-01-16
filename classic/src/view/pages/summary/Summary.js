Ext.define('NgcpCsc.view.pages.summary.Summary', {
    extend: 'Ext.panel.Panel',

    xtype: 'summary',

    viewModel: 'summary',

    controller: 'summary',

    title: Ngcp.csc.locales.summary.title[localStorage.getItem('languageSelected')],

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
        title: 'Seats',
        xtype: 'summary-pie',
        name:'seats',
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
        title: 'Groups',
        xtype: 'summary-pie',
        name:'groups',
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
        title: 'Devices',
        xtype: 'summary-pie',
        name:'devices',
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
