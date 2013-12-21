'use strict'; 

define(
    ['jquery', 'underscore', 'backbone', 'collection/Board'],
    function($, _, Backbone, Board) {

        var BoardView = Backbone.View.extend({

            initialize: function(args) { 
                this.cell_divs = args.model.map(function(cell){ 
                    var element = $(document.createElement('div')).attr('id', 'row_' + cell.get('row') + '_column_' + cell.get('column'))

                    $(args.el).append(element);
                    return element
                });
                    
                this.render();
            },

            render: function(){ 
                this.$('div').html("some stuff to render");
                return this;
            }
        });

        return BoardView;
    }
);
