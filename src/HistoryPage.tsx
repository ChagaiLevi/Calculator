import HistoryList from "./HistoryList"

const HistoryPage: React.FC<{
  history: any,
  setOpenHistoryPage: React.Dispatch<React.SetStateAction<boolean>>,
  openHistroyPage: boolean,
  isLoading: boolean,
  isApiAvailable: boolean
}> = ({ history, setOpenHistoryPage, openHistroyPage, isLoading, isApiAvailable }) => {
  let isResizing: boolean = false;

  const sidebar: any = document.getElementById("sidebar");
  //const resizeHandle: any = document.querySelector(".resize-handle");
  /*resizeHandle.addEventListener("mousedown", (e: any) => {
    e.preventDefault(); // Prevent text selection during resizing
    isResizing = true;
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
  });*/

  function resize(e: any) {
    if (!isResizing) return;
    const maxWidth = window.innerWidth * 0.75; // 75% of viewport width
    const minWidth = 280; // Increased to accommodate spacing
    let newWidth = e.clientX; // Use mouse X position for width
    if (newWidth < minWidth) newWidth = minWidth;
    if (newWidth > maxWidth) newWidth = maxWidth;
    sidebar.style.width = `${newWidth}px`;
    sidebar.style.left = "0"; // Ensure sidebar stays visible
  }

  function stopResize() {
    isResizing = false;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
  }

  return (
    <div id="sidebar" className="sidebar" style={openHistroyPage ? { width: '300px', left: '0' } : { width: '0px', left: '-300px' }}>
      <span className="closebtn" id="closeBtn" onClick={() => setOpenHistoryPage(false)} >&times;</span>
      <div className="resize-handle" onMouseDown={(e: any) => {
        e.preventDefault(); // Prevent text selection during resizing
        isResizing = true;
        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", stopResize);
      }}></div>
      <div className="container">
        <div className="table-header">History</div>
        <div className="history">
          {isLoading ? <div className="loading">Loading...</div> : null}
          {!isApiAvailable && !isLoading ? (
            <div>The JSON Server is not connected</div>
          ) : null}
          <HistoryList history={history} />
        </div>
      </div>
    </div>
  )
}

export default HistoryPage