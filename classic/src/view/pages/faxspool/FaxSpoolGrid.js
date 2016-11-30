Ext.define('NgcpCsc.view.pages.faxspool.FaxSpoolGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'faxspool-grid',

    layout: 'fit',

    store: 'FaxSpool',

    padding: 10,

    columns: {
        defaults: {
            menuDisabled: true,
            resizable: false
        },
        items: [{
            xtype: 'actioncolumn',
            width: 30,
            items: [{
                glyph: 'xf0f6@FontAwesome',
                tooltip: Ngcp.csc.locales.common.view[localStorage.getItem('languageSelected')],
                handler: 'reproduceFax'
            }]
        }, {
            dataIndex: 'id',
            text: '#',
            width: 60
        }
        , {
            flex: 1,
            xtype:'datecolumn',
            dataIndex: 'timestamp',
            text: 'timestamp',
            format: 'd.m.Y h:i:s'
        }
        , {
            flex: 1,
            dataIndex: 'status',
            text: 'status'
        }, {
            flex: 1,
            dataIndex: 'duration',
            text: 'duration'
        }, {
            flex: 1,
            dataIndex: 'direction',
            text: 'direction'
        }, {
            flex: 1,
            dataIndex: 'caller',
            text: Ngcp.csc.locales.common.caller[localStorage.getItem('languageSelected')]
            //text: Ngcp.csc.locales.common.caller[localStorage.getItem('languageSelected')]
        }, {
            flex: 1,
            dataIndex: 'callee',
            text: 'callee'
        }, {
            flex: 1,
            dataIndex: 'pages',
            text: 'pages',
            align: 'right'
        }, {
            xtype: 'actioncolumn',
            width: 30,
            align: 'right',
            items: [{
                glyph: 'xf00d@FontAwesome',
                tooltip: Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')],
                handler: 'removeFax'
            }]
        }]
    }
})
