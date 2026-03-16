import Card from "../NoteCard/NoteCard"
import { type NoteCard } from "../../../types/board"
import { t, useLanguage } from "../../../i18n"

const DRAG_DATA_TYPE = 'text/plain'

export default function Column({ columnId, title, notes, handleAddNote, handleEditNote, handleDeleteNote, handleMoveNote }: { readonly columnId: string, readonly title: string, readonly notes: readonly NoteCard[], readonly handleAddNote: (columnId: string) => void, readonly handleEditNote: (columnId: string, id: string, newText: string) => void, readonly handleDeleteNote: (columnId: string, id: string) => void, readonly handleMoveNote: (fromColumnId: string, toColumnId: string, id: string) => void }) {
  useLanguage()

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    const data = event.dataTransfer.getData(DRAG_DATA_TYPE)
    if (!data) return

    const payload = JSON.parse(data) as { noteId: string; fromColumnId: string }
    if (!payload.noteId || !payload.fromColumnId) return

    handleMoveNote(payload.fromColumnId, columnId, payload.noteId)
  }

  return (
    <section
      className="column"
      aria-label={title}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h3>{title}</h3>

      {notes.length === 0 ? (
        <p>{t.noNotes}</p>
      ) : (
        notes.map((note) => (
          <Card key={note.id} noteId={note.id} columnId={columnId} content={note.content} handleEditNote={(newText) => handleEditNote(columnId, note.id, newText)} handleDeleteNote={() => handleDeleteNote(columnId, note.id)} />
        ))
      )}

      <button className="add-btn" onClick={() => handleAddNote(columnId)}>
        + {t.addNote}
      </button>
    </section>
  )
}