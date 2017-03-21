Ext.define('NgcpCsc.view.pages.callforward.afterhours.AfterHoursTabPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'afterhourstabpanel',

    listeners: {
        click: {
            fn: 'onEditClicked',
            element: 'el',
            delegate: '.cf-edit'
        }
    },

    frame: true,
    width: 400,
    height: 300,
    defaults: {
        bodyPadding: 10,
        scrollable: true
    },
    items: [{
        title: Ngcp.csc.locales.callforward.source_one[localStorage.getItem('languageSelected')],
        iconCls: Ngcp.csc.icons.pencil + ' cf-edit afterhours-tab-everybody',
        iconAlign: 'right',
        html: 'Here goes the content of source one'
    }, {
        title: Ngcp.csc.locales.callforward.source_two[localStorage.getItem('languageSelected')],
        iconCls: Ngcp.csc.icons.pencil + ' cf-edit afterhours-tab-list-a',
        iconAlign: 'right',
        itemId: 'afterhours-tab-list-a',
        html: 'Here goes the content of source two'
    }, {
        title: Ngcp.csc.locales.callforward.source_three[localStorage.getItem('languageSelected')],
        iconCls: Ngcp.csc.icons.pencil + ' cf-edit afterhours-tab-list-b',
        iconAlign: 'right',
        itemId: 'afterhours-tab-list-b',
        html: 'Here goes the content of source three'
    }]

});
