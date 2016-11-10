Ext.define('NgcpCsc.view.pages.callforward.CallForwardTpl', {
    extend: 'Ext.view.View',

    xtype: 'callforward-tpl',
    store: 'CallForward',
    viewModel: 'callforward',
    itemSelector: 'div.ngcp-sm-card',
    emptyText: 'No call forwards available',
    layout: 'fit',

    padding: 20,

    initComponent: function() {

        var cardTpl = new Ext.XTemplate(
            '<div class="ngcp-row">',
                '<tpl for=".">',
                    '<div class="ngcp-col-1-4 ngcp-sm-card">',
                        '<span class="ngcp-card-headline">From:</span>',
                        '<br/><span class="ngcp-card-p">{from}</span>',
                    '</div>',
                '</tpl>',
            '</div>'
        );

        this.tpl = cardTpl,

        this.callParent();
    }

});
