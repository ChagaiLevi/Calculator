const HistoryPage: React.FC<{ setOpenHistoryPage: React.Dispatch<React.SetStateAction<boolean>>, openHistroyPage: boolean }> = ({ setOpenHistoryPage, openHistroyPage }) => {
  return (
    <div id="sidebar" className="sidebar" style={openHistroyPage ? { width: '300px' } : { width: '0px' }}>
      <span className="closebtn" id="closeBtn" onClick={() => setOpenHistoryPage(false)} >&times;</span>
      <div className="container">
        <div className="table-header">History</div>
        <div className="history"></div>
      </div>
    </div>
  )
}

export default HistoryPage