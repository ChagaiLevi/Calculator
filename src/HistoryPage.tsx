import HistoryList from "./HistoryList"

const HistoryPage: React.FC<{
  history: any,
  setOpenHistoryPage: React.Dispatch<React.SetStateAction<boolean>>,
  openHistroyPage: boolean,
  isLoading: boolean,
  isApiAvailable: boolean
}> = ({ history, setOpenHistoryPage, openHistroyPage, isLoading, isApiAvailable }) => {
  return (
    <div id="sidebar" className="sidebar" style={openHistroyPage ? { width: '300px' } : { width: '0px' }}>
      <span className="closebtn" id="closeBtn" onClick={() => setOpenHistoryPage(false)} >&times;</span>
      <div className="container">
        <div className="table-header">History</div>
        <div className="history">
          {isLoading ? <div className="loading">Loading...</div> : null}
          {!isApiAvailable && history.length === 0 && !isLoading ? <div>The JSON Server is not conected</div> : null}
          <HistoryList history={history} />
        </div>
      </div>
    </div>
  )
}

export default HistoryPage