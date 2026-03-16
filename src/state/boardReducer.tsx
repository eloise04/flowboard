import { type Board, type BoardAction } from '../types/board'

export function boardReducer(state: Board, action: BoardAction): Board {
    switch (action.type) {
        case 'ADD_NOTE':
            return {
                ...state,
                columns: state.columns.map(column => {
                    if (column.id === action.columnId) {
                        return {
                            ...column,
                            notes: [...column.notes, { id: action.id, content: action.text }]
                        }
                    }
                    return column
                })
            }
        case 'DELETE_NOTE':
            return {
                ...state,
                columns: state.columns.map(column => {
                    if (column.id === action.columnId) {
                        return {
                            ...column,
                            notes: column.notes.filter(note => note.id !== action.id)
                        }
                    }
                    return column
                })
            }
        case 'EDIT_NOTE':
            return  {
                ...state,
                columns: state.columns.map(column => {
                    if (column.id === action.columnId) {
                        return {
                            ...column,
                            notes: column.notes.map(note => {
                                if (note.id === action.id) {
                                    return { ...note, content: action.newText }
                                }
                                return note
                            }) 
                        }
                    }
                    return column
                })
            }
        case 'MOVE_NOTE': {
            if (action.fromColumnId === action.toColumnId) {
                return state
            }

            const movedNote = state.columns
                .find(column => column.id === action.fromColumnId)
                ?.notes.find(note => note.id === action.id)

            if (!movedNote) {
                return state
            }

            return {
                ...state,
                columns: state.columns.map(column => {
                    if (column.id === action.fromColumnId) {
                        return {
                            ...column,
                            notes: column.notes.filter(note => note.id !== action.id)
                        }
                    }

                    if (column.id === action.toColumnId) {
                        return {
                            ...column,
                            notes: [...column.notes, movedNote]
                        }
                    }

                    return column
                })
            }
        }

        default:
            return state
    }
}