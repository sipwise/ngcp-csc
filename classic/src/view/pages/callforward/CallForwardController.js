Ext.define('NgcpCsc.view.pages.callforward.CallForwardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callforward',

    resetForm: function() {
        this.getViewModel().set('new_source_set', '');
        this.getViewModel().set('new_time_set', '');
        this.getViewModel().set('new_destination_set', '');
    },

    submitForm: function(field) {
        var form = this.lookupReference('callforwardForm');
        console.log(this.getViewModel());
        var newSourceSet = this.getViewModel().get('new_source_set');
        var newTimeSet = this.getViewModel().get('new_time_set');
        var newDestinationSet = this.getViewModel().get('new_destination_set');
        var store = Ext.getStore('CallForward');
        console.log("from: " + newSourceSet);
        console.log("when: " + newTimeSet);
        console.log("to: " + newDestinationSet);
        store.add({ "from": newSourceSet, "when": newTimeSet, "to": newDestinationSet });
        //this.resetForm();
    },

    onEnterPressed: function (field, el) {
        if (el.getKey() == el.ENTER) {
            this.submitForm(field.id);
        };
    }

});
