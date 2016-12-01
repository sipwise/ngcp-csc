Ext.define('NgcpCsc.view.pages.voicemails.VoiceMailsTpl', {
    extend: 'Ext.view.View',

    xtype: 'voicemails-tpl',
    store: 'VoiceMails',
    itemSelector: 'div.ngcp-sm-card',
    emptyText: 'No voicemails available',
    layout: 'fit',

    padding: 20,

    listeners: {
        itemclick: 'clickSmCard'
    },

    initComponent: function() {
        // TODO: 1. Sketch out different layout for cells in cards
        // TODO: 2. Implement new layout for cells in cards
        var cardTpl = new Ext.XTemplate(
            '<div class="ngcp-row">',
                '<tpl for=".">',
                    '<div class="ngcp-col-1-4 ngcp-sm-card">',
                        '<div class="divTable">',
                            '<div class="divTableBody">',
                                '<div class="divTableRow">',
                                    '<div class="divTableCell"><span class="ngcp-card-delete"><i class="fa fa-remove"></i></span></div>',
                                '</div>',
                                '<div class="divTableRow">',
                                    '<div class="divTableCell"><span class="ngcp-card-headline">Caller:</span></div>',
                                    '<div class="divTableCell"><span class="ngcp-card-headline">Duration:</span></div>',
                                    '<div class="divTableCell"><span class="ngcp-card-headline">Date:</span></div>',
                                    '</div>',
                                '<div class="divTableRow">',
                                    '<div class="divTableCell"><span class="ngcp-card-p">{caller}</span></div>',
                                    '<div class="divTableCell"><span class="ngcp-card-p">{duration}</span></div>',
                                    '<div class="divTableCell"><span class="ngcp-card-p">{time}</span></div>',
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
