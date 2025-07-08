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
  let exerciseText: string = `${history.exercise} = ${history.result}`;

  if (exerciseText.length > 23) exerciseText = `${exerciseText.slice(0, 20)}...`;

  return (
    <>
      <div className="table-row">
        <div className="content">
          <div className="date">{history.data.date}, {history.data.time}</div>
          <div>{exerciseText}</div>
        </div>
      </div>
    </>
  )
}

export default LineHistory