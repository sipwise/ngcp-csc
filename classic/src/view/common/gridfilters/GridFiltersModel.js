/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('NgcpCsc.view.gridfilters.GridFiltersModel', {
    extend: 'NgcpCsc.view.main.MainModel',

    alias: 'viewmodel.gridfilters',

    links: {
        filtergrid: {
            type: "NgcpCsc.model.GridFilters",
            id: Ext.id()
        }
    },
    formulas: {
        fromDateMax : function(get){
            return get('filtergrid.to_date') || new Date();
        }
    }
});
