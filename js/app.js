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
        'Util',
        'Board',
        'Solver',
        'model/CellModel',
        'view/CellView',
        'moves/NakedCandidates'
    ],
    function($, _, Util, Board, solver, CellModel, CellView, nakedCandidates) {

        var cells = _.flatten(Util.mapIndices(function(row){
            return Util.mapIndices(function(col) {
                return new CellModel({}, {},  row, col);
            });
        }));

       _.each(cells, function(cell) {
            var el = $('div#board #row' + cell.row + '-col' + cell.column);
            new CellView({ model: cell, el: el});
        });

        var board = new Board(cells);
        //var initial = '807090602952861040306020598781934256264000009539602004600000421120046980408210065';
        var initial = ' 8 7  2 53 5  67 4         6    73 9 7 6 3 4 5 49    1         1 25  9 38 3  1 5 ';
        board.initialize(initial);

        var moves = nakedCandidates(board);
        solver(moves, true);
    }
);
