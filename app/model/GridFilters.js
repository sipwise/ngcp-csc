Ext.define('NgcpCsc.model.GridFilters', {
    extend: 'Ext.data.Model',

    fields: [
        'from_date',
        'to_date',
        'incoming',
        'outgoing',
        'call',
        'voicemail',
        'fax',
        'sms',
        'chat',
        'missed',
        'answered',
        'search_term',
        'name',
        'groups_extension',
        'hunt_policy',
        'hunt_timeout',
        'seats_extension',
        'primary_number',
        'alias_numbers',
        'groups',
        'mac',
        'device',
        'devices_seat',
        'devices_type',
        'devices_extension',
        'devices_extension2',
        'headerBarFieldInput',
        'convFilterHideState',
        'pbxSeatsFilterHideState',
        'pbxGroupsFilterHideState',
        'pbxDevicesFilterHideState'
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
