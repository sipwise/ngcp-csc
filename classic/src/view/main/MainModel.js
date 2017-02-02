Ext.define('NgcpCsc.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        currentView: null,
        number: '',
        headerBarFieldHideState: true
    },

    formulas: {
        username: function(get) {
            return localStorage.getItem('username');
        }
    }
});
