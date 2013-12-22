define(
    ['underscore', 'Util', 'model/CellModel'],
    function(_, Util, CellModel) {
        /**
         * This object is used to represent the entire board
         */
        var Board = function(cells) {
            this.cells = _.reduce(cells, function(obj, cell) {
                var row = cell.row;
                var column = cell.column;
                obj[row] = obj[row] || {};
                obj[row][column] = cell;
                return obj;
            }, {});

            this.rows = _.reduce(cells, function(obj, cell) {
                var row = cell.row;
                obj[row] = obj[row] || [];
                obj[row].push(cell);
                return obj;
            }, {});

            this.columns = _.reduce(cells, function(obj, cell) {
                var column = cell.column;
                obj[column] = obj[column] || [];
                obj[column].push(cell);
                return obj;
            }, {});

            this.blocks = _.reduce(cells, function(obj, cell) {
                var block = cell.block;
                obj[block] = obj[block] || [];
                obj[block].push(cell);
                return obj;
            }, {});

            this.eachCell = function(f){ _.each(cells, f); };
        };

        return Board;
    }
);
