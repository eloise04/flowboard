export default function Card({ content }: { readonly content?: string }) {
  return <div className="card">{content || "Note"}</div>
}