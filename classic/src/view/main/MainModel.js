Ext.define('NgcpCsc.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        currentView: null,
        headerBarFieldHideState: true,
        sectionTitle:''
    },

    formulas: {
        username: function(get) {
            return localStorage.getItem('username');
        }
    }
});
