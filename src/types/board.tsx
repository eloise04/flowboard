export type NoteCard = {
  id: string
  content: string
}

export type Column = {
  id: string
  title: string
  notes: NoteCard[]
}

export type Board = {
  columns: Column[]
}

export type BoardAction =
  | { type: "ADD_NOTE"; columnId: string }
  | { type: "DELETE_NOTE"; columnId: string; noteId: string }