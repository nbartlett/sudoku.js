define(
    ['underscore', 'Util', 'model/CellModel'],
    function(_, Util, CellModel) {
        /**
         * This object is used to represent the entire board
         */
        var Board = function(cells) {

            this.cells = _.reduce(cells, function(obj, cell) {
                var row = cell.get('row');
                var column = cell.get('column');
                obj[row] = obj[row] || {};
                obj[row][column] = cell;
                return obj;
            }, {});

            this.rows = _.reduce(cells, function(obj, cell) {
                var row = cell.get('row');
                obj[row] = obj[row] || [];
                obj[row].push(cell);
            });

            /*Util.mapIndices(function(idx){ 
                return _.filter(cells, function(cell){ return cell.get('row') == idx; }); 
            }); */

            this.columns = Util.mapIndices(function(idx){ 
                return _.filter(cells, function(cell){ return cell.get('column') == idx; }); 
            }); 

            this.blocks = _.flatten(_.map(_.range(3), function(rowGrp){
                return _.map(_.range(3), function(colGrp){
                    return _.filter(cells, function(cell){ 
                        return (((cell.get('row') - 1) % 3) == rowGrp) && (((cell.get('column') - 1) % 3) == colGrp);
                    });
                });
            }));

            this.eachCell = function(f){ _.each(cells, f); };


        };

        return Board;
    }
);
