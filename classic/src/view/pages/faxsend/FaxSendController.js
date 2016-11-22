Ext.define('NgcpCsc.view.pages.faxsend.FaxSendController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.faxsend',

    resetForm: function() {
        this.getViewModel().set('destination_number', '');
        this.getViewModel().set('page_header', '');
        this.getViewModel().set('content', '');
        this.getViewModel().set('chosen_file', '');
        Ext.ComponentQuery.query('#faxsend-quality')[0].reset();
        Ext.ComponentQuery.query('#fs-file')[0].reset();
    },

    submitForm: function (field) {
        var newNumberEntered = this.getViewModel().get('destination_number');
        var newHeaderEntered = this.getViewModel().get('page_header');
        var newConteredEntered = this.getViewModel().get('content');
        var newQualitySelected = this.getViewModel().get('selected_quality');
        var newFileChosen = this.getViewModel().get('chosen_file');
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
