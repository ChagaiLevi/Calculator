import HistoryList from "./HistoryList"
import { type HistoryListProps } from "../App";

type historyPageProps = {
  history: HistoryListProps[],
  setOpenHistoryPage: React.Dispatch<React.SetStateAction<boolean>>,
  openHistroyPage: boolean,
  removeHistory: (id: string) => boolean
}

const HistoryPage: React.FC<historyPageProps> = ({ history, setOpenHistoryPage, openHistroyPage, removeHistory }) => {
  let isResizing: boolean = false;

  const sidebar: HTMLDivElement = document.getElementById("sidebar") as HTMLDivElement;
  function resize(e: MouseEvent) {
    if (!isResizing) return;
    const maxWidth = window.innerWidth * 0.75;
    const minWidth = 280;
    let newWidth = e.clientX;
    if (newWidth < minWidth) newWidth = minWidth;
    if (newWidth > maxWidth) newWidth = maxWidth;
    sidebar.style.width = `${newWidth}px`;
    sidebar.style.left = "0";
  }

  function stopResize() {
    isResizing = false;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
  }

  return (
    <div id="sidebar" className="sidebar" style={openHistroyPage ? { width: '300px', left: '0' } : { width: '0px', left: '-300px' }}>
      <span className="closebtn" id="closeBtn" onClick={() => setOpenHistoryPage(false)} >&times;</span>
      <div className="resize-handle" onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        isResizing = true;
        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", stopResize);
      }}></div>
      <div className="container">
        <div className="table-header">History</div>
        <div className="history">
          <HistoryList history={history} removeHistory={removeHistory} />
        </div>
      </div>
    </div>
  )
}

export default HistoryPage