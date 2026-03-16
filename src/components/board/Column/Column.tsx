import Card from "../NoteCard/NoteCard"
import { type NoteCard } from "../../../types/board"
import { t, useLanguage } from "../../../i18n"

export default function Column({ title, notes, handleAddNote, handleEditNote, handleDeleteNote }: { readonly title: string, readonly notes: readonly NoteCard[], readonly handleAddNote: (columnId: string) => void, readonly handleEditNote: (columnId: string, id: string, newText: string) => void, readonly handleDeleteNote: (columnId: string, id: string) => void }) {
  useLanguage()

  return (
    <div className="column">
      <h3>{title}</h3>

      {notes.length === 0 ? (
        <p>{t.noNotes}</p>
      ) : (
        notes.map((note) => (
          <Card key={note.id} content={note.content} handleEditNote={(newText) => handleEditNote(title.toLowerCase(), note.id, newText)} handleDeleteNote={() => handleDeleteNote(title.toLowerCase(), note.id)} />
        ))
      )}

      <button className="add-btn" onClick={() => handleAddNote(title.toLowerCase())}>
        + {t.addNote}
      </button>
    </div>
  )
}