// TODO: 6. Make it possible to create completely new reminder
Ext.define('NgcpCsc.view.pages.reminder.Reminder', {
    extend: 'Ext.panel.Panel',

    xtype: 'reminder',

    controller: 'reminder',

    viewModel: 'reminder',

    listeners: {
        click: {
            fn: 'onIconClicked',
            element: 'el',
            delegate: 'div.toggle-icon'
        }
    },

    initComponent: function() {
        var vm = this.getViewModel();

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            layout: 'center',
            ui: 'reminder-tbar',
            items: [{
                xtype: 'core-container',
                margin: Ext.os.is.Desktop ? '-5 0 0 20' : '-5 0 0 0',
                width: Ext.os.is.Desktop ? 810 : '100%',
                items: [{
                    userCls: 'reminder-header',
                    html: Ngcp.csc.locales.reminder.is[localStorage.getItem('languageSelected')],
                    margin: '0 0 10 0'
                },
                {
                    xtype: 'panel',
                    margin: '0 0 15 0',
                    bind: {
                        html: '<div id="toggleReminderActive" class="toggle-section">' +
                        '<span id="toggleTextPrefixReminder" class="toggle-prefix{reminder.active ? "" : " grey"}">' + Ngcp.csc.locales.reminder.active[localStorage.getItem('languageSelected')] + '</span>' +
                        // XXX: Cvenusino: When adding the new reminder.active
                        // value to the model, I discovered a bug with
                        // submoduleStates array always ending up with same
                        // initial value, as the variable was initialized before
                        // the API request had returned a callback and created a
                        // value. I tried to use "autoLoad: true" without any
                        // success. I adopted the method below instead, but now
                        // we aren't able to use localization on initial render.
                        // Do you have any suggestions on how to better solve
                        // this?
                        '<div class="toggle-icon" data-callback="toggleReminderActive"><i id="iconAllowBlock-reminder" class="pointer toggle-icon x-fa fa-toggle-{reminder.active ? "off" : "on"} fa-2x" aria-hidden="true" data-qtip="{reminder.active ? "Set reminder to inactive" : "Set reminder to active"}"></i></div>' +
                        '<span id="toggleTextSuffixReminder" class="toggle-suffix{reminder.active ? " grey" : ""}">' + Ngcp.csc.locales.reminder.inactive[localStorage.getItem('languageSelected')] + '</span>' +
                        '</div>'
                    }
                }, {
                    xtype: 'form',
                    reference: 'reminderForm',
                    layout: 'responsivecolumn',
                    userCls: 'reminder-form',
                    items: [{
                        flex: 1,
                        userCls: 'small-100 big-50',
                        xtype: 'timefield',
                        fieldLabel: Ngcp.csc.locales.reminder.time[localStorage.getItem('languageSelected')],
                        format: 'H:i',
                        minValue: '00:00',
                        maxValue: '23:45',
                        increment: 15,
                        editable: true,
                        bind: {
                            value: '{reminder.time}'
                        }
                    }, {
                        flex: 1,
                        userCls: 'small-100 big-50',
                        xtype: 'radiogroup',
                        margin: '0 0 0 40',
                        fieldLabel: Ngcp.csc.locales.reminder.recurrence[localStorage.getItem('languageSelected')],
                        vertical: true,
                        columns: 1,
                        simpleValue: true,
                        bind: {
                            value: '{reminder.recur}'
                        },
                        defaults: {
                            name: 'value'
                        },
                        items: [{
                            boxLabel: Ngcp.csc.locales.reminder.never[localStorage.getItem('languageSelected')],
                            inputValue: 'never'
                        }, {
                            boxLabel: Ngcp.csc.locales.reminder.weekdays[localStorage.getItem('languageSelected')],
                            inputValue: 'weekdays'
                        }, {
                            boxLabel: Ngcp.csc.locales.reminder.always[localStorage.getItem('languageSelected')],
                            inputValue: 'always'
                        }]
                    }, {
                        xtype: 'button',
                        html: Ngcp.csc.locales.common.save_caps[localStorage.getItem('languageSelected')],
                        handler: 'saveReminder'
                    }]
                }]
            }]
        }];
        this.callParent();
    }
});
