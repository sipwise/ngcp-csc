Ext.define('NgcpCsc.view.pages.faxspool.FaxSpool', {
    extend: 'Ext.panel.Panel',

    xtype: 'faxspool',

    controller: 'faxspool',

    title: Ngcp.csc.locales.fax_spool.title[localStorage.getItem('languageSelected')],

    layout: 'responsivecolumn',

    scrollable: true,

    defaults: {
        padding: 20
    },

    initComponent: function() {
        this.items = [{
            userCls: 'big-80 small-100 white-box',
            items: [{
                height: 60,
                padding: '20 0 5 20',
                html: Ngcp.csc.locales.fax_spool.subtitle[localStorage.getItem('languageSelected')]
            }, {
                height: 60,
                padding: '5 0 0 20',
                html: Ext.String.format('<div class="faxspool-heading">{0} {1}</div>', Ngcp.csc.locales.fax_spool.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
            }, {
                xtype: 'faxspool-grid'
            }]
        }, {
            userCls: 'big-20 small-100 white-box',
            xtype: 'gridfilters',
            _linkedStoreId: 'FaxSpool'
        }];
        this.callParent();
    }
});
