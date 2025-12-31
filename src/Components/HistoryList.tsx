import LineHistory from "./LineHistory"
import { type HistoryListProps } from "../App";

type HistoryListComponentProps = {
  history: HistoryListProps[],
  removeHistory: (id: string) => boolean
}

const HistoryList: React.FC<HistoryListComponentProps> = ({ history, removeHistory }) => {
  return (
    <>
      {history.slice().reverse().map((historyItem: HistoryListProps) => (
        <LineHistory key={historyItem.id} history={historyItem} removeHistory={removeHistory} />
      ))}
    </>
  )
}

export default HistoryList