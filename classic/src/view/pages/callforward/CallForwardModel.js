Ext.define('NgcpCsc.view.pages.callforward.CallForwardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.callforward',

    data: {
        new_source_entered: '',
        new_time_entered: '',
        new_destination_entered: '',
        new_source_selected: '',
        new_time_selected: '',
        new_destination_selected: '',
        current_selection: null
    },

    formulas: {
        always: function(get) {
            //return Ext.String.format('{0}: <span class="account-username">{1}</span>', Ngcp.csc.locales.account.username[localStorage.getItem('languageSelected')], localStorage.getItem('username'));
            return Ext.String.format('<span class="ngcp-md-card">ALWAYS</span>');
        },
        no_busy: function(get) {
            return Ext.String.format('<span class="ngcp-md-card-inactive">NO BUSY</span>');
        },
        no_answer: function(get) {
            return Ext.String.format('<span class="ngcp-md-card-inactive">NO ANSWER</span>');
        },
        unavailable: function(get) {
            return Ext.String.format('<span class="ngcp-md-card-inactive">UNAVAILABLE</span>');
        }
    }

});
