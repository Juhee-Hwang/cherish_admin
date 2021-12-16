import DatePicker from "./DatePicker";
import { getDateJoinList } from "../../utils";
import { theme } from "styled-tools";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  title: string;
}

interface DateJoin {
  date: string;
  count: number;
}

export default function Chart(props: ChartProps) {
  const { title } = props;
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [dateJoinList, setDateJoinList] = useState<DateJoin[]>([]);

  const pickDate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.target instanceof HTMLButtonElement) {
      if (e.target.innerText.length > 2) {
        setYear(Number(e.target.innerText));
      } else {
        setMonth(Number(e.target.innerText));
      }
    }
  };

  useEffect(() => {
    (async function () {
      const data = await getDateJoinList();
      setDateJoinList(data);
    })();
  }, []);
  const options = {
    responsive: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#E3E3E3",
        },
      },
    },
  };
  const labels = dateJoinList.map((dateJoin) =>
    Number(dateJoin.date.substring(6, 8))
  );
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: dateJoinList.map((dateJoin) => dateJoin.count),
        borderColor:
          title === "일별 가입 사용자 증가 추이" ? "#F1B0BC" : "#97CDBD",
        backgroundColor:
          title === "일별 가입 사용자 증가 추이" ? "#F1B0BC" : "#97CDBD",
      },
    ],
  };
  return (
    <StChart>
      <StTopWrapper>
        <StTitle>{title}</StTitle>
        <DatePicker month={month} year={year} onClickDate={pickDate} />
      </StTopWrapper>
      <StBottomWrapper>
        <Line options={options} data={data} width="894px" height="320px" />
      </StBottomWrapper>
    </StChart>
  );
}

const StChart = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme("colors.bgWhite")};
  width: 100%;
  height: 45.3rem;
`;

const StTopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4.2rem;
  padding-top: 2.6rem;
  width: 93rem;
`;

const StBottomWrapper = styled.div`
  width: 89.4rem;
  height: 32rem;
`;

const StTitle = styled.h3`
  font-family: ${theme("fonts.korBold")};
  font-weight: 700;
`;