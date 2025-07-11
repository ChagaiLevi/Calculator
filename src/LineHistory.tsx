import { HistoryListProps } from "./App";

const LineHistory: React.FC<{ history: HistoryListProps, removeHistory: (id: string) => Promise<boolean> }> = ({ history, removeHistory }) => {
  let exerciseText: string = `${history.exercise} = ${history.result}`;

  if (exerciseText.length > 107) exerciseText = `${exerciseText.slice(0, 104)}...`;


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