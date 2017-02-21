Ext.define('NgcpCsc.view.common.composer.Sms', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.sms-composer',

    controller: 'rtc',

    viewModel: 'rtc',

    title:'smscomp',

    initComponent: function() {
        this.callParent();
    }
})
