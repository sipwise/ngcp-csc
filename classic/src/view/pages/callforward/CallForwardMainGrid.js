Ext.define('NgcpCsc.view.pages.callforward.CallForwardMainGrid', {
    extend: 'Ext.grid.Panel',

    selModel: 'cellmodel',

    rowLines: false,
    width: '100%',
    hideHeaders: true,
    ui: 'cf-grid',
    minHeight: 70,

    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: Ngcp.csc.locales.callforward.drag_text[localStorage.getItem('languageSelected')]
        },
        markDirty: false,
        emptyText: Ngcp.csc.locales.callforward.forward_to[localStorage.getItem('languageSelected')] + '<span style="padding-left: 40px;">' + Ngcp.csc.locales.callforward.nowhere[localStorage.getItem('languageSelected')] + '</span>',
        deferEmptyText: false,
        stripeRows: false,
        listeners: {
            drop: 'destinationDropped'
        },
        getRowClass: function(record, index) {
            var afterTermination = record.get('after_termination');
            if (afterTermination) {
                return 'below-termination';
            } else {
                return 'above-termination';
            }
        }
    },

    listeners: {
        render: function(grid) {
           grid.mask('Loading...');
        },
        delay: 200
   },

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },

    initComponent: function() {
        var me = this;

        me.columns = [{
            dataIndex: 'label',
            width: 135
        }, {
            dataIndex: 'destination_displayed', // Renderer also uses timeout value
            width: 285,
            renderer: 'renderDestinationColumn'
        }, {
            text: Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')],
            xtype: 'actioncolumn',
            width: 30,
            align: 'right',
            iconCls: Ngcp.csc.icons.trash,
            handler: 'removeEntry'
        }, {
            text: Ngcp.csc.locales.callforward.move[localStorage.getItem('languageSelected')],
            xtype: 'actioncolumn',
            width: 30,
            align: 'right',
            disabled: true,
            iconCls: Ngcp.csc.icons.move
        }];

        me.callParent();

    }

});
