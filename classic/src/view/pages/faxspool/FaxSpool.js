Ext.define('NgcpCsc.view.pages.faxspool.FaxSpool', {
    extend: 'Ext.panel.Panel',

    xtype: 'faxspool',

    controller: 'faxspool',

    title: Ngcp.csc.locales.faxspool.title[localStorage.getItem('languageSelected')],

    layout: 'responsivecolumn',

    initComponent: function() {
        this.items = [{
            userCls: 'big-70 small-100 white-box',
            padding:30,
            items: [{
                height: 40,
                html: Ngcp.csc.locales.faxspool.subtitle[localStorage.getItem('languageSelected')]
            }, {
                height: 80,
                padding: '5 0 0 0',
                html: Ext.String.format('<div class="faxspool-heading">{0} {1}</div>', Ngcp.csc.locales.faxspool.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
            }, {
                xtype: 'faxspool-grid'
            }]
        }, {
            userCls: 'big-30 small-100 white-box',
            padding:20,
            xtype: 'gridfilters',
            _linkedStoreId: 'FaxSpool'
        }];
        this.callParent();
    }
});
