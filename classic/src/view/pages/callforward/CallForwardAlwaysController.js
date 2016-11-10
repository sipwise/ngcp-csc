Ext.define('NgcpCsc.view.pages.callforward.CallForwardAlwaysController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callforwardalways',

    resetForm: function() {
        this.getViewModel().set('new_source_set', '');
        this.getViewModel().set('new_time_set', '');
        this.getViewModel().set('new_destination_set', '');
    },

    submitForm: function(field) {
        var currentIndex = this.getViewModel().get('current_selection');
        var newSourceSet = this.getViewModel().get('new_source_set');
        var newTimeSet = this.getViewModel().get('new_time_set');
        var newDestinationSet = this.getViewModel().get('new_destination_set');
        var store = Ext.getStore('CallForward');
        if (currentIndex) {
            var rec = store.getAt(currentIndex);
            rec.set('from', newSourceSet);
            rec.set('when', newTimeSet);
            rec.set('to', newDestinationSet);
        } else {
        store.add({ "from": newSourceSet, "when": newTimeSet, "to": newDestinationSet });
        };
        this.resetForm();
        this.getViewModel().set('current_selection', null);
    },

    onEnterPressed: function (field, el) {
        if (el.getKey() == el.ENTER) {
            this.submitForm(field.id);
        };
    },

    clickSmCard: function(view, record, item, rowIndex, e, eOpts) {
        this.getViewModel().set('current_selection', rowIndex);
        var store = view.getStore();
        var rec = view.getStore().getAt(rowIndex);
        console.log('Row index is: ' + rowIndex);
        Ext.getCmp('cf-new-source').setValue(record.get('from'));
        Ext.getCmp('cf-new-time').setValue(record.get('when'));
        Ext.getCmp('cf-new-destination').setValue(record.get('to'));
    },

    showCfAlways: function() {
        this.redirectTo('#callforward-always');
    }

});
