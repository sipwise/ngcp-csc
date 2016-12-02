Ext.define('NgcpCsc.view.pages.reminder.Reminder', {
    extend: 'Ext.panel.Panel',

    xtype: 'reminder',

    viewModel: 'reminder',

    title: Ngcp.csc.locales.reminder.title[localStorage.getItem('languageSelected')],

    initComponent: function() {
        this.items = [{
            layout: 'responsivecolumn',
            userCls: 'white-box',
            margin: 20,
            padding: 10,
            items: [{
                userCls: 'big-66 small-100',
                xtype: 'form',
                defaults: {
                    width: '100%'
                },
                items: [{
                    height: 60,
                    html: Ngcp.csc.locales.reminder.subtitle[localStorage.getItem('languageSelected')].toUpperCase()
                }, {
                    height: 70,
                    html: Ext.String.format('<div class="voicemails-heading">{0} {1}</div>', Ngcp.csc.locales.reminder.settings[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
                }, {
                    height: 60,
                    html: Ngcp.csc.locales.common.when[localStorage.getItem('languageSelected')].toUpperCase()
                }, {
                    xtype: 'timefield',
                    fieldLabel: Ngcp.csc.locales.reminder.time[localStorage.getItem('languageSelected')],
                    format: 'H:i',
                    minValue: '0:00',
                    maxValue: '23:50',
                    increment: 10,
                    bind: {
                        value: '{reminder.timer}',
                        disabled: '{!reminder.reminder_status}'
                    }
                }, {
                    xtype: 'radiogroup',
                    fieldLabel: Ngcp.csc.locales.reminder.recurrence[localStorage.getItem('languageSelected')],
                    vertical: true,
                    columns: 1,
                    simpleValue: true,
                    bind: {
                        value: '{reminder.recurrence}',
                        disabled: '{!reminder.reminder_status}'
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
                    xtype: 'segmentedbutton',
                    margin: '20 0 0 0',
                    items: [{
                        text: Ngcp.csc.locales.common.active[localStorage.getItem('languageSelected')],
                        margin: '0 5 0 0',
                        bind: {
                            pressed: '{reminder.reminder_status}'
                        }
                    }, {
                        text: Ngcp.csc.locales.common.inactive[localStorage.getItem('languageSelected')],
                        bind: {
                            pressed: '{!reminder.reminder_status}'
                        }
                    }]
                }]
            }]
        }];
        this.callParent();
    }
});
