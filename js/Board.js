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

            this.initialize = function(initialStateChars) {
                var cells = this.cells;
                var inner = function(row, column, chars) {
                    var head = parseInt(_.head(chars));
                    if (head > 0 && head < 10) {
                        cells[row][column].setValue(head);
                    }

                    if (column < 9) {
                        inner(row, column + 1, _.tail(chars));
                    } else if (row < 9) {
                        inner(row + 1, 1, _.tail(chars));
                    }
                };
                inner(1, 1, initialStateChars);
            }
        };

        return Board;
    }
);
