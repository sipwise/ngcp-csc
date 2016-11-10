Ext.define('NgcpCsc.view.pages.callforward.CallForwardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callforward',

    renderSaveRuleText: function (value, metaData) {
        return Ngcp.csc.locales.callforward.save_rule[localStorage.getItem('languageSelected')].toLowerCase();
    },

    submitForm: function(field) {
        var vm = this.getViewModel();
        var callforwardFrom = vm.get('callforward.from');
        var fieldFrom = Ext.getCmp('fromInput').getValue();
        console.log('from value in callforward field is: ' + callforwardFrom);
        console.log('value in #fromInput: ' + fieldFrom);
    },

    onEnterPressed: function (field, el) {
        if (el.getKey() == el.ENTER) {
            this.submitForm(field.id);
        };
    }

});
