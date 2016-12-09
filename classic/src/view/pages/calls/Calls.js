Ext.define('NgcpCsc.view.pages.calls.Calls', {
    extend: 'Ext.panel.Panel',

    xtype: 'calls',

    controller: 'calls',

    defaults: {
        padding: 20
    },

    initComponent: function() {
        var callsGrid = Ext.create('NgcpCsc.view.pages.calls.CallsGrid', {
            _groupCallsByMonth: !this._isDesktopSection
        });
        if (!this._isDesktopSection) {
            this.setTitle(Ngcp.csc.locales.calls.section_title[localStorage.getItem('languageSelected')]);
            this.setLayout('responsivecolumn');
        }
        this.items = [Ext.create('NgcpCsc.view.common.gridfilters.GridFilters',{
            userCls: 'big-30 small-100 white-box',
            hidden: this._isDesktopSection,
            _linkedStoreId: 'Calls'
        }), {
            padding:  30,
            userCls: (!this._isDesktopSection) ? 'big-70 small-100 white-box' : '',
            items: [{
                    html: Ngcp.csc.locales.calls.recent_calls[localStorage.getItem('languageSelected')],
                    padding: '0 0 20 0'
                }, {
                    xtype: 'container',
                    anchor: '100%',
                    height: 40,
                    padding: 10,
                    layout: 'hbox',
                    defaults: {
                        xtype: 'container',
                        width: 120,
                        height: 20
                    },
                    items: [{
                        html: Ext.String.format('<span class="fa fa-arrow-circle-up calls-icon"></span><span>{0}</span>', Ngcp.csc.locales.calls.call_type.incoming[localStorage.getItem('languageSelected')])
                    }, {
                        html: Ext.String.format('<span class="fa fa-arrow-circle-down calls-icon"></span><span>{0}</span>', Ngcp.csc.locales.calls.call_type.outgoing[localStorage.getItem('languageSelected')])
                    }, {
                        html: Ext.String.format('<span class="fa fa-arrow-circle-right calls-icon"></span><span>{0}</span>', Ngcp.csc.locales.calls.call_type.forwarded[localStorage.getItem('languageSelected')])
                    }]
                },
                callsGrid, {
                    xtype: 'container',
                    anchor: '100%',
                    height: 40,
                    padding: 10,
                    hidden: !this._isDesktopSection,
                    html: Ext.String.format('<div class="link">{0}</div>', Ngcp.csc.locales.calls.all_calls[localStorage.getItem('languageSelected')]),
                    listeners: {
                        click: {
                            element: 'el',
                            fn: 'showAllCalls'
                        }
                    }
                }
            ]
        }];
        this.callParent();
    }
})
