Ext.define('NgcpCsc.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        currentView: null,
        username: localStorage.getItem('username')
    }
});
