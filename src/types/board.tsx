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
  | { type: "ADD_NOTE"; text: string; columnId: string, id: string }
  | { type: "DELETE_NOTE"; text: string; columnId: string; id: string }