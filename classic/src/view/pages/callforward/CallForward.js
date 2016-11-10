Ext.define('NgcpCsc.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',
    store: 'CallForward',
    viewModel: 'callforward',
    tpl: imageTpl,
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
        var imageTpl = new Ext.XTemplate(
            '<tpl for=".">',
                '<div style="margin-bottom: 10px;" class="thumb-wrap">',
                    '<img src="{src}" />',
                    '<br/><span>{caption}</span>',
                '</div>',
            '</tpl>'
        );

        this.callParent();
    }

});
