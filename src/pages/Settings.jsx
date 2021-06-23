import React, { useEffect, useState } from "react";
import { getFamily } from "../api/getFamily";
import { getUser } from "../api/getUser";
import InviteItem, { MyHeader } from "../components/ListViewCustomization";
import { ListView } from "@progress/kendo-react-listview";

export default function Settings() {
  const [invites, setInvites] = useState([]);

  const loadInvites = async () => {
    const user = await getUser();
    if (user.invitedFamilies.lenght !== 0) {
      let families = [];
      for (const invite of user.invitedFamilies) {
        families.push(await getFamily(invite.id));
      }
      setInvites(families);
    }
  };

  useEffect(() => {
    loadInvites();
  }, []);

  const listOfInvites = invites.map((invite) => <li>{invite.name}</li>);

  return (
    <div>
      <ListView header={MyHeader} data={invites} item={InviteItem} />
    </div>
  );
}
