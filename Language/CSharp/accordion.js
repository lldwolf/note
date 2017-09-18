        $(function () {
            var accordions = $('div[id|="accordion"]');
            for (var i = 0; i < accordions.length; i++) {
                $(accordions[i]).accordion({
                    active: false,
                    collapsible: true
                });
            }
        });
