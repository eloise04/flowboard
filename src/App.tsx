import Topbar from "./layout/Topbar/Topbar"
import Board from "./components/board/Board/Board"

function App() {
  return (
    <div className="cork-board-frame">
      <Topbar />
      <Board />
    </div>
  )
}

export default App