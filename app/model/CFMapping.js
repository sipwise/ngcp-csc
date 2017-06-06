Ext.define('NgcpCsc.model.CFMapping', {
    extend: 'Ext.data.Model',

    requires: ['NgcpCsc.proxy.NgcpApi'],

    fields: [{
        name: "_links",
        persist: false
    }, {
        name: "online",
        mapping: function(data) {
            return data.cfu;
        }
    }, {
        name: "busy",
        mapping: function(data) {
            return data.cfb;
        }
    }, {
        name: "offline",
        mapping: function(data) {
            return data.cfna;
        }
    }],

    // this replace the temporary Model ID in VM links
    onLoad: function() {
        this.set("id", this.data.id);
        this.commit();
    },

    proxy: {
        type: 'ngcp-api',
        route: 'cfmappings',
        params: '175'
    }
});
