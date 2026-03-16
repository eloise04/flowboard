import Column from "../Column/Column"
import { useReducer } from 'react'
import { boardReducer } from '../../../state/boardReducer'
import { type Board as BoardType } from '../../../types/board'

export default function Board() {
  const initialState: BoardType = {
    columns: [
      { id: 'ideas', title: 'Ideas', notes: [] },
      { id: 'doing', title: 'Doing', notes: [] },
      { id: 'done', title: 'Done', notes: [] }
    ]
  }
  const [board, dispatch] = useReducer(boardReducer, initialState)

  const handleAddNote = (columnId: string) => {
    const id = `${columnId}-${Date.now()}`;
    dispatch({ type: 'ADD_NOTE', columnId, text: 'Nouvelle note', id })
    
  }

  const handleEditNote = (columnId: string, id: string, newText: string) => {
    dispatch({ type: 'EDIT_NOTE', columnId, id, newText })
  }

  return (
    <div className="board">
      <Column title={board.columns[0].title} notes={board.columns[0].notes} handleAddNote={handleAddNote} handleEditNote={handleEditNote} />
      <Column title={board.columns[1].title} notes={board.columns[1].notes} handleAddNote={handleAddNote} handleEditNote={handleEditNote} />
      <Column title={board.columns[2].title} notes={board.columns[2].notes} handleAddNote={handleAddNote} handleEditNote={handleEditNote} />
    </div>
  )
}