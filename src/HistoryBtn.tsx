const HistoryBtn: React.FC<{ setOpenHistoryPage: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setOpenHistoryPage }) => {
  return (
    <button id="historyBtn" title="history" onClick={() => setOpenHistoryPage(true)}>History</button>
  )
}

export default HistoryBtn