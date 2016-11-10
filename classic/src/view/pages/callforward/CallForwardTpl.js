Ext.define('NgcpCsc.view.pages.callforward.CallForwardTpl', {
    extend: 'Ext.view.View',

    xtype: 'callforward-tpl',
    store: 'CallForward',
    controller: 'callforward',
    viewModel: 'callforward',
    itemSelector: 'div.ngcp-sm-card',
    emptyText: 'No call forwards available',
    layout: 'fit',

    padding: 20,

    listeners: {
        itemclick: 'clickSmCard'
    },

    removeBarrNumber: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = grid.getStore().getAt(rowIndex);
        store.remove(rec);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    initComponent: function() {

        var cardTpl = new Ext.XTemplate(
            '<div class="ngcp-row">',
                '<tpl for=".">',
                    '<div class="ngcp-col-1-4 ngcp-sm-card">',
                        '<div class="divTable">',
                            '<div class="divTableBody">',
                                '<div class="divTableRow">',
                                    '<div class="divTableCell"><span class="ngcp-card-headline">From:</span></div>',
                                    '<div class="divTableCell"><span class="ngcp-card-headline-when">When:</span></div>',
                                    '<div class="divTableCell"><span class="ngcp-card-headline">To:</span></div>',
                                    '</div>',
                                '<div class="divTableRow">',
                                    '<div class="divTableCell"><span class="ngcp-card-p">{from}</span></div>',
                                    '<div class="divTableCell"><span class="ngcp-card-p-when">{when}</span></div>',
                                    '<div class="divTableCell"><span class="ngcp-card-p">{to}</span></div>',
                                '</div>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</tpl>',
            '</div>'
        );

        this.tpl = cardTpl,

        this.callParent();
    }

});
