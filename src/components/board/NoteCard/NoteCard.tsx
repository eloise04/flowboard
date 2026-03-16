import { useState } from "react"
import { t } from "../../../i18n"

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

    // Create a visual copy for the drag image (only works in real browsers)
    if (event.dataTransfer.setDragImage) {
      const dragImage = document.createElement('div')
      dragImage.style.position = 'absolute'
      dragImage.style.left = '-9999px'
      dragImage.style.width = event.currentTarget.offsetWidth + 'px'
      dragImage.style.padding = '14px 12px'
      dragImage.style.background = '#ffe97d'
      dragImage.style.border = 'none'
      dragImage.style.borderRadius = '2px'
      dragImage.style.color = '#3d321f'
      dragImage.style.fontSize = '0.98rem'
      dragImage.style.fontFamily = '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive'
      dragImage.style.boxShadow = '0 12px 24px rgba(32, 22, 10, 0.4)'
      dragImage.style.opacity = '0.95'
      dragImage.textContent = inputValue
      document.body.appendChild(dragImage)

      event.dataTransfer.setDragImage(dragImage, 0, 0)

      // Clean up after drag starts
      setTimeout(() => dragImage.remove(), 0)
    }
  }

  return (
    <div className="card-container">
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
        <button className="delete-btn" onClick={handleDeleteNote}>
          {t.deleteNote}
        </button>
      )}
    </div>
  )
}