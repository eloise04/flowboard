import Card from "../NoteCard/NoteCard"
import { type NoteCard } from "../../../types/board"
import { t } from "../../../i18n"

export default function Column({ title, notes, handleAddNote, handleEditNote }: { readonly title: string, readonly notes: readonly NoteCard[], readonly handleAddNote: (columnId: string) => void, readonly handleEditNote: (columnId: string, id: string, newText: string) => void }) {
  return (
    <div className="column">
      <h3>{title}</h3>

      {notes.length === 0 ? (
        <p>{t.noNotes}</p>
      ) : (
        notes.map((note) => (
          <Card key={note.id} content={note.content} handleEditNote={(newText) => handleEditNote(title.toLowerCase(), note.id, newText)} />
        ))
      )}

      <button className="add-btn" onClick={() => handleAddNote(title.toLowerCase())}>
        + {t.addNote}
      </button>
    </div>
  )
}