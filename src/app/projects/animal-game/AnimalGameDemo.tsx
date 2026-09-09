'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

type Team = 'Tangerine' | 'Amethyst';
type PieceKind = 'Pika' | 'Trilobite' | 'Wombat' | 'Beluga';

interface GamePiece {
  id: string;
  team: Team;
  kind: PieceKind;
  row: number;
  column: number;
}

interface Direction {
  row: number;
  column: number;
}

const BOARD_SIZE = 7;
const COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const PIECE_ORDER: PieceKind[] = [
  'Pika',
  'Trilobite',
  'Wombat',
  'Beluga',
  'Wombat',
  'Trilobite',
  'Pika',
];
const PIECE_IMAGES: Record<PieceKind, string> = {
  Pika: '/projects/animal-game/pieces/pika.png',
  Trilobite: '/projects/animal-game/pieces/trilobite.png',
  Wombat: '/projects/animal-game/pieces/wombat.png',
  Beluga: '/projects/animal-game/pieces/beluga.png',
};
const ORTHOGONAL_DIRECTIONS: Direction[] = [
  { row: 1, column: 0 },
  { row: -1, column: 0 },
  { row: 0, column: 1 },
  { row: 0, column: -1 },
];
const DIAGONAL_DIRECTIONS: Direction[] = [
  { row: 1, column: 1 },
  { row: 1, column: -1 },
  { row: -1, column: 1 },
  { row: -1, column: -1 },
];

const createStartingPieces = (): GamePiece[] =>
  (['Tangerine', 'Amethyst'] as Team[]).flatMap((team) =>
    PIECE_ORDER.map((kind, column) => ({
      id: `${team}-${kind}-${column}`,
      team,
      kind,
      row: team === 'Tangerine' ? 0 : 6,
      column,
    })),
  );

const isInBounds = (row: number, column: number) =>
  row >= 0 && row < BOARD_SIZE && column >= 0 && column < BOARD_SIZE;

const coordinateKey = (row: number, column: number) => `${row}-${column}`;
const algebraicCoordinate = (row: number, column: number) =>
  `${COLUMNS[column]}${row + 1}`;

const pieceAt = (pieces: GamePiece[], row: number, column: number) =>
  pieces.find((piece) => piece.row === row && piece.column === column);

const slidingMoves = (
  piece: GamePiece,
  pieces: GamePiece[],
  directions: Direction[],
  distance: number,
) => {
  const moves: string[] = [];

  directions.forEach((direction) => {
    for (let step = 1; step <= distance; step += 1) {
      const row = piece.row + direction.row * step;
      const column = piece.column + direction.column * step;

      if (!isInBounds(row, column)) break;

      const occupant = pieceAt(pieces, row, column);
      if (!occupant) {
        moves.push(coordinateKey(row, column));
        continue;
      }

      if (occupant.team !== piece.team) moves.push(coordinateKey(row, column));
      break;
    }
  });

  return moves;
};

const jumpingMoves = (
  piece: GamePiece,
  pieces: GamePiece[],
  directions: Direction[],
  distance: number,
) =>
  directions.flatMap((direction) => {
    const row = piece.row + direction.row * distance;
    const column = piece.column + direction.column * distance;

    if (!isInBounds(row, column)) return [];

    const occupant = pieceAt(pieces, row, column);
    return !occupant || occupant.team !== piece.team
      ? [coordinateKey(row, column)]
      : [];
  });

const validMovesFor = (piece: GamePiece, pieces: GamePiece[]) => {
  switch (piece.kind) {
    case 'Pika':
      return [
        ...slidingMoves(piece, pieces, ORTHOGONAL_DIRECTIONS, 4),
        ...slidingMoves(piece, pieces, DIAGONAL_DIRECTIONS, 1),
      ];
    case 'Trilobite':
      return [
        ...slidingMoves(piece, pieces, DIAGONAL_DIRECTIONS, 2),
        ...slidingMoves(piece, pieces, ORTHOGONAL_DIRECTIONS, 1),
      ];
    case 'Wombat':
      return [
        ...jumpingMoves(piece, pieces, ORTHOGONAL_DIRECTIONS, 1),
        ...jumpingMoves(piece, pieces, DIAGONAL_DIRECTIONS, 1),
      ];
    case 'Beluga':
      return [
        ...jumpingMoves(piece, pieces, DIAGONAL_DIRECTIONS, 3),
        ...jumpingMoves(piece, pieces, ORTHOGONAL_DIRECTIONS, 1),
      ];
  }
};

const AnimalGameDemo = () => {
  const [pieces, setPieces] = useState<GamePiece[]>(createStartingPieces);
  const [currentTeam, setCurrentTeam] = useState<Team>('Tangerine');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [winner, setWinner] = useState<Team | null>(null);
  const [message, setMessage] = useState(
    'Tangerine moves first. Select one of its pieces.',
  );

  const selectedPiece = pieces.find((piece) => piece.id === selectedId);
  const validMoves = useMemo(
    () => (selectedPiece ? validMovesFor(selectedPiece, pieces) : []),
    [pieces, selectedPiece],
  );

  const resetGame = () => {
    setPieces(createStartingPieces());
    setCurrentTeam('Tangerine');
    setSelectedId(null);
    setWinner(null);
    setMessage('Tangerine moves first. Select one of its pieces.');
  };

  const handleSquareClick = (row: number, column: number) => {
    if (winner) return;

    const clickedPiece = pieceAt(pieces, row, column);

    if (!selectedPiece) {
      if (clickedPiece?.team === currentTeam) {
        setSelectedId(clickedPiece.id);
        setMessage(
          `${clickedPiece.kind} selected at ${algebraicCoordinate(row, column)}.`,
        );
      } else {
        setMessage(`Select a ${currentTeam} piece to move.`);
      }
      return;
    }

    if (clickedPiece?.team === currentTeam) {
      setSelectedId(clickedPiece.id);
      setMessage(
        `${clickedPiece.kind} selected at ${algebraicCoordinate(row, column)}.`,
      );
      return;
    }

    const destination = coordinateKey(row, column);
    if (!validMoves.includes(destination)) {
      setSelectedId(null);
      setMessage('That destination is not legal. Select another piece.');
      return;
    }

    const capturedPiece = clickedPiece;
    const movedKind = selectedPiece.kind;
    const destinationName = algebraicCoordinate(row, column);
    const nextPieces = pieces
      .filter((piece) => piece.id !== capturedPiece?.id)
      .map((piece) =>
        piece.id === selectedPiece.id ? { ...piece, row, column } : piece,
      );

    setPieces(nextPieces);
    setSelectedId(null);

    if (capturedPiece?.kind === 'Beluga') {
      setWinner(currentTeam);
      setMessage(`${currentTeam} captured the Beluga and won the game.`);
      return;
    }

    const nextTeam: Team =
      currentTeam === 'Tangerine' ? 'Amethyst' : 'Tangerine';
    setCurrentTeam(nextTeam);
    setMessage(
      capturedPiece
        ? `${movedKind} captured ${capturedPiece.kind} on ${destinationName}. ${nextTeam}'s turn.`
        : `${movedKind} moved to ${destinationName}. ${nextTeam}'s turn.`,
    );
  };

  const displayRows = [6, 5, 4, 3, 2, 1, 0];

  return (
    <section
      aria-labelledby='game-demo-title'
      className='overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 text-slate-100 shadow-xl'
    >
      <div className='flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 px-5 py-4'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-orange-300'>
            Browser recreation
          </p>
          <h2 id='game-demo-title' className='mt-1 text-xl font-bold'>
            Play AnimalGame
          </h2>
        </div>
        <button
          type='button'
          onClick={resetGame}
          className='cursor-pointer rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium transition hover:border-slate-400 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
        >
          Reset game
        </button>
      </div>

      <div className='grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_17rem]'>
        <div className='mx-auto w-full max-w-2xl'>
          <div className='mb-3 flex items-center justify-between gap-3'>
            <p className='font-semibold'>
              {winner ? `${winner} wins` : `${currentTeam}'s turn`}
            </p>
            <div className='flex gap-3 text-xs text-slate-400'>
              <span className='flex items-center gap-1.5'>
                <span className='h-3 w-3 rounded-full bg-orange-400' />{' '}
                Tangerine
              </span>
              <span className='flex items-center gap-1.5'>
                <span className='h-3 w-3 rounded-full bg-purple-400' /> Amethyst
              </span>
            </div>
          </div>

          <div className='grid grid-cols-[1.25rem_repeat(7,minmax(0,1fr))] grid-rows-[repeat(7,minmax(0,1fr))_1.25rem] gap-1'>
            {displayRows.flatMap((row) => [
              <span
                key={`row-${row}`}
                className='flex items-center justify-center text-xs text-slate-400'
              >
                {row + 1}
              </span>,
              ...COLUMNS.map((columnName, column) => {
                const piece = pieceAt(pieces, row, column);
                const key = coordinateKey(row, column);
                const isSelected = piece?.id === selectedId;
                const isValid = validMoves.includes(key);
                const isCapture = isValid && Boolean(piece);

                return (
                  <button
                    key={key}
                    type='button'
                    onClick={() => handleSquareClick(row, column)}
                    disabled={Boolean(winner)}
                    aria-label={`${algebraicCoordinate(row, column)}${
                      piece ? `, ${piece.team} ${piece.kind}` : ', empty'
                    }${isValid ? ', legal destination' : ''}`}
                    className={`relative flex aspect-square min-w-0 items-center justify-center rounded-sm transition focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-default ${
                      (row + column) % 2 === 0 ? 'bg-slate-700' : 'bg-slate-800'
                    } ${isSelected ? 'ring-4 ring-blue-400 ring-inset' : ''} ${
                      isCapture ? 'ring-4 ring-red-400 ring-inset' : ''
                    }`}
                  >
                    {isValid && !piece ? (
                      <span className='absolute h-3 w-3 rounded-full bg-emerald-300/80 sm:h-4 sm:w-4' />
                    ) : null}
                    {piece ? (
                      <span
                        title={`${piece.team} ${piece.kind}`}
                        className={`relative flex h-[74%] w-[74%] items-center justify-center rounded-full shadow-lg ${
                          piece.team === 'Tangerine'
                            ? 'bg-orange-400'
                            : 'bg-purple-400'
                        }`}
                      >
                        <Image
                          src={PIECE_IMAGES[piece.kind]}
                          alt=''
                          fill
                          sizes='(max-width: 640px) 8vw, 56px'
                          className='object-contain p-[7%]'
                        />
                      </span>
                    ) : null}
                  </button>
                );
              }),
            ])}
            <span />
            {COLUMNS.map((column) => (
              <span
                key={`column-${column}`}
                className='flex items-center justify-center text-xs text-slate-400'
              >
                {column}
              </span>
            ))}
          </div>
        </div>

        <aside className='space-y-5'>
          <div
            aria-live='polite'
            className='rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm leading-6 text-slate-200'
          >
            {message}
          </div>
          <div>
            <h3 className='font-semibold'>Piece key</h3>
            <dl className='mt-3 grid grid-cols-[2rem_1fr] items-center gap-x-3 gap-y-2 text-sm text-slate-300'>
              {Object.entries(PIECE_IMAGES).map(([kind, imagePath]) => (
                <div key={kind} className='contents'>
                  <dt className='relative h-8 w-8 overflow-hidden rounded-full bg-slate-700'>
                    <Image
                      src={imagePath}
                      alt=''
                      fill
                      sizes='32px'
                      className='object-contain p-1'
                    />
                    <span className='sr-only'>{kind}</span>
                  </dt>
                  <dd>{kind}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className='text-sm leading-6 text-slate-400'>
            Select a piece to reveal its legal destinations. Green marks an open
            square; a red outline marks a legal capture.
          </p>
        </aside>
      </div>
    </section>
  );
};

export default AnimalGameDemo;
