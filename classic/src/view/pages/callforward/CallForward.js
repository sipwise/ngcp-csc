Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.view.View',

    xtype: 'callforward',
    store: 'CallForward',
    controller: 'callforward',
    viewModel: 'callforward',
    itemSelector: 'div.ngcp-md-card',
    emptyText: 'No call forwards available',
    layout: 'fit',

    padding: 20,

    listeners: {
        itemclick: 'clickMdCard'
    },

    initComponent: function() {

        var cfTypeTpl = new Ext.XTemplate(
            '<div class="ngcp-row">',
                //'<tpl for=".">',
                    '<div class="ngcp-col-1-2 ngcp-md-card">',
                        //'<span class="ngcp-card-p">{cfTypeArray[0]}</span>'
                        '<span class="ngcp-card-cftype">ALWAYS</span>',
                    '</div>',
                    '<div class="ngcp-col-1-2 ngcp-md-card">',
                        //'<span class="ngcp-card-p">{cfTypeArray[1]}</span>'
                        '<span class="ngcp-card-cftype">ON BUSY</span>',
                    '</div>',
                    '<div class="ngcp-col-1-2 ngcp-md-card">',
                        //'<span class="ngcp-card-p">{cfTypeArray[1]}</span>'
                        '<span class="ngcp-card-cftype">NO ANSWER</span>',
                    '</div>',
                    '<div class="ngcp-col-1-2 ngcp-md-card">',
                        //'<span class="ngcp-card-p">{cfTypeArray[1]}</span>'
                        '<span class="ngcp-card-cftype">UNAVAILABLE</span>',
                    '</div>',
                //'</tpl>',
            '</div>'
        );

        this.tpl = cfTypeTpl;

        this.callParent();
    }

});
