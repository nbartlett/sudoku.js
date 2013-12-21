var bv
require.config({ baseUrl: 'js/',
    paths: {
        'underscore': 'lib/underscore',
        'backbone': 'lib/backbone',
        'jquery': 'lib/jquery'
    },
    shim: {
        'underscore': { exports: '_' },
        'backbone': { deps: ['underscore', 'jquery'], exports: 'Backbone' }
    }
});

require(
    [
        'jquery', 
        'underscore',
        'model/CellModel'
    ],
    function($, _, CellModel, Board, BoardView) {

        var cell = new CellModel({ row: 0, column: 0 });
        cell.setNotPossible(2);

        var indices = _.map(_.range(9), function(idx){ return idx + 1; });
        var cells = _.flatten(_.map(indices, function(row){
            return _.map(indices, function(col){
                return new CellModel({ row: row, column: col });
            });
        }));

        var board = new Board(cells);

        console.log(board.rows);
        console.log(board.columns);
        console.log(board.blocks);

        /*
        console.log(board.map(function(cell){ return cell.remaining() }));
        board.map(function(cell){ cell.setValue(2) });
        console.log(board.map(function(cell){ return cell.remaining() }));
        */

        bv = new BoardView({ el: '#board', model: board })
    }
);
