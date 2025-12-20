type historyBtnProps = {
  setOpenHistoryPage: React.Dispatch<React.SetStateAction<boolean>>
}

const HistoryBtn: React.FC<historyBtnProps> = ({ setOpenHistoryPage }) => {
  return (
    <button id="historyBtn" title="history" onClick={() => setOpenHistoryPage(true)}>History</button>
  )
}

export default HistoryBtn