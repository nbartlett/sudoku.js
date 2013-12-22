'use strict'; 

define(
    ['jquery', 'underscore', 'backbone', 'model/CellModel'],
    function($, _, Backbone, CellModel) {

        var CellView = Backbone.View.extend({

            initialize: function(args) { 
                var table = $(document.createElement('table'));

                var rows = _.map(_.range(3), function() {
                    var row = $(document.createElement('tr'));
                    table.append(row);
                    return row;
                });

                this.cellRenderers = _.map(_.range(9), function(idx) {

                    var row = rows[Math.floor(idx / 3)];
                    var cell = $(document.createElement('td'));

                    row.append(cell);
                    return function() {
                        if (args.model.get(idx + 1)) {
                            cell.html(idx + 1);
                        } else {
                            cell.html('*');
                        }
                    };
                });

                this.$el.append(table);
                this.render();
            },

            render: function() { 
                if (this.model.isSolved()) {
                    this.$el.addClass('solved');
                }
                _.each(this.cellRenderers, function(f){ f(); });
            }
        });

        return CellView
    }
);

