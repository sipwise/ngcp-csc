
Ext.define('NgcpCsc.view.common.rtc.CallPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.call-panel',
    layout: 'center',
    bind: {
        hidden: '{!callPanel}'
    },
    items: [
        {
            bind: {
                hidden: '{!outgoingCallPending}'
            },
            xtype: 'label',
            text: 'Start call ...'
        }
    ]
});


