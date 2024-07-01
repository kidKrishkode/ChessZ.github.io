const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;
var TILE_SIZE = 40;//50
var FONT_SIZE = "30px Arial";
var BOARD_NAME;
var WHITE_TILE_COLOR = "#f6f6f6";
var BLACK_TILE_COLOR = "#838383";
var WHITE_PIECES_COLOR = "#a7a6b3";
var BLACK_PIECES_COLOR = "#000";
var HIGHLIGHT_COLOR = "#00ff09";
var MODE = 0;
const WHITE = 0;
const BLACK = 1;
const EMPTY = -1;
const PAWN = 0;
const KNIGHT = 1;
const BISHOP = 2;
const ROOK = 3;
const QUEEN = 4;
const KING = 5;
const INVALID = 0;
const VALID = 1;
const VALID_CAPTURE = 2;
const piecesCharacters ={
    0: '♙',
    1: '♘',
    2: '♗',
    3: '♖',
    4: '♕',
    5: '♔'
};
let chessCanvas;
let chessCtx;
let currentTeamText;
let whiteCasualitiesText;
let blackCasualitiesText;
let totalVictoriesText;
let board;
let currentTeam;
let curX;
let curY;
let whiteCasualities;
let blackCasualities;
let whiteVictories;
let blackVictories;
let timer=[0,1];
let interval;
let toseDone=0;
var temp=0;
let loader,settings;
let startS = new Audio();
startS.src = "./effects/start.mp3";
let moveS = new Audio();
moveS.src = "./effects/move.mp3";
let movment = [];
let currentBoard = 0;
let boardColor = [
    {
        id:1,
        black_tile_color: "#838383",
        white_tile_color: "#f6f6f6",
        black_pieces_color: "#000",
        white_pieces_color: "#a7a6b3",
        highlight_color: "#00ff09",
        text: "Defult",
        equiped: 1
    },
    {
        id:2,
        black_tile_color: "blue",
        white_tile_color: "powderblue",
        black_pieces_color: "#000",
        white_pieces_color: "#fff",
        highlight_color: "red",
        text: "Blue Midnight",
        equiped: 0
    },
    {
        id:3,
        black_tile_color: "green",
        white_tile_color: "#00ff09",
        black_pieces_color: "red",
        white_pieces_color: "blue",
        highlight_color: "#fff",
        text: "Grass Hopper",
        equiped: 0
    },
    {
        id: 4,
        black_tile_color: "#b58863",
        white_tile_color: "#f0d9b5",
        black_pieces_color: "#000",
        white_pieces_color: "#fff",
        highlight_color: "#00ff09",
        text: "Chocolate Delight",
        equipped: 0
   },
   {
        id: 5,
        black_tile_color: "#5E2E82",
        white_tile_color: "#F08C89",
        black_pieces_color: "#8BE9FF",
        white_pieces_color: "#E7D465",
        highlight_color: "#fff",
        text: "Colorful Carnival",
        equipped: 0
    },
    {
        id: 6,
        black_tile_color: "red",
        white_tile_color: "pink",
        black_pieces_color: "blue",
        white_pieces_color: "green",
        highlight_color: "#fff",
        text: "Void Red",
        equipped: 0
    }
];
let currentBg=0;
let BgColor = [
    {
        id: 1,
        src: "./images/wood1.jpg",
        text: "Defult",
        equiped: 1
    },
    {
        id: 2,
        src: "./images/wood2.jpg",
        text: "Wood Peker",
        equiped: 0
    },
    {
        id: 3,
        src: "./images/marbel1.png",
        text: "Europa",
        equiped: 0
    },
    {
        id: 4,
        src: "./images/marbel2.jpg",
        text: "Moon Dust",
        equiped: 0
    },
    {
        id: 5,
        src: "./images/marbel3.jpg",
        text: "Magnum",
        equiped: 0
    },
    {
        id: 6,
        src: "./images/grass1.jpg",
        text: "Plancton",
        equiped: 0
    },
    {
        id: 7,
        src: "./images/wood3.jpg",
        text: "Stick",
        equiped: 0
    },
    {
        id: 8,
        src: "./images/wood4.jpg",
        text: "Quark",
        equiped: 0
    }
];
let validMoves=[
    {
        id: PAWN,
        find: [[(+2),(+0)],
                [(+1),(+0)],
                [(+1),(-1)],
                [(+1),(+1)],
                [(-2),(+0)],
                [(-1),(+0)],
                [(-1),(-1)],
                [(-1),(+1)]
            ]
    },
    {
        id: KNIGHT,
        find: [[(+2),(+1)],
                [(+1),(+2)],
                [(+2),(-1)],
                [(+1),(-2)],
                [(-2),(+1)],
                [(-1),(+2)],
                [(-2),(-1)],
                [(-1),(-2)]
            ]
    },
    {
        id: ROOK,
        find: [[(+0),(+1)],
                [(+0),(+2)],
                [(+0),(+3)],
                [(+0),(+4)],
                [(+0),(+5)],
                [(+0),(+6)],
                [(+0),(+7)],
                [(+1),(+0)],
                [(+2),(+0)],
                [(+3),(+0)],
                [(+4),(+0)],
                [(+5),(+0)],
                [(+6),(+0)],
                [(+7),(+0)],
                [(+0),(-1)],
                [(+0),(-2)],
                [(+0),(-3)],
                [(+0),(-4)],
                [(+0),(-5)],
                [(+0),(-6)],
                [(+0),(-7)],
                [(-1),(+0)],
                [(-2),(+0)],
                [(-3),(+0)],
                [(-4),(+0)],
                [(-5),(+0)],
                [(-6),(+0)],
                [(-7),(+0)]
            ]
    },
    {
        id: QUEEN,
        find: [[(+0),(+1)],
                [(+0),(+2)],
                [(+0),(+3)],
                [(+0),(+4)],
                [(+0),(+5)],
                [(+0),(+6)],
                [(+0),(+7)],
                [(+1),(+0)],
                [(+2),(+0)],
                [(+3),(+0)],
                [(+4),(+0)],
                [(+5),(+0)],
                [(+6),(+0)],
                [(+7),(+0)],
                [(+0),(-1)],
                [(+0),(-2)],
                [(+0),(-3)],
                [(+0),(-4)],
                [(+0),(-5)],
                [(+0),(-6)],
                [(+0),(-7)],
                [(-1),(+0)],
                [(-2),(+0)],
                [(-3),(+0)],
                [(-4),(+0)],
                [(-5),(+0)],
                [(-6),(+0)],
                [(-7),(+0)],
                [(-1),(+1)],
                [(-2),(+2)],
                [(-3),(+3)],
                [(-4),(+4)],
                [(-5),(+5)],
                [(-6),(+6)],
                [(-7),(+7)],
                [(-1),(-1)],
                [(-2),(-2)],
                [(-3),(-3)],
                [(-4),(-4)],
                [(-5),(-5)],
                [(-6),(-6)],
                [(-7),(-7)],
                [(+1),(+1)],
                [(+2),(+2)],
                [(+3),(+3)],
                [(+4),(+4)],
                [(+5),(+5)],
                [(+6),(+6)],
                [(+7),(+7)],
                [(+1),(-1)],
                [(+2),(-2)],
                [(+3),(-3)],
                [(+4),(-4)],
                [(+5),(-5)],
                [(+6),(-6)],
                [(+7),(-7)]
        ],
    },
    {
        id: BISHOP,
        find: [
            [(+1), (+1)],
            [(+1), (-1)],
            [(-1), (+1)],
            [(-1), (-1)],
        ],
    },
    {
        id: KING,
        find: [
            [(+1), (+1)],
            [(+1), (-1)],
            [(-1), (+1)],
            [(-1), (-1)],
            [(+1), (+0)],
            [(-1), (+0)],
            [(+0), (+1)],
            [(+0), (-1)],
        ],
    }
];
/* 
king moves->
1. 
---------------
*/