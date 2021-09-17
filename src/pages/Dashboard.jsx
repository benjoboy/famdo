import React, { useEffect, useState } from "react";
import { getUser } from "../api/getUser";
import {
  Chart,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartSeries,
  ChartSeriesItem,
  ChartTitle,
} from "@progress/kendo-react-charts";

export default function Dashboard(props) {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [names, setNames] = useState([]);
  useEffect(() => {
    const getAllMembers = async (members) => {
      try {
        setUsers([]);
        setData([]);
        setNames([]);
        for (const member of members) {
          const user = await getUser(member.id);
          setUsers((prevUser) => prevUser.concat(user));
          setData((prevData) => prevData.concat(user.points));
          setNames((prevNames) => prevNames.concat(user.name));
        }
      } catch (e) {
        console.log(e, "error getting members");
      }
    };
    if (props.members && props.members.length !== users.length) {
      console.log("je");
      getAllMembers(props.members);
    }
  }, [props.members]);

  return (
    <div>
      <Chart style={{ height: "80vh" }}>
        <ChartTitle text="Points" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={names}></ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartSeries>
          <ChartSeriesItem data={data} />
        </ChartSeries>
      </Chart>
    </div>
  );
}
