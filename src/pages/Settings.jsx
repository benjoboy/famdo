import React, { useEffect, useState } from "react";
import { getFamily } from "../api/getFamily";
import { getUser } from "../api/getUser";
import InviteItem, { MyHeader } from "../components/ListViewCustomization";
import { ListView } from "@progress/kendo-react-listview";
import { useAppState } from "../state/state.context";

export default function Settings() {
  const [invitedFamilies, setFamilies] = useState([]);
  const {
    state: { families, family },
  } = useAppState();

  useEffect(() => {
    const loadInvites = async () => {
      const user = await getUser();
      if (user.invitedFamilies.lenght !== 0) {
        let families = [];
        for (const invite of user.invitedFamilies) {
          families.push(await getFamily(invite.id));
        }
        setFamilies(families);
      }
    };
    loadInvites();
  }, [families]);

  const MyCustomItem = (props) => (
    <InviteItem
      {...props}
      families={invitedFamilies}
      setFamilies={setFamilies}
    />
  );

  return (
    <div>
      <h1>current family: &nbsp;{family ? family.name : ""}</h1>
      <h3>
        Current family:&nbsp;
        {families && families.length > 0 ? families[0].id : ""}
      </h3>
      <ListView
        setFamilies={setFamilies}
        header={MyHeader}
        data={invitedFamilies}
        item={MyCustomItem}
      />
    </div>
  );
}
