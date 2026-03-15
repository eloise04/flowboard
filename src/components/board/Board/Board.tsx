import Column from "../Column/Column"

export default function Board() {
  return (
    <div className="board">
      <Column title="Ideas" />
      <Column title="Doing" />
      <Column title="Done" />
    </div>
  )
}