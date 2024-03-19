import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface IRating {
  ratings: number;
  name: number;
}

interface IGraph {
  ratings: Array<IRating>;
  type: string;
  onChangeType: Dispatch<SetStateAction<string>>;
}

const Graph: React.FC<IGraph> = ({ ratings, type, onChangeType }) => {
  const maxRatingCount = Math.max(...ratings.map((item) => item.ratings));

  const handleChangeType = (event: ChangeEvent<HTMLSelectElement>) => {
    onChangeType(event.target.value);
  };

  return (
    <GraphComponent>
      <div className="selection">
        <h3>Ratings</h3>
        <select
          id="SelectType"
          name="Type"
          aria-label="Type"
          value={type}
          onChange={handleChangeType}
        >
          <option key={"all"} value={"All"}>
            All
          </option>
          <option key={"movies"} value={"movie"}>
            Movies
          </option>
          <option key={"series"} value={"tv"}>
            Series
          </option>
        </select>
      </div>
      <div className="graph">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={ratings}
            margin={{
              top: 25,
              right: 5,
              left: 5,
              bottom: 0,
            }}
            barSize={30}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 20, right: 20 }}
            />
            <YAxis tickCount={maxRatingCount} domain={[0, maxRatingCount]} />

            <Tooltip />
            <Legend
              payload={[
                {
                  value: "Number of Ratings",
                  type: "rect",
                  id: "ID01",
                  color: "#8884d8",
                },
              ]}
            />
            <CartesianGrid strokeDasharray="0 1" />
            <Bar dataKey="ratings" fill="#8884d8">
              <LabelList dataKey="ratings" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GraphComponent>
  );
};

export default Graph;

const GraphComponent = styled.div`
  box-shadow: 0px 0px 10px ${(props) => props.theme.boxShadow};
  background-color: ${(props) => props.theme.componentsBackground};
  height: clamp(26.5rem, 39vw, 37rem);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  @media (max-width: 500px) {
    min-height: 20rem;
  }

  .selection {
    color: ${(props) => props.theme.color};
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: clamp(1.25rem, 1.5vw, 1.5rem);

    h3 {
      padding-left: 2rem;
    }

    select {
      margin-right: 2rem;
      height: 2.5rem;
      width: 7rem;
      color: ${(props) => props.theme.color};
      background-color: ${(props) => props.theme.pageBackground};
      border: none;
      border-right: 10px solid transparent;
      border-radius: 20px;
      padding-left: 0.5rem;
      font-size: clamp(1rem, 1.5vw, 1.25rem);
    }
  }

  .graph {
    height: clamp(20rem, 30vw, 30rem);
    padding-right: 2rem;

    .recharts-legend-item {
      margin-left: 3rem;
    }
  }
`;
