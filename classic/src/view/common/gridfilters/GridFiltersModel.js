/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('NgcpCsc.view.gridfilters.GridFiltersModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.gridfilters',

    data: {
        from_date: '',
        to_date: ''
    }
});
