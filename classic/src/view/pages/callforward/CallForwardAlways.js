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

    // TODO: 0. Still issue with duplicate component id related to controller,
    // even though two separate controllers and one view. Troubleshoot
    // TODO: 1. Implement dropdown instead of fields, and choosing "othe/custom/
    // specific number" shows a previously hidden field located under dropdown
    // TODO: 2. Place a listener on selected item in combobox, with onSelect
    // function that shows textfield (show hide ( hidden: !isTrue))
    // TODO: 3. On textField submit the item is added to combobox store
    // TODO: 4. For destination set, but have two fields for number and timeout

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
