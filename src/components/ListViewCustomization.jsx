import { ListViewHeader, ListViewFooter } from "@progress/kendo-react-listview";
import { Avatar } from "@progress/kendo-react-layout";

export default function InviteItem(props) {
  let family = props.dataItem;

  return (
    <div
      className="row p-2 border-bottom align-middle"
      style={{
        margin: 0,
      }}
    >
      <div className="col-sm-6">
        <h2
          style={{
            fontSize: 14,
            color: "#454545",
            marginBottom: 0,
          }}
          className="text-uppercase"
        >
          {family.name}
        </h2>
      </div>
      <div className="col-sm-2"></div>
      <div className="col-sm-4">
        <div className="k-chip k-chip-filled k-chip-success">
          <div
            onClick={() => {
              console.log("hello");
            }}
            className="k-chip-content"
          >
            <div className="k-icon k-i-check" />
            Accept Invite
          </div>
        </div>
        <div className="k-chip k-chip-filled k-chip-error">
          <div className="k-icon k-i-close" />
          <div className="k-chip-content">Decline Invite</div>
        </div>
      </div>
    </div>
  );
}

export function MyHeader() {
  return <ListViewHeader className="p-2">Invite list</ListViewHeader>;
}
