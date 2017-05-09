Ext.define('NgcpCsc.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    
    // left inline by purpose as it's not coming from API
    data: {
        currentView: null,
        headerBarFieldHideState: true,
        sectionTitle: ''
    },

    formulas: {
        username: function(get) {
            return localStorage.getItem('username');
        }
    }
});
