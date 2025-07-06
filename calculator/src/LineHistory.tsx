type HistoryListProps = {
  data: {
    date: string;
    time: string;
  },
  exercise: string;
  result: number;
  id: number;
}

const LineHistory: React.FC<{ history: HistoryListProps }> = ({ history }) => {
  return (
    <>
      <div className="table-row">
        <div className="content">
          <div className="date">{history.data.date}, {history.data.time}</div>
          <div>{history.exercise} = {history.result}</div>
        </div>
      </div>
    </>
  )
}

export default LineHistory