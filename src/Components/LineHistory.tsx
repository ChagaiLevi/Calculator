import { type HistoryListProps } from "../App";

type LineHistoryProps = {
  history: HistoryListProps,
  removeHistory: (id: string) => Promise<boolean>
}

const LineHistory: React.FC<LineHistoryProps> = ({ history, removeHistory }) => {
  let exerciseText: string = `${history.exercise} = ${history.result}`;

  exerciseText.length > 107 && (exerciseText = `${exerciseText.slice(0, 104)}...`);

  return (
    <>
      <div className="table-row" key={history.id}>
        <div className="content">
          <div className="date">{history.data.date}, {history.data.time}</div>
          <div className="exerciseText">{exerciseText}</div>
        </div>
        <button className="delete-btn" onClick={() => removeHistory(history.id)}>Delete</button>
      </div>
    </>
  )
}

export default LineHistory