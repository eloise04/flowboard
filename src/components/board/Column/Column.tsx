import Card from "../NoteCard/NoteCard"

export default function Column({ title }: { title: string }) {
  return (
    <div className="column">
      <h3>{title}</h3>

      <Card />
      <Card />
      <Card />

      <button className="add-btn">+ Add note</button>
    </div>
  )
}