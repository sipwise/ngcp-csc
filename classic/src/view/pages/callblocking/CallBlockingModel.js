Ext.define('NgcpCsc.view.pages.callblocking.CallBlockingModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.callblocking',

    data: {
        block_mode: 'allow',
        clir: true, // TODO: Privacy value
        new_number: ''
    }
});
