Ext.define('NgcpCsc.model.Device', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'device',
        type: 'string'
    }, {
        name: 'mac',
        type: 'string'
    }, {
        name: 'status',
        type: 'string'
    }, {
        name: 'image',
        type: 'string'
    }, {
        name: 'destinations',
        type: 'auto'
    },{
        name: 'imageWithButtons',
        depends: ['image'],
        convert: function(v, rec) {
            var retVal = "<div><img width=450 height=450 src='" + rec.get('image') + "'></div>";
            Ext.each(rec.get('destinations'), function(destination) {
                retVal += '<div id="destination-' + rec.get('id') + "-" + destination.order + '" class="number-circle pointer" data-callback="editDevice" style="top:' + destination.position.top + ';left:' + destination.position.left + '">' + destination.order + '</div>'
            });
            return retVal;
        }
    }]
});
