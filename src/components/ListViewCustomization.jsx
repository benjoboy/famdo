import { ListViewHeader } from "@progress/kendo-react-listview";
import { Avatar } from "@progress/kendo-react-layout";
import { acceptInvite } from "../api/acceptInvite";
export default function InviteItem(props) {
  let family = props.dataItem;
  const handleAccept = async (id) => {
    const res = await acceptInvite(id);
    if (res.status === "accepted") {
      console.log("accepted");
      window.location.reload();
    } else {
      console.log(res);
    }
  };

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
            onClick={() => handleAccept(family._id)}
            className="k-chip-content"
          >
            <div className="k-icon k-i-check" />
            Accept Invite
          </div>
        </div>
        <div className="k-chip k-chip-filled k-chip-error">
          <div className="k-chip-content">
            <div className="k-icon k-i-close" />
            Decline Invite
          </div>
        </div>
      </div>
    </div>
  );
}

export function MyHeader() {
  return <ListViewHeader className="p-2">Invite list</ListViewHeader>;
}
