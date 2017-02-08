Ext.define('NgcpCsc.view.pages.callforward.CallForwardTpl', {
    extend: 'Ext.view.View',

    // xtype: 'callforward-tpl',
    // store: 'VoiceMails',
    itemSelector: 'li.csc-tpl-li',
    emptyText: 'nowhere',
    layout: 'fit',

    listeners: {
        itemclick: 'clickListItem'
    },

    initComponent: function() {
        var listTpl = new Ext.XTemplate(
            '<div class="csc-tpl-div-ul">',
            '<ul class="csc-tpl-ul">',
                '<tpl for=".">',
                    '<li class="csc-tpl-li">{[!isNaN(parseInt(values.phone.charAt(0))) ? "+" : ""]}{phone} and ring for {ring_for} secs</li>',
                '</tpl>',
            '</div>'
        );

        this.tpl = listTpl,

        this.callParent();
    }

});
