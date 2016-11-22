Ext.define('NgcpCsc.view.pages.faxsend.FaxSendController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.faxsend',

    resetForm: function() {
        var vm = this.getViewModel();
        vm.set('destination_number', '');
        vm.set('page_header', '');
        vm.set('content', '');
        vm.set('chosen_file', '');
        Ext.ComponentQuery.query('#faxsend-quality')[0].reset();
        Ext.ComponentQuery.query('#fs-file')[0].reset();
    },

    submitForm: function (field) {
        // var vm = this.getViewModel();
        // var newNumberEntered = vm.get('destination_number');
        // var newHeaderEntered = vm.get('page_header');
        // var newConteredEntered = vm.get('content');
        // var newQualitySelected = vm.get('selected_quality');
        // var newFileChosen = vm.get('chosen_file');
        var form = this.lookupReference('faxsendForm');
        if (!form.isValid()) {
            return;
        }
        this.resetForm();
    },

    onEnterPressed: function (field, el) {
        if (el.getKey() == el.ENTER) {
            this.submitForm(field.id);
        };
    },

    selectQuality: function (cmp, rec) {
        var selectedValue = rec.get('quality');
        this.getViewModel().set('selected_quality', selectedValue);
    }

})
