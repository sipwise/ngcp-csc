Ext.define('NgcpCsc.model.CFSourceset', {
    extend: 'Ext.data.Model',

    requires: ['NgcpCsc.proxy.NgcpApi'],

    fields: [{
        name: "_embedded",
        persist: false
    }, {
        name: "_links",
        persist: false
    }, {
        name: "total_count",
        persist: false
    }, {
        name: "id",
        mapping: function(data) {
            // return data._embedded['ngcp:cfsourcesets'][0].id;
        }
    }, {
        name: "sources",
        mapping: function(data) {
            // return data._embedded['ngcp:cfsourcesets'][0].sources;
        }
    }, {
        name: "name",
        mapping: function(data) {
            // return data._embedded['ngcp:cfsourcesets'][0].name;
        }
    }, {
        name: "subscriber_id",
        mapping: function(data) {
            // return data._embedded['ngcp:cfsourcesets'][0].subscriber_id;
        }
    }],

    // this replace the temprary Model ID in VM links
    onLoad: function() {
        // this.set("id", this.data._embedded['ngcp:cfsourcesets'][0].id);
        this.commit();
    },

    proxy: {
        type: 'ngcp-api',
        route: 'cfsourcesets',
        params: '175'
    }
});
