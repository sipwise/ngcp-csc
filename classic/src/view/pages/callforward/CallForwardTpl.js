Ext.define('NgcpCsc.view.pages.callforward.CallForwardTpl', {
    extend: 'Ext.view.View',

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
                        '<li class="csc-tpl-li">{[!isNaN(parseInt(values.phone.charAt(0))) ? "+" : ""]}{phone} and ring for {ring_for} secs<div class="csc-tpl-icns"><i class="fa fa-trash" aria-hidden="true"></i><i class="fa fa-arrows" aria-hidden="true"></i></div></li>',
                    '</tpl>',
                '</ul>',
            '</div>'
        );

        this.tpl = listTpl,

        this.callParent();
    }

});
