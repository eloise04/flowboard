import { t } from "../../../i18n"

type CardProps = {
  readonly content?: string
  readonly handleEditNote?: (newText: string) => void
  readonly handleDeleteNote?: () => void
}

export default function Card({ content, handleEditNote, handleDeleteNote }: CardProps) {
  const defaultContent = content ?? t.notePlaceholder

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleEditNote?.(event.target.value)
  }

  return (
    <div className="card-container">
      <input className="card" defaultValue={defaultContent} onChange={handleChange} />
      {handleDeleteNote && (
        <button className="delete-btn" onClick={handleDeleteNote}>
          {t.deleteNote}
        </button>
      )}
    </div>
  )
}