Ext.define('NgcpCsc.view.pages.callforward.CallForwardAlways', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward-always',

    viewModel: 'callforward',

    controller: 'callforwardalways',

    referenceHolder: true,

    requires: [
        'NgcpCsc.view.pages.callforward.CallForwardTpl'
    ],

    title:Ngcp.csc.locales.callforward.title[localStorage.getItem('languageSelected')],

    defaults: {
        padding: 20
    },

    ui:'callforward-mixin-example', // @robert mixin binding


    // TODO: 1. (Separate task?) Clean up css, and move any CallForwardAlways
    // specific styling to the corresponding .scss
    // TODO: 2. Change logic for CallForward.js, possibly not needed for mockup.
    // See notes in CallForward.js

    initComponent: function() {
        var callforwardTpl = Ext.create('NgcpCsc.view.pages.callforward.CallForwardTpl', {});

        this.items = [{
            height: 60,
            padding: '20 0 5 20',
            html: Ngcp.csc.locales.callforward.subtitle[localStorage.getItem('languageSelected')]
        }, {
            height: 60,
            padding: '5 0 0 20',
            html: Ext.String.format('<div class="callbarring-heading">{0} {1}</div>', Ngcp.csc.locales.callforward.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
        }, {
            _isSourceFieldHidden: false,
            xtype: 'callforward-form',
            cls: 'ngcp-lg-card'
        }, {
            xtype: 'callforward-tpl'
        }],

        this.callParent();
    }

});
