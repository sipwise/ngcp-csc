Ext.define('Override.form.field.VTypes', {
    override: 'Ext.form.field.VTypes',

    numeric: function(val) {
        var reg= /^\d+$/i;
        return reg.test(val);
    },
    numericText: 'Not a valid number.',
    numericMask: /^[0-9]/i
    
});
