Ext.define('NgcpCsc.view.pages.callforward.CallForwardTpl', {
    extend: 'Ext.XTemplate',
    xtype: 'cftpl',

    tpl: '<div><ul><tpl><li>{[!isNaN(parseInt(values.phone.charAt(0))) ? "+" : ""]}{phone} and ring for {ring_for} secs</li></tpl></ul></div>'

});
