import { t } from "../../../i18n"

type CardProps = {
  readonly content?: string
  readonly handleEditNote?: (newText: string) => void
}

export default function Card({ content, handleEditNote }: CardProps) {
  const defaultContent = content ?? t.notePlaceholder

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleEditNote?.(event.target.value)
  }

  return <input className="card" defaultValue={defaultContent} onChange={handleChange} />
}