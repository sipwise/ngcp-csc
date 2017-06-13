Ext.define('NgcpCsc.model.ThemeRoller', {
    extend: 'Ext.data.Model',

    fields: ['basecolor', 'fontcolor', 'bodybgcolor', 'fontfamily', 'fontweight', 'fontsize'],

    proxy: {
        type: 'ajax',
        url: Ext.manifest.resources.path + '/data/themeroller.json',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
