'use strict'; 

define(
    ['underscore', 'backbone', 'Util', 'model/CellModel'],
    function(_, Backbone, Util, CellModel) {

        /**
         * Object that reperesents a group of cells that, when solved,
         * should have one of 1 through 9 in the cells.  This will be
         * used for rows, columns, and groups of 3 x 3 blocks.
         **/
        var CellGroup = function(cells) {
            if (cells.length != 9) {
                throw "must provide 9 cells to a cell group, not" + cells.length;
            }
            this.cells = cells;
        };

        /**
         * This object is used to represent the entire board
         */
        var Board = Backbone.Collection.extend({

            model: CellModel,

            initialize: function(models, args) {
                this.rows = Util.mapIndices(function(idx){ 
                    return new CellGroup(_.filter(models, function(cell){ return cell.get('row') == idx; })); 
                }, this) ; 

                this.columns = Util.mapIndices(function(idx){ 
                    return new CellGroup(_.filter(models, function(cell){ return cell.get('column') == idx; })); 
                }, this) ; 

                this.blocks = _.flatten(_.map(_.range(3), function(rowGrp){
                    return _.map(_.range(3), function(colGrp){
                        var cells = _.filter(models, function(cell){ 
                            return (((cell.get('row') - 1) % 3) == rowGrp) && (((cell.get('column') - 1) % 3) == colGrp);
                        });
                        return new CellGroup(cells)
                    });
                }));

                var rowColToCellGroups = _.reduce(models, function(obj, cell){ 
                    var cellGroups = [];

                    var processCellGroups = function(grps) {
                        _.each(grps, function(cellGrp){ 
                            if (_.find(cellGrp.cells, function(c){ return c === cell; })) {
                                cellGroups.push(cellGrp);
                            }
                        });
                    }

                    processCellGroups(this.rows);
                    processCellGroups(this.columns);
                    processCellGroups(this.blocks);

                    var row = cell.get('row');
                    var column = cell.get('column');
                    
                    obj[row] = obj[row] || {}
                    obj[row][column] = cellGroups

                    return obj;
                }, {}, this);

                this.getCellGroups = function(cell) {
                    var row = cell.get('row');
                    var column = cell.get('column');
                    return rowColToCellGroups[row][column];
                };
            }
        });

        return Board
    }
);
