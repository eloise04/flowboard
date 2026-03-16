import Card from "../NoteCard/NoteCard"
import { type NoteCard } from "../../../types/board"

export default function Column({ title, notes, handleAddNote }: { readonly title: string, readonly notes: readonly NoteCard[], readonly handleAddNote: (columnId: string) => void }) {
  return (
    <div className="column">
      <h3>{title}</h3>

      {notes.map((note) => (
        <Card key={note.id} content={note.content} />
      ))}

      <button className="add-btn" onClick={() => handleAddNote(title.toLowerCase())}>
        + Add note
      </button>
    </div>
  )
}