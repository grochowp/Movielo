import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import { useUser } from "../../../contexts/UserContext";

export const AchievementsGraph = () => {
  const { user } = useUser();
  const data: Array<object> = [
    { name: "Completed", value: calculateCompletedPercentage() },
    { name: "In Progress", value: 100 - calculateCompletedPercentage() },
  ];
  const colors: Array<string> = ["#00FF7F", "#FF8042"];

  function calculateCompletedPercentage() {
    if (!user) return 0;
    const achievements = user.achievements.length;
    const totalAchievements = 7; // number of all possible achievements

    return (achievements / totalAchievements) * 100;
  }

  return (
    <Graph>
      <h3>Achievements progress</h3>

      <ResponsiveContainer width="100%" height="80%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={""}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              value.toFixed(1) + "%",
              name,
            ]}
          />
          <Legend align="right" verticalAlign="middle" layout="vertical" />
        </PieChart>
      </ResponsiveContainer>
    </Graph>
  );
};

const Graph = styled.div`
  box-shadow: 0px 0px 10px ${(props) => props.theme.boxShadow};
  background-color: ${(props) => props.theme.componentsBackground};
  margin-bottom: 2rem;
  height: clamp(15rem, 28vw, 29rem);
  border-radius: 10px;

  h3 {
    width: 100%;
    height: 3rem;
    font-size: clamp(1.25rem, 1.5vw, 1.5rem);
    display: flex;
    color: ${(props) => props.theme.color};
    align-items: center;
    padding-left: 1.5rem;
    padding-top: 0.5rem;
    margin: 0;
    font-family: "In", sans-serif;
  }
`;
