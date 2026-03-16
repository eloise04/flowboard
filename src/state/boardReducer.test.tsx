import { describe, expect, it } from 'vitest'
import { boardReducer } from './boardReducer'
import { type Board } from '../types/board'

const initialState: Board = {
  columns: [
    { id: 'ideas', title: 'Ideas', notes: [{ id: 'n1', content: 'Initial note' }] },
    { id: 'doing', title: 'Doing', notes: [] },
  ],
}

describe('boardReducer', () => {
  it('adds a note to the targeted column', () => {
    const result = boardReducer(initialState, {
      type: 'ADD_NOTE',
      columnId: 'ideas',
      id: 'n2',
      text: 'New note',
    })

    expect(result.columns[0].notes).toHaveLength(2)
    expect(result.columns[0].notes[1]).toEqual({ id: 'n2', content: 'New note' })
  })

  it('edits the targeted note content', () => {
    const result = boardReducer(initialState, {
      type: 'EDIT_NOTE',
      columnId: 'ideas',
      id: 'n1',
      newText: 'Updated note',
    })

    expect(result.columns[0].notes[0].content).toBe('Updated note')
  })

  it('deletes note from targeted column on DELETE_NOTE', () => {
    const result = boardReducer(initialState, {
      type: 'DELETE_NOTE',
      columnId: 'ideas',
      id: 'n1',
      text: 'ignored',
    })

    expect(result.columns[0].notes).toHaveLength(0)
    expect(result.columns[1].notes).toEqual(initialState.columns[1].notes)
  })

  it('moves a note from one column to another on MOVE_NOTE', () => {
    const result = boardReducer(initialState, {
      type: 'MOVE_NOTE',
      fromColumnId: 'ideas',
      toColumnId: 'doing',
      id: 'n1',
    })

    expect(result.columns[0].notes).toHaveLength(0)
    expect(result.columns[1].notes).toEqual([{ id: 'n1', content: 'Initial note' }])
  })
})
