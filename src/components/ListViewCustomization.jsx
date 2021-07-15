import { ListViewHeader } from "@progress/kendo-react-listview";
import { acceptInvite } from "../api/acceptInvite";
import { declineInvite } from "../api/declineInvite";
export default function InviteItem(props) {
  let family = props.dataItem;
  const handleInvite = async (id, accept) => {
    if (accept) {
      const res = await acceptInvite(id);
      if (res.status === "accepted") {
        console.log("accepted");
        const families = props.families.filter((family) => family._id !== id);
      } else {
        console.log(res);
      }
    } else {
      const res = await declineInvite(id);
      if (res.status === "declined") {
        const families = props.families.filter((family) => family._id !== id);
      } else {
        console.log(res);
      }
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
            onClick={() => handleInvite(family._id, true)}
            className="k-chip-content"
          >
            <div className="k-icon k-i-check" />
            Accept Invite
          </div>
        </div>
        <div className="k-chip k-chip-filled k-chip-error">
          <div
            onClick={() => handleInvite(family._id, false)}
            className="k-chip-content"
          >
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
