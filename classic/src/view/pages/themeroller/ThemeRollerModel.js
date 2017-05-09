Ext.define('NgcpCsc.view.pages.themeroller.ThemeRollerModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.themeroller',

    links: {
        themeroller:{
            type: 'NgcpCsc.model.ThemeRoller',
            id: Ext.id()
        }
    }
});
