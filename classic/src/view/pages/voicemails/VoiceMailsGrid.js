Ext.define('NgcpCsc.view.pages.voicemails.VoiceMailsGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'voicemails-grid',

    layout: 'fit',

    bind: {
        store: '{voicemails}'
    },

    padding: 10,

    listeners: {
        cellclick:'onCellClicked'
    },

    columns: {
        defaults: {
            menuDisabled: true,
            resizable: false
        },
        items: [{
            xtype: 'actioncolumn',
            width: 30,
            items: [{
                glyph: 'xf1c7@FontAwesome',
                tooltip: Ngcp.csc.locales.common.listen[localStorage.getItem('languageSelected')],
                handler: 'reproduceVoicemail'
            }]
        }, {
            flex: 1,
            dataIndex: 'caller',
            text: Ngcp.csc.locales.common.caller[localStorage.getItem('languageSelected')],
            renderer: 'renderCaller'
        }, {
            dataIndex: 'href',
            renderer: 'renderCall',
            width: 30
        }, {
            flex: 1,
            dataIndex: 'duration',
            text: Ngcp.csc.locales.common.duration[localStorage.getItem('languageSelected')]
        }, {
            flex: 1,
            xtype:'datecolumn',
            dataIndex: 'time',
            text: Ngcp.csc.locales.common.date[localStorage.getItem('languageSelected')],
            format: 'd.m.Y h:i:s',
            align: 'right'
        }, {
            xtype: 'actioncolumn',
            width: 30,
            align: 'right',
            items: [{
                glyph: 'xf00d@FontAwesome',
                tooltip: Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')],
                handler: 'removeVoicemail'
            }]
        }]
    }
})
