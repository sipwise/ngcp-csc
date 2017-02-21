Ext.define('NgcpCsc.view.common.composer.Fax', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.fax-composer',

    controller: 'rtc',

    viewModel: 'rtc',

    title:'faxcomp',

    initComponent: function() {
        this.callParent();
    }
})
