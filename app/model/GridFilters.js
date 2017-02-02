Ext.define('NgcpCsc.model.GridFilters', {
    extend: 'Ext.data.Model',

    fields: [
        'from_date',
        'to_date',
        // 'type',
        'direction',
        'missed',
        'answered',
        'search_term',
        'name', 'extensions',
        'groups',
        'numbers',
        'phone_devices',
        'hunt_policy',
        'hunt_timeout',
        'enabled',
        'disabled',
        'device',
        'mac',
        'status',
        'headerBarFieldInput',
        'call',
        'voicemail',
        'reminder',
        'fax'
    ],

    proxy: {
        type: 'ajax',
        url: '/resources/data/gridfilters.json',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
