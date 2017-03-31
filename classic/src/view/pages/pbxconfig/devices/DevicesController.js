// TODO:
// - draw line (tooltip?)
// -- http://docs.sencha.com/extjs/6.2.0/classic/Ext.tip.ToolTip.html#css_mixin-extjs-tip-ui
// -- http://examples.sencha.com/extjs/6.2.0/examples/kitchensink/#tooltips
// -- http://doctype.com/possible-draw-horizontal-lines-only-css
// - actions
// -- click > display infos with edit and delete buttons
// --- delete > hide info panel and prompt alert deletion
// -- fix save


Ext.define('NgcpCsc.view.pages.pbxconfig.DevicseController', {
    extend: 'NgcpCsc.view.pages.pbxconfig.PbxConfigController',
    alias: 'controller.devices',
    onImgRendered: function(imgCmp) {
        var me = this;
        imgCmp.getEl().on('mouseover', this.attachTooltip, this);
        this.getView()._destinationTooltip = Ext.create('Ext.tip.ToolTip', {
            dismissDelay: 0,
            cls: 'devices-tooltip pointer',
            listeners: {
                render: function(ttip) {
                    var grid = me.lookupReference('devicesGrid');
                    var selectedRec = grid.getSelectionModel().getSelection()[0];
                    var showPanel = Ext.ComponentQuery.query('#seat-show-panel-' + selectedRec.get('id'))[0];
                    var editPanel = Ext.ComponentQuery.query('#seat-edit-panel-' + selectedRec.get('id'))[0];
                    var seatData;

                    ttip.getEl().on('mouseenter', function() {
                        var order = ttip.id.split('-')[1];
                        Ext.each(selectedRec.get('destinations'), function(destination) {
                            if (order == destination.order) {
                                seatData = destination;
                                return;
                            }
                        });
                        showPanel.down('[name=editBtns]').hide();
                        showPanel.down('[name=typeValue]').setHtml(seatData.type + ": " + seatData.name);
                        showPanel.setTitle(seatData.order);
                        editPanel.setTitle(seatData.order);
                        showPanel.show();
                    });
                    ttip.getEl().on('mouseleave', function() {
                        seatData = null;
                        if (showPanel.down('[name=editBtns]').hidden) {
                            showPanel.hide();
                            showPanel.setTitle(null);
                        }
                        ttip.hide();
                    });
                    ttip.getEl().on('click', function() {
                        showPanel.down('[name=editBtns]').show();
                    });
                }
            }
        });
    },
    attachTooltip: function(ev, target) {
        if (target.classList.contains('number-circle')) {
            var me = this;
            var store = Ext.getStore('Devices');
            var recId = target.id.split('-')[1];
            var destinationOrder = target.id.split('-')[2]
            var record = store.findRecord('id', recId);
            var ttip = me.getView()._destinationTooltip;

            Ext.each(record.get('destinations'), function(destination) {
                if (destination.order == destinationOrder) {
                    ttip.setHtml(destination.order + ' | ' + destination.name);
                    ttip.anchor = destination.position.anchor;
                    ttip.id = 'seat-' + destination.order;
                    ttip.hide();
                    ttip.showBy(target);
                }
            });
        }
    },
    deviceSelected: function(combo, rec) {
        var grid = this.lookupReference('devicesGrid');
        var devicesListStore = Ext.getStore('DevicesList');
        var selectedRec = grid.getSelectionModel().getSelection()[0];
        var selectedRecFromList = devicesListStore.findRecord('name', combo.getValue());

        if (selectedRec) {
            selectedRec.set('destinations', selectedRecFromList.get('destinations'))
            selectedRec.set('image', selectedRecFromList.get('image'));
            selectedRec.set('device', combo.getValue());
        }
        this.keepRowExpanded(grid, selectedRec);
        Ext.Function.defer(function() {
            grid.getView().refresh();
        }, 50)
    },
    editSeat: function() {
        var grid = this.lookupReference('devicesGrid');
        var selectedRec = grid.getSelectionModel().getSelection()[0];
        var showPanel = Ext.ComponentQuery.query('#seat-show-panel-' + selectedRec.get('id'))[0];
        var editPanel = Ext.ComponentQuery.query('#seat-edit-panel-' + selectedRec.get('id'))[0];
        showPanel.hide();
        editPanel.show();

    },
    deleteSeat: function() {

    },
    saveSeat: function() {

    }
});
