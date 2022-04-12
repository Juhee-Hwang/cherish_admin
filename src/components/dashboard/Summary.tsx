import styled from "styled-components";
import { theme } from "styled-tools";

interface SummaryProps {
  summaryIcon: string;
  summaryText: string;
  dataNumber: string | number;
  dataVariation: number;
}

export default function Summary(props: SummaryProps) {
  const { summaryIcon, summaryText, dataNumber, dataVariation } = props;

  return (
    <StSummaryBox>
      <StSummaryIcon src={summaryIcon}></StSummaryIcon>
      <StSummaryText>
        <h3>{summaryText}</h3>
        <StSummaryData>
          <StDataNumber>{dataNumber}</StDataNumber>
          {dataVariation ? (
            <StDataVariation>
              {dataVariation > 0
                ? `( +${dataVariation} )`
                : `( ${dataVariation} )`}
            </StDataVariation>
          ) : null}
        </StSummaryData>
      </StSummaryText>
    </StSummaryBox>
  );
}

const StSummaryBox = styled.article`
  display: flex;
  align-items: center;
  background-color: ${theme("colors.pointWhite")};
  width: 47.1rem;
  height: 17rem;
`;

const StSummaryIcon = styled.img`
  width: 8.8rem;
  height: 8.8rem;
  margin: 3.9rem 3rem 3.9rem 3.9rem;
`;

const StSummaryText = styled.div`
  & > h3 {
    ${theme("fonts.korBold")};
    color: ${theme("colors.textBlack")};
  }
`;

const StSummaryData = styled.p`
  display: flex;
  ${theme("fonts.engBold")};
  margin-top: 1rem;
`;

const StDataNumber = styled.p`
  color: ${theme("colors.textBlack")};
  margin-right: 1rem;
`;

const StDataVariation = styled.p`
  color: ${theme("colors.textRed")};
`;
