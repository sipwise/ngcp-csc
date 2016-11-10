Ext.define('NgcpCsc.view.pages.callforward.CallForwardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callforward',

    resetForm: function() {
        this.getViewModel().set('new_source_set', '');
        this.getViewModel().set('new_time_set', '');
        this.getViewModel().set('new_destination_set', '');
    },

    submitForm: function(field) {
        var newSourceSet = this.getViewModel().get('new_source_set');
        var newTimeSet = this.getViewModel().get('new_time_set');
        var newDestinationSet = this.getViewModel().get('new_destination_set');
        var store = Ext.getStore('CallForward');
        store.add({ "from": newSourceSet, "when": newTimeSet, "to": newDestinationSet });
        this.resetForm();
    },

    onEnterPressed: function (field, el) {
        if (el.getKey() == el.ENTER) {
            this.submitForm(field.id);
        };
    },

    clickSmCard: function(view, record, item, rowIndex, e, eOpts) {
        // TODO: Currently only adds record values to form field, but submitting
        // form does not update record. We need to store the rowIndex value, so
        // we can edit the right record upon submit.
        // Example on how to change a value in selected record:
        // rec.set('from', 'changed value');
        var store = view.getStore();
        var rec = view.getStore().getAt(rowIndex);
        console.log('Row index is: ' + rowIndex);
        Ext.getCmp('cf-new-source').setValue(record.get('from'));
        Ext.getCmp('cf-new-time').setValue(record.get('when'));
        Ext.getCmp('cf-new-destination').setValue(record.get('to'));
    },

    clickMdCard: function(view, record, item, rowIndex, e, eOpts) {
        // TODO: Upon click, redirect to right view
        this.redirectTo('#callforward-always');
    },

    showCfAlways: function() {
        this.redirectTo('#callforward-always');
    }

});
