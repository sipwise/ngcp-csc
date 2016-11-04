Ext.define('NgcpCsc.view.pages.addressbook.AddressbookGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'addressbook-grid',

    layout: 'fit',

    store: 'Addressbook',

    padding: 10,

    initComponent: function() {
        this.columns = {
            defaults: {
                menuDisabled: true,
                resizable: false
            },
            items: [{
                renderer: 'renderToggleDetailsIcon',
                width: 30
            }, {
                text: Ngcp.csc.locales.addressbook.columns.name[localStorage.getItem('languageSelected')],
                flex: 1,
                dataIndex: 'name'
            }, {
                text: Ngcp.csc.locales.addressbook.columns.company[localStorage.getItem('languageSelected')],
                flex: 1,
                dataIndex: 'company'
            }, {
                renderer: 'renderPhoneIcon',
                width: 30
            }, {
                text: Ngcp.csc.locales.addressbook.columns.number[localStorage.getItem('languageSelected')],
                flex: 1,
                dataIndex: 'mobile'
            }, {
                xtype: 'actioncolumn',
                width: 30,
                align: 'right',
                items: [{
                    glyph: 'xf00d@FontAwesome',
                    tooltip: Ngcp.csc.locales.callbarring.delete[localStorage.getItem('languageSelected')],
                    handler: 'removeContact'
                }]
            }]
        };

        this.features = [{
            ftype: 'grouping',
            groupHeaderTpl: '{name}'
        }];

        this.callParent();
    }
});
