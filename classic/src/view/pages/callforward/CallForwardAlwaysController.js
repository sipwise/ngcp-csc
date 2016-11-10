Ext.define('NgcpCsc.view.pages.callforward.CallForwardAlwaysController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callforwardalways',

    resetForm: function() {
        this.getViewModel().set('new_source_entered', '');
        this.getViewModel().set('new_time_entered', '');
        this.getViewModel().set('new_destination_entered', '');
        this.getViewModel().set('new_timeout_entered', '');
        this.getViewModel().set('new_source_selected', 'Anyone');
        this.getViewModel().set('new_time_selected', 'Always');
        this.getViewModel().get('new_destination_selected', 'Voicemail');
        Ext.ComponentQuery.query('#cf-sourcesets')[0].setValue('Anyone');
        Ext.ComponentQuery.query('#cf-timesets')[0].setValue('Always');
        Ext.ComponentQuery.query('#cf-destinationsets')[0].setValue('Voicemail');
    },

    submitForm: function(field) {
        var currentIndex = this.getViewModel().get('current_selection');
        var newSourceEntered = this.getViewModel().get('new_source_entered');
        var newTimeEntered = this.getViewModel().get('new_time_entered');
        var newDestinationEntered = this.getViewModel().get('new_destination_entered');
        var newSourceSelected = this.getViewModel().get('new_source_selected') || 'Anyone';
        var newTimeSelected = this.getViewModel().get('new_time_selected') || 'Always';
        var newDestinationSelected = this.getViewModel().get('new_destination_selected') || 'Voicemail';
        var newSourceToAdd, newTimeToAdd, newDestinationToAdd;
        var cfStore = Ext.getStore('CallForward');
        var sourcesetsStore = Ext.getStore('Sourcesets');
        var timesetsStore = Ext.getStore('Timesets');
        var destinationsetsStore = Ext.getStore('Destinationsets');
        if (currentIndex) {
            var rec = cfStore.getAt(currentIndex);
            rec.set('from', newSourceEntered);
            rec.set('when', newTimeEntered);
            rec.set('to', newDestinationEntered);
        } else {
            newSourceToAdd = Ext.isEmpty(this.getViewModel().get('new_source_entered')) ? this.getViewModel().get('new_source_selected') : newSourceEntered;
            newTimeToAdd = Ext.isEmpty(this.getViewModel().get('new_time_entered')) ? this.getViewModel().get('new_time_selected') : newTimeEntered;
            newDestinationToAdd = Ext.isEmpty(this.getViewModel().get('new_destination_entered')) ? this.getViewModel().get('new_destination_selected') : newDestinationEntered;
            cfStore.add({ "from": newSourceToAdd, "when": newTimeToAdd, "to": newDestinationToAdd });
        };
        // TODO: Refactor either by redoing ternary to regular if/else above,
        // or create separate function for it
        if (!Ext.isEmpty(newSourceEntered)) {
            sourcesetsStore.add({ "source": newSourceEntered });
        };
        if (!Ext.isEmpty(newTimeEntered)) {
            timesetsStore.add({ "period": newTimeEntered });
        };
        if (!Ext.isEmpty(newDestinationEntered)) {
            destinationsetsStore.add({ "destination": newDestinationEntered });
        };
        this.resetForm();
        this.getViewModel().set('current_selection', null);
        this.toggleCombos('all', false);
        this.toggleFields('all', true);
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
        this.toggleCombos('all', true);
        this.toggleFields('all', false);
        Ext.ComponentQuery.query('#cf-new-source')[0].setValue(record.get('from'));
        Ext.ComponentQuery.query('#cf-new-time')[0].setValue(record.get('when'));
        Ext.ComponentQuery.query('#cf-new-destination')[0].setValue(record.get('to'));
    },

    showCfAlways: function() {
        this.redirectTo('#callforward-always');
    },

    toggleFields: function (field, value) {
        var sourceField = Ext.ComponentQuery.query('#cf-new-source')[0];
        var periodField = Ext.ComponentQuery.query('#cf-new-time')[0];
        var destinationField = Ext.ComponentQuery.query('#cf-new-destination')[0];
        var timeoutField = Ext.ComponentQuery.query('#cf-new-timeout')[0];
        if (field === 'all') {
            var valueChange = !Ext.isEmpty(value) ? value : !sourceField.config.hidden;
            sourceField.setConfig('hidden', valueChange);
            periodField.setConfig('hidden', valueChange);
            destinationField.setConfig('hidden', valueChange);
            timeoutField.setConfig('hidden', valueChange);
        } else if (field === 'cf-new-source') {
            var valueChange = !Ext.isEmpty(value) ? value : !sourceField.config.hidden;
            sourceField.setConfig('hidden', valueChange);
        } else if (field === 'cf-new-time') {
            var valueChange = !Ext.isEmpty(value) ? value : !periodField.config.hidden;
            periodField.setConfig('hidden', valueChange);
        } else if (field === 'cf-new-destination') {
            var valueChange = !Ext.isEmpty(value) ? value : !destinationField.config.hidden;
            destinationField.setConfig('hidden', valueChange);
        } else if (field === 'cf-new-timeout') {
            var valueChange = !Ext.isEmpty(value) ? value : !timeoutField.config.hidden;
            timeoutField.setConfig('hidden', valueChange);
        };
    },

    toggleCombos: function (combo, value) {
        var sourceCombo = Ext.ComponentQuery.query('#cf-sourcesets')[0];
        var periodCombo = Ext.ComponentQuery.query('#cf-timesets')[0];
        var destinationCombo = Ext.ComponentQuery.query('#cf-destinationsets')[0];
        if (combo === 'all') {
            var valueChange = !Ext.isEmpty(value) ? value : !sourceCombo.config.hidden;
            sourceCombo.setConfig('hidden', valueChange);
            periodCombo.setConfig('hidden', valueChange);
            destinationCombo.setConfig('hidden', valueChange);
        } else if (combo === 'cf-sourcesets') {
            var valueChange = !Ext.isEmpty(value) ? value : !sourceCombo.config.hidden;
            sourceCombo.setConfig('hidden', valueChange);
        } else if (combo === 'cf-timesets') {
            var valueChange = !Ext.isEmpty(value) ? value : !periodCombo.config.hidden;
            periodCombo.setConfig('hidden', valueChange);
        } else if (combo === 'cf-destinationsets') {
            var valueChange = !Ext.isEmpty(value) ? value : !destinationCombo.config.hidden;
            destinationCombo.setConfig('hidden', valueChange);
        };
    },

    cfSelect: function(cmp, rec) {
        //TODO: Cvenusino: Can we refactor to instead use
        // .up('fieldcontainer').down('textfield') or similar?
        var selectedValue = rec.get('source') || rec.get('period') || rec.get('destination');
        this.getViewModel().set('selected_value', selectedValue);
        if (cmp.itemId === 'cf-sourcesets') {
            this.getViewModel().set('new_source_selected', selectedValue);
        } else if (cmp.itemId === 'cf-timesets') {
            this.getViewModel().set('new_time_selected', selectedValue);
        } else if (cmp.itemId === 'cf-destinationsets') {
            this.getViewModel().set('new_destination_selected', selectedValue);
        };
        if (selectedValue === '+ New number') {
            this.toggleFields('cf-new-source', false);
            this.getViewModel().set('new_source_selected', selectedValue);
        } else if (selectedValue === '+ New period') {
            this.toggleFields('cf-new-time', false);
            this.getViewModel().set('new_time_selected', selectedValue);
        } else if (selectedValue === '+ New destination') {
            this.toggleFields('cf-new-destination', false);
            this.toggleFields('cf-new-timeout', false);
            this.getViewModel().set('new_destination_selected', selectedValue);
        };
        if (cmp.itemId === 'cf-sourcesets' && selectedValue !== '+ New number') {
            this.getViewModel().set('new_source_entered', '');
            this.toggleFields('cf-new-source', true);
        } else if (cmp.itemId === 'cf-timesets' && selectedValue !== '+ New period') {
            this.getViewModel().set('new_time_entered', '');
            this.toggleFields('cf-new-time', true);
        } else if (cmp.itemId === 'cf-destinationsets' && selectedValue !== '+ New destination') {
            this.getViewModel().set('new_destination_entered', '');
            this.toggleFields('cf-new-destination', true);
            this.toggleFields('cf-new-timeout', true);
        };

    }

});
