Ext.define('NgcpCsc.model.Device', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'device',
        type: 'string'
    }, {
        name: 'mac',
        type: 'string'
    }, {
        name: 'status',
        type: 'string'
    }, {
        name: 'image',
        type: 'string'
    }, {
        name: 'destinations',
        type: 'auto'
    }, {
        name: 'imageWithButtons',
        depends: ['image'],
        convert: function(v, rec) {
            var retVal = "<div><img width=500 height=500 src='" + rec.get('image') + "'></div>";
            var shiftPosition = false;
            Ext.each(rec.get('destinations'), function(destination) {
                if (destination.name) {
                    var buttonCls = 'assigned-button';
                    var btnPos = "top:" + destination.position.top + ";left:" + destination.position.left;
                    var rectPos,
                        top = destination.position.top,
                        left = destination.position.left,
                        lineWidth =  shiftPosition ? "15%" : "35%",
                        lineHeight =  shiftPosition ? "10%" : "18%",
                        lineTop = top,
                        lineLeft = destination.position.left,
                        lineCls = destination.position.anchor == 'left' || destination.position.anchor == 'right' ? 'connection-left-right' : 'connection-top-bottom';
                    switch (destination.position.anchor) {
                        case "left":
                            lineHeight = "1%";
                            left = (parseInt(destination.position.left.split('%')[0]) + (shiftPosition ? 10 : 30)).toString() + "%";
                            top = (parseInt(destination.position.top.split('%')[0]) - 1).toString() + "%";
                            break;
                        case "right":
                            left = (parseInt(destination.position.left.split('%')[0]) - (shiftPosition ? 15 : 35)).toString() + "%";
                            top = (parseInt(destination.position.top.split('%')[0]) - 1).toString() + "%";
                            lineLeft = left;
                            lineHeight = "1%";
                            break;
                        case "top":
                            lineLeft = (parseInt(destination.position.left.split('%')[0]) + 1).toString() + "%";
                            top = (parseInt(destination.position.top.split('%')[0]) + (shiftPosition ? 7 : 14)).toString() + "%";
                            break;
                        case "bottom":
                            lineLeft = (parseInt(destination.position.left.split('%')[0]) + 1).toString() + "%";
                            top = (parseInt(destination.position.top.split('%')[0]) - (shiftPosition ? 7 : 14)).toString() + "%";
                            break;
                    }

                    retVal += '<div><span data-qtip="Click to edit or remove" data-onseathovered="seatHovered" data-onseatclick="seatClick" class="button-info pointer card-icon" style="top:' +
                        top + ';left:' + left + ';" id="destination-info' +
                        rec.get('id') + "-" + destination.order + '">' +
                        destination.order + ' | ' + destination.name + '</span><span class="' +
                        lineCls + '" style="height:' + lineHeight + ';width:' +
                        lineWidth + ';top:' + lineTop + ';left:' +
                        lineLeft + ';"></span><span id="destination-"' +
                        rec.get('id') + "-" + destination.order + '" class="' +
                        buttonCls + '" style="' +
                        btnPos + '"></span></div>';
                } else {
                    var top = (parseInt(destination.position.top.split('%')[0]) - 1).toString() + "%";
                    var btnPos = "top:" + top + ";left:" + destination.position.left;
                    var buttonCls = 'free-button';
                    retVal += '<div data-qtip="Click to assign" data-onseathovered="seatHovered" data-onseatclick="seatClick" id="destination-' +rec.get('id') + '-' + destination.order + '" class="' +
                        buttonCls + ' pointer card-icon" style="' +
                        btnPos + '"></div>';

                }
                shiftPosition = !shiftPosition;
            });
            return retVal;
        }
    }]
});
