Ext.define('NgcpCsc.pages.callforward.CallForward', {
    extend: 'Ext.view.View',

    xtype: 'callforward',
    store: 'CallForward',
    viewModel: 'callforward',
    itemSelector: 'div.thumb-wrap',
    emptyText: 'No images available',

    title: Ngcp.csc.locales.callforward.title[localStorage.getItem('languageSelected')],

    defaults: {
        padding: 20
        //,xtype: 'container' TODO: Note to self, remember that we can put default xtypes here.
    },

    items: [{
        xtype: 'callforwardView'
    }],

    initComponent: function() {
        var cardTpl = new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="ngcp-small-card">',
                    '<span class="ngcp-card-headline">From:</span>',
                    '<br/><span class="ngcp-card-p">{from}</span>',
                '</div>',
            '</tpl>'
        );
        this.tpl = cardTpl,
        this.callParent();
    }

});
