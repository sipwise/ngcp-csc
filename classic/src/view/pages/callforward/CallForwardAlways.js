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

    // TODO: 1. For comboboxes, choosing "other" (or custom/specific) number
    // should show previously hidden field located below it
    // TODO: 2. Place a listener on selected item in combobox, with onSelect
    // function that shows textfield (show hide ( hidden: !isTrue))
    // TODO: 3. On textField submit the item is added to combobox store
    // TODO: 4. Change logic for CallForward.js. See notes in CallForward.js
    // TODO: 5. Clean up css, and move any CallForwardAlways specific styling to
    // the corresponding .scss

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
            xtype: 'callforward-form',
            cls: 'ngcp-lg-card'
        }, {
            xtype: 'callforward-tpl'
        }],

        this.callParent();
    }

});
