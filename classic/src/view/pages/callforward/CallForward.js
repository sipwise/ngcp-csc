Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward',

    layout: 'responsivecolumn',

    scrollable: true,

    title: Ngcp.csc.locales.callforward.title[localStorage.getItem('languageSelected')],

    items: [{
        userCls: 'big-30 small-100',
        items: [{
            xtype: 'gridfilters',
            _linkedStoreId: 'CallForward',
            _hideDateFilters: true,
            _isNested: true
        }, {
            xtype: 'core-container',
            bind: {
                hidden: '{after_hours_form}'
            },
            title: Ngcp.csc.locales.callforward.time_two[localStorage.getItem('languageSelected')],
            items: [{
                xtype: 'datepicker',
                width: '100%'
            }]
        }, {
            xtype: 'core-container',
            bind: {
                hidden: '{company_hours_form}'
            },
            title: Ngcp.csc.locales.callforward.time_three[localStorage.getItem('languageSelected')],
            items: [{
                xtype: 'datepicker',
                width: '100%'
            }]
        }]
    }, {
        userCls: 'big-70 small-100',
        xtype: 'core-container',
        items: [{
            padding: '0 0 20 0',
            html: Ext.String.format('<div class="fa fa-mail-forward cf-subtitle"> {0}</div>', Ngcp.csc.locales.callforward.subtitle[localStorage.getItem('languageSelected')])
        }, {
            xtype: 'callforwardform'
        }]
    }]

});
