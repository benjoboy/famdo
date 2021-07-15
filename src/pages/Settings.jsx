import React, { useEffect, useState } from "react";
import { getFamily } from "../api/getFamily";
import { getUser } from "../api/getUser";
import InviteItem, { MyHeader } from "../components/ListViewCustomization";
import { ListView } from "@progress/kendo-react-listview";

export default function Settings() {
  const [families, setFamilies] = useState([]);

  const loadInvites = async () => {
    const user = await getUser();
    if (user.invitedFamilies.lenght !== 0) {
      let families = [];
      for (const invite of user.invitedFamilies) {
        families.push(await getFamily(invite.id));
      }
      console.log("fam", families);
      setFamilies(families);
    }
  };

  useEffect(() => {
    loadInvites();
  }, []);

  const MyCustomItem = (props) => (
    <InviteItem {...props} families={families} setFamilies={setFamilies} />
  );

  return (
    <div>
      <ListView
        setFamilies={setFamilies}
        header={MyHeader}
        data={families}
        item={MyCustomItem}
      />
    </div>
  );
}
