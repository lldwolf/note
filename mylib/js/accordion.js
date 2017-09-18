        $(function () {
            var accordions = $('div[id|="accordion"]');
            for (var i = 0; i < accordions.length; i++) {
				if ($(accordions[i]).attr("init-status") == "expanded") {
					$(accordions[i]).accordion({
						//active: false,
						collapsible: true
					});
				} else {
					$(accordions[i]).accordion({
						active: false,
						collapsible: true
					});
				}
            }
        });
