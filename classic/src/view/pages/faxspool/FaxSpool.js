Ext.define('NgcpCsc.view.pages.faxspool.FaxSpool', {
    extend: 'Ext.panel.Panel',

    xtype: 'faxspool',

    controller: 'faxspool',

    title: Ngcp.csc.locales.faxspool.title[localStorage.getItem('languageSelected')],

    layout: 'responsivecolumn',

    initComponent: function() {
        this.items = [{
            userCls: 'big-30 small-100',
            xtype: 'gridfilters',
            _linkedStoreId: 'FaxSpool'
        },{
            userCls: 'big-70 small-100',
            xtype:'core-container',
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
        }];
        this.callParent();
    }
});
