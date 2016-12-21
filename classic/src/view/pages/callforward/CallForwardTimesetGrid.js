Ext.define('NgcpCsc.view.pages.callforward.CallForwardTimesetGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'callforwardtimesetgrid',

    viewConfig: {
        markDirty: false
    },

    initComponent: function() {
        this.columns = {
            defaults: {
                menuDisabled: true,
                resizable: false
            },
            items: [{
                text: Ngcp.csc.locales.common.day[localStorage.getItem('languageSelected')],
                dataIndex: 'day',
                renderer: 'renderDay',
                flex: 1
            }, {
                text: Ngcp.csc.locales.common.from[localStorage.getItem('languageSelected')],
                dataIndex: 'time_from',
                xtype: 'widgetcolumn',
                editable: false,
                flex: 1,
                widget: {
                    xtype: 'timefield',
                    bind: {
                        disabled: '{record.closed}'
                    }
                }
            }, {
                text: Ngcp.csc.locales.common.to[localStorage.getItem('languageSelected')],
                dataIndex: 'time_to',
                xtype: 'widgetcolumn',
                editable: false,
                flex: 1,
                widget: {
                    xtype: 'timefield',
                    bind: {
                        disabled: '{record.closed}'
                    }
                }
            }, {
                text: Ngcp.csc.locales.callforward.closed[localStorage.getItem('languageSelected')],
                dataIndex: 'closed',
                xtype: 'actioncolumn',
                align: 'center',
                width: 80,
                items: [{
                    getClass: 'toggleClosedClass',
                    handler: 'toggleClosedState'
                }]
            }]
        };
        this.callParent();
    }

});
