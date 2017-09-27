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
                flex: 1
            }, {
                text: Ngcp.csc.locales.common.from[localStorage.getItem('languageSelected')],
                dataIndex: 'time_from',
                xtype: 'widgetcolumn',
                editable: false,
                flex: 1,
                widget: {
                    xtype: 'timefield',
                    margin: '8 0 0 0',
                    tooltip: Ngcp.csc.locales.callforward.tooltips.change_time_from[localStorage.getItem('languageSelected')],
                    bind: {
                        value: '{record.time_from}'
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
                    margin: '8 0 0 0',
                    tooltip: Ngcp.csc.locales.callforward.tooltips.change_time_to[localStorage.getItem('languageSelected')],
                    bind: {
                        value: '{record.time_to}'
                    }
                }
            }, {
                xtype: 'actioncolumn',
                width: 30,
                items: [{
                    iconCls: Ngcp.csc.icons.trash,
                    tooltip:  Ngcp.csc.locales.filters.tooltips.remove_entry[localStorage.getItem('languageSelected')],
                    handler: 'removePeriod'
                }]
            }]
        };
        this.callParent();
    }

});
