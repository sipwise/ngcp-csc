Ext.define('NgcpCsc.view.pages.faxsend.FaxSendController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.faxsend',

    resetForm: function() {
        var vm = this.getViewModel();
        vm.set('fax.destination_number', '');
        vm.set('fax.page_header', '');
        vm.set('fax.content', '');
        vm.set('fax.chosen_file', '');
        Ext.ComponentQuery.query('#faxsend-quality')[0].reset();
        Ext.ComponentQuery.query('#fs-file')[0].reset();
    },

    submitForm: function (field) {
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
        this.getViewModel().set('fax.selected_quality', selectedValue);
    }

})
