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

const HistoryList: React.FC<{ history: HistoryListProps[] }> = ({ history }) => {
  return (
    <>
      {history.slice().reverse().map((history) => (
        <LineHistory key={history.id} history={history} />
      ))}
    </>
  )
}

export default HistoryList