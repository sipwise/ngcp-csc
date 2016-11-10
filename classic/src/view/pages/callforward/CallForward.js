Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    controller: 'callforward',

    viewModel: 'callforward',

    layout: 'responsivecolumn',

    title: Ngcp.csc.locales.callforward.title[localStorage.getItem('languageSelected')],

    // TODO: 1. Fix scroll issue (related to main container?) (afterRender redraw
    //          height of window)
    // TODO: 2. Create tickets for:
    //      a) implement change timeset hours widget
    //      b) implement filtering for time - and sourceset combinations, either
    //         only dummy filter for now (as in other modules), or actual filtering
    //         -- wait with until agranig has commented, and/or cvenusino has
    //         implemented new filtering with unified inbox task

    listeners: {
        afterrender: function() {
            var me = this;
            var height = Ext.Element.getViewportHeight() - 64;
            // TODO
        }
    },

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
            title: 'AFTER HOURS',
            items: [{
                xtype: 'datepicker',
                width: '100%'
            }]
        }, {
            xtype: 'core-container',
            bind: {
                hidden: '{company_hours_form}'
            },
            title: 'COMPANY HOURS',
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
