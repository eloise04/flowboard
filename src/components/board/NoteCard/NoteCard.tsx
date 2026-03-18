import { useState } from "react"
import { t } from "../../../i18n"
import styles from "./NoteCard.module.css"

const DRAG_DATA_TYPE = 'text/plain'

type CardProps = {
  readonly noteId: string
  readonly columnId: string
  readonly content?: string
  readonly handleEditNote?: (newText: string) => void
  readonly handleDeleteNote?: () => void
}

export default function Card({ noteId, columnId, content, handleEditNote, handleDeleteNote }: CardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const inputValue = content ?? t.notePlaceholder

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleEditNote?.(event.target.value)
  }

  const handleDragStart = (event: React.DragEvent<HTMLInputElement>) => {
    event.dataTransfer.setData(
      DRAG_DATA_TYPE,
      JSON.stringify({ noteId, fromColumnId: columnId }),
    )
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className={`card-container ${styles.container}`}>
      <input
        className="card"
        value={inputValue}
        readOnly={!isEditing}
        draggable={!isEditing}
        onDoubleClick={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        onDragStart={handleDragStart}
        onChange={handleChange}
      />
      {handleDeleteNote && (
        <button
          className={styles.deleteBtn}
          aria-label={t.deleteNote}
          onClick={handleDeleteNote}
        >
          ×
        </button>
      )}
    </div>
  )
}