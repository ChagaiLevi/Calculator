import LineHistory from "./LineHistory"
import { type HistoryListProps } from "../App";

const HistoryList: React.FC<{ history: HistoryListProps[], removeHistory: (id: string) => Promise<boolean> }> = ({ history, removeHistory }) => {
  return (
    <>
      {history.slice().reverse().map((historyItem: HistoryListProps) => (
        <LineHistory key={historyItem.id} history={historyItem} removeHistory={removeHistory} />
      ))}
    </>
  )
}

export default HistoryList