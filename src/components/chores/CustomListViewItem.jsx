import { ListViewHeader } from "@progress/kendo-react-listview";
import {
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
} from "@progress/kendo-react-layout";
export default function ChoreItem(props) {
  let chore = props.dataItem;

  return (
    <div
      className="row p-2 border-bottom align-middle"
      style={{
        margin: 0,
      }}
      key={chore._id}
    >
      <Card
        orientation="horizontal"
        style={{
          borderWidth: "0px 0px 1px",
        }}
      >
        <CardBody>
          <div className="k-hbox k-justify-content-between k-flex-wrap">
            <div
              style={{
                width: "40%",
                padding: "5 0",
              }}
            >
              <CardTitle
                style={{
                  fontSize: 16,
                }}
              >
                {chore.name}
              </CardTitle>
              <CardSubtitle>{chore.description}</CardSubtitle>
            </div>
            <div
              style={{
                width: "35%",
                padding: "5 0",
              }}
            >
              <div>Points: {chore.points}</div>
              <div>
                deadline: {new Date(chore.deadline).toLocaleDateString()}
              </div>
            </div>
            <div
              style={{
                width: "25%",
                padding: "5 0",
              }}
            >
              <button
                className="btn btn-success"
                style={{
                  marginRight: 5,
                }}
                onClick={() =>
                  props.handleChoreCompleted(chore._id, chore.points)
                }
              >
                Completed
              </button>
              <button
                className="btn btn-danger"
                onClick={() => props.handleChoreDelete(chore._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export function MyHeader() {
  return <ListViewHeader className="p-2">Chore list</ListViewHeader>;
}
