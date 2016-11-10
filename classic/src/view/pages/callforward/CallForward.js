Ext.define('NgcpCsc.pages.callforward.CallForward', {
    extend: 'Ext.view.View',

    xtype: 'callforward',
    store: 'CallForward',
    viewModel: 'callforward',
    itemSelector: 'div.ngcp-small-card',
    emptyText: 'No call forwards available',

    title: Ngcp.csc.locales.callforward.title[localStorage.getItem('languageSelected')],

    defaults: {
        padding: 20
        //,xtype: 'container' TODO: Note to self, remember that we can put default xtypes here.
    },

    // TODO: 1. Implement ability to enter in 3 fields with call forward data,
    // and create a new card based on that
    // TODO: 2. Create separate view with clickable cards, greyed out if they are
    // inactive (min one rule in the call forward group means it's active).
    // TODO: a. for now just create store inline dummy hardcoded data, which in
    // a for-loop defines what cards are greyed out, and which are white and
    // clickable
    // TODO: b. css based "grey out"/"link", research onclick

    initComponent: function() {
        var cardTpl = new Ext.XTemplate(
            '<div class="ngcp-row">',
                '<div class="ngcp-col-1-1 ngcp-lg-card"></div>',
                '<div class="ngcp-col-1-2 ngcp-lg-card"></div>',
                '<div class="ngcp-col-1-2 ngcp-lg-card"></div>',
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
