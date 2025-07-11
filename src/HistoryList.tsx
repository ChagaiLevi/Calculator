import LineHistory from "./LineHistory"

type HistoryListProps = {
  data: {
    date: string;
    time: string;
  },
  exercise: string;
  result: number;
  id: number;
}

const HistoryList: React.FC<{ history: HistoryListProps[], removeHistory: (id: number) => Promise<boolean> }> = ({ history, removeHistory }) => {
  return (
    <>
      {history.slice().reverse().map((history) => (
        <LineHistory key={history.id} history={history} removeHistory={removeHistory} />
      ))}
    </>
  )
}

export default HistoryList