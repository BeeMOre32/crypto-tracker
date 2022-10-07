import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ICoinPrice } from "../interface/interface";
import { fetchCoinPrice } from "./api";

const PriceListWrapper = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PriceList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.5em;
  box-shadow: rgba(17, 12, 46, 0.15) 0 48px 50px 0;
  width: 100%;
  height: 3em;
  background-color: ${(p) => p.theme.bgColor};
  margin-top: 1em;
  h1 {
    font-size: 1.1em;
  }
`;

export default function Price() {
  const { coinId } = useParams();
  const { data, isLoading } = useQuery<ICoinPrice>([coinId, "Price"], () =>
    fetchCoinPrice(coinId!)
  );
  return (
    <PriceListWrapper>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <PriceList>
            <h1>Ath Price: ${data?.quotes.USD.ath_price}</h1>
          </PriceList>
          <PriceList>
            <h1>
              24Hr Percentage Change : {data?.quotes.USD.percent_change_24h}%
            </h1>
          </PriceList>
          <PriceList>
            <h1>
              12Hr Percentage Change : {data?.quotes.USD.percent_change_12h}%
            </h1>
          </PriceList>
          <PriceList>
            <h1>
              1Hr Percentage Change : {data?.quotes.USD.percent_change_1h}$
            </h1>
          </PriceList>
        </>
      )}
    </PriceListWrapper>
  );
}
