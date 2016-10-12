Ext.define('NgcpCsc.view.pages.calls.CallsGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'calls-grid',

    layout: 'fit',

    store: 'Calls',

    // used to toggle grid columns headers visibility
    _showColHeaders: true,

    features: [{
        ftype: 'grouping',
        groupHeaderTpl: [
            '<div><b>{name:this.formatName}</b></div>', {
                formatName: function(name) {
                    return name.split('.')[1];
                }
            }
        ],
    }],

    padding: 10,

    initComponent: function() {
        var summaryView = (window.location.hash.substr(1) == 'desktop');
        this.columns = {
            defaults: {
                menuDisabled: true,
                resizable: false
            },
            items: [{
                dataIndex: 'call_type',
                renderer: 'renderCallTypeIcons',
                width: 30
            }, {
                text: (!summaryView) ? Ngcp.csc.locales.calls.columns.number[Ext.manifest.locale] : '',
                flex: 1,
                dataIndex: 'source_cli'
            }, {
                renderer: 'renderPhoneIcon',
                width: 30
            }, {
                text: (!summaryView) ? Ngcp.csc.locales.calls.columns.duration[Ext.manifest.locale] : '',
                flex: 1,
                dataIndex: 'duration'
            }, {
                text: (!summaryView) ? Ngcp.csc.locales.calls.columns.charges[Ext.manifest.locale] : '',
                flex: 1,
                dataIndex: 'charges'
            }, {
                xtype: 'datecolumn',
                text: (!summaryView) ? Ngcp.csc.locales.calls.columns.date[Ext.manifest.locale] : '',
                flex: 1,
                dataIndex: 'start_time',
                format: 'd-m-Y h:i:s'
            }]
        };

        this.callParent();
    }
})
