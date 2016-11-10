Ext.define('NgcpCsc.view.pages.callforward.CallForwardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.callforward',

    data: {
        new_source_entered: '',
        new_time_entered: '',
        new_destination_entered: '',
        new_timeout_entered: '',
        new_source_selected: 'Anyone',
        new_time_selected: 'Always',
        new_destination_selected: 'Voicemail',
        current_selection: null,
        selected_value: ''
    },

    formulas: {
        always: function(get) {
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
