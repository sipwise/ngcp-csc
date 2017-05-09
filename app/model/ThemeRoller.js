Ext.define('NgcpCsc.model.ThemeRoller', {
    extend: 'Ext.data.Model',

    fields: ['basecolor', 'fontcolor', 'bodybgcolor', 'fontfamily', 'fontweight', 'fontsize'],

    proxy: {
        type: 'ajax',
        url: '/resources/data/themeroller.json',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
