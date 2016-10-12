Ext.define('NgcpCsc.view.pages.calls.Calls', {
    extend: 'Ext.panel.Panel',

    xtype: 'calls',

    controller: 'calls',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var callsGrid = Ext.create('NgcpCsc.view.pages.calls.CallsGrid');
        if (!this._isDesktopSection) {
            this.setTitle(Ngcp.csc.locales.calls.section_title[Ext.manifest.locale]);
        }
        this.items = [{
            flex: 4,
            defaults: {
                padding: 20
            },
            items: [{
                    html: Ngcp.csc.locales.calls.recent_calls[Ext.manifest.locale],
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
                        html: Ext.String.format('<span class="fa fa-arrow-circle-up calls-icon"></span><span>{0}</span>', Ngcp.csc.locales.calls.call_type.incoming[Ext.manifest.locale])
                    }, {
                        html: Ext.String.format('<span class="fa fa-arrow-circle-down calls-icon"></span><span>{0}</span>', Ngcp.csc.locales.calls.call_type.outgoing[Ext.manifest.locale])
                    }, {
                        html: Ext.String.format('<span class="fa fa-arrow-circle-right calls-icon"></span><span>{0}</span>', Ngcp.csc.locales.calls.call_type.forwarded[Ext.manifest.locale])
                    }]
                },
                callsGrid, {
                    xtype: 'container',
                    anchor: '100%',
                    height: 40,
                    padding: 10,
                    hidden: !this._isDesktopSection,
                    html: Ext.String.format('<div class="link">{0}</div>', Ngcp.csc.locales.calls.all_calls[Ext.manifest.locale]),
                    listeners: {
                        click: {
                            element: 'el',
                            fn: 'showAllCalls'
                        }
                    }
                }
            ]
        }, {
            flex: 1,
            xtype: 'gridfilters',
            hidden: this._isDesktopSection,
            _attachedCmp: callsGrid
        }];
        this.callParent();
    }
})
