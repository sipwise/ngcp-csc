Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.view.View',

    xtype: 'callforward',
    store: 'CallForward',
    controller: 'callforward',
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
                    // TODO: Dynamically create callforward selection cards
                    // instead, by creating a new "boxes"/"cf-categories" store,
                    // with "name:" and "enabled:" true/false keys
                    '<div class="ngcp-col-1-2 ngcp-md-card">',
                        '<div class="ngcp-card-cftype">ALWAYS</div>',
                    '</div>',
                    '<div class="ngcp-col-1-2 ngcp-md-card-inactive">',
                        '<div class="ngcp-card-cftype">ON BUSY</div>',
                    '</div>',
                    '<div class="ngcp-col-1-2 ngcp-md-card-inactive">',
                        '<div class="ngcp-card-cftype">NO ANSWER</div>',
                    '</div>',
                    '<div class="ngcp-col-1-2 ngcp-md-card-inactive">',
                        '<div class="ngcp-card-cftype">UNAVAILABLE</div>',
                    '</div>',
                //'</tpl>',
            '</div>'
        );

        this.tpl = cfTypeTpl;

        this.callParent();
    }

});
