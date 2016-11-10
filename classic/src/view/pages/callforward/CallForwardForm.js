Ext.define('NgcpCsc.view.pages.callforward.CallForwardForm', {
    extend: 'Ext.form.Panel',

    xtype: 'callforwardform',

    name: 'myForm',

    defaultType: 'textfield',

    items: [{
        // TODO: 1. Implement form visuals
        // TODO: 2. Implement form controllers
        fieldLabel: 'from',
        value: 'dummy value',
        id: 'fromInput',
        allowBlank: false,
        listeners: {
            specialKey: 'onEnterPressed'
        }
    }, {
        fieldLabel: 'from',
        bind: '{callforward.from}',
        allowBlank: false,
        listeners: {
            specialKey: 'onEnterPressed'
        }
    }]

});
