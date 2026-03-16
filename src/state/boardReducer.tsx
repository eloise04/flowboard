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
            return state
        default:
            return state
    }
}