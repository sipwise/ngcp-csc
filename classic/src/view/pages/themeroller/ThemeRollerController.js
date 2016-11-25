Ext.define('NgcpCsc.view.pages.callbarring.CallBarringController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.themeroller',

    applyTheme: function() {
        var vm = this.getViewModel();
        // defer is needded becuse binding is slower than change listener callback
        Ext.Function.defer(function() {
            Fashion.css.setVariables({
                'base-color': '#' + vm.get('basecolor'),
                'color': '#' + vm.get('fontcolor'),
                'body-background-color': '#' + vm.get('bodybgcolor'),
                'font-family': vm.get('fontfamily'),
                'font-weight': vm.get('fontweight'),
                'font-size': vm.get('fontsize') + 'px'
            });
        }, 300, this);
    },

    resetColors: function() {
        var vm = this.getViewModel();

        // TODO use model and model.reset()
        vm.setData({
            basecolor: '66A648',
            fontcolor: 'white',
            bodybgcolor: 'white',
            fontfamily: 'Open Sans, Helvetica Neue',
            fontweight: 'normal',
            fontsize: '13'
        });

        this.applyTheme();
    },

    previewLogo: function(field) {
        if (field.getValue()) {
            var reader = new FileReader();
            var file = field.getEl().down('input[type=file]').dom.files[0];

            reader.onload = function(e) {
                field.up('container').add(Ext.create('Ext.Img', {
                    src: e.target.result,
                    width: 184,
                    height: 90,
                    renderTo: Ext.getBody()
                }));
            }

            reader.readAsDataURL(file);
        }
    },

    saveTheme: function() {
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
    }

});
