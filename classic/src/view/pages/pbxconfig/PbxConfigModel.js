Ext.define('NgcpCsc.view.pages.pbxconfig.PbxConfigModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pbxconfig',

    data: {
        add_new_button: 'ADD NEW SEAT'
    },

    formulas: {
        splitAlias: function (get) {
            return get('alias_numbers').replace(/,/g, ", ");
        }
    }

});
