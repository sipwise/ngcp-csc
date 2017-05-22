Ext.define('NgcpCsc.model.Patch', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        persist: false
    }, 'op', 'path', 'value']
});
