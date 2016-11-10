Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward',

    layout: 'responsivecolumn',

    title: Ngcp.csc.locales.callforward.title[localStorage.getItem('languageSelected')],

    items: [{
        userCls: 'big-30 small-100',
        xtype: 'gridfilters',
        _linkedStoreId: 'CallForward',
        _hideDateFilters: true,
        _isNested: true
    }, {
        userCls: 'big-70 small-100',
        xtype: 'core-container',
        items: [{
            padding: '0 0 10 20',
            html: Ngcp.csc.locales.callforward.subtitle[localStorage.getItem('languageSelected')]
        }, {
            height: 60,
            padding: '5 0 0 20',
            html: Ext.String.format('<div class="addressbook-heading">{0} {1}</div>', Ngcp.csc.locales.callforward.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
        }, {
            html: 'Here comes the form.'
        }]
    }]

});
