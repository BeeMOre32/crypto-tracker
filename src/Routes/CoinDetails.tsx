import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPrice } from "./api";
import { Link, Outlet, useMatch, useParams } from "react-router-dom";
import { ICoinInfo, ICoinPrice } from "../interface/interface";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 2.5em 0;
  margin: 0 auto;
  max-width: 500px;
  a {
  }
`;

const CoinTitle = styled.h1`
  font-size: 4em;
  text-align: center;
  background: linear-gradient(to right, #fbcac9, #8ca6ce);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const CoinInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 1em;
  height: 30vh;
  gap: 10px;
`;

const CoinInfo = styled.div`
  background-color: ${(p) => p.theme.bgColor};
  border-radius: 1.5em;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 30px 0;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const CoinInfoTitle = styled.h2`
  text-align: center;
  font-size: 1.5em;
`;

const CoinInfoDetails = styled.h4`
  text-align: center;
  font-size: 1.2em;
`;

const CoinSubTitle = styled.h4`
  margin-top: 1em;
  font-size: 1.2em;
  background: linear-gradient(to right, #a0a0a0, #9cc4e8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CoinTab = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1em;
  background-color: ${(p) => (p.isActive ? p.theme.btnColor : p.theme.bgColor)};
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 30px 0;
  a {
    text-decoration: none;
    color: ${(p) => (p.isActive ? "black" : p.theme.textColor)};
  }
`;

const TabWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const BackLink = styled.div`
  top: 50px;
  position: absolute;
  a {
    text-decoration: none;
    h1 {
      font-size: 3em;
    }
  }
`;

export default function CoinDetails() {
  const PriceMatch = useMatch("/:coinId/Price");
  const ChartsMatch = useMatch("/:coinId/Chart");
  const Params = useParams();

  const { data: PriceData, isLoading: PriceLoading } = useQuery<ICoinPrice>(
    [Params.coinId, "Price"],
    () => fetchCoinPrice(Params.coinId!)
  );
  const { data: InfoData, isLoading: InfoLoading } = useQuery<ICoinInfo>(
    [Params.coinId, "info"],
    () => fetchCoinInfo(Params.coinId!)
  );

  const Loading = InfoLoading || PriceLoading;
  return (
    <Wrapper>
      {Loading ? (
        <span>Loading...</span>
      ) : (
        PriceData &&
        InfoData && (
          <>
            <BackLink>
              <Link to="/">
                <h1>⬅️</h1>
              </Link>
            </BackLink>
            <CoinTitle>{InfoData.name}</CoinTitle>
            <CoinSubTitle>{InfoData.description}</CoinSubTitle>
            <CoinInfoWrapper>
              <CoinInfo>
                <CoinInfoTitle>Coin Rank</CoinInfoTitle>
                <CoinInfoDetails>{PriceData.rank}</CoinInfoDetails>
              </CoinInfo>
              <CoinInfo>
                <CoinInfoTitle>Max Supply</CoinInfoTitle>
                <CoinInfoDetails>{PriceData.max_supply}</CoinInfoDetails>
              </CoinInfo>
              <CoinInfo>
                <CoinInfoTitle>Current Price</CoinInfoTitle>
                <CoinInfoDetails>${PriceData.quotes.USD.price}</CoinInfoDetails>
              </CoinInfo>
              <CoinInfo>
                <CoinInfoTitle>Total Supply</CoinInfoTitle>
                <CoinInfoDetails>{PriceData.total_supply}</CoinInfoDetails>
              </CoinInfo>
            </CoinInfoWrapper>

            <TabWrapper>
              <CoinTab isActive={PriceMatch !== null}>
                <Link to={`/${Params.coinId}/Price`}>Price</Link>
              </CoinTab>
              <CoinTab isActive={ChartsMatch !== null}>
                <Link to={`/${Params.coinId}/Chart`}>Chart</Link>
              </CoinTab>
            </TabWrapper>

            <Outlet context={Params.coinId} />
          </>
        )
      )}
    </Wrapper>
  );
}
