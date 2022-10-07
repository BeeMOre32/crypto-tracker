import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "./api";
import { Link } from "react-router-dom";
import { ICoinList } from "../interface/interface";
import { useSetRecoilState } from "recoil";
import { DarkMode } from "../atom";

const Wrapper = styled.div`
  padding: 2.5em 0;
  margin: 0 auto;
  max-width: 500px;
`;

const Header = styled.header`
  display: flex;
  font-size: 2em;
  justify-content: center;
  align-items: center;
  button {
    position: absolute;
    right: 15vw;
    background-color: inherit;
    border: none;
  }
`;

const CoinList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const Coins = styled.div`
  padding: 1em;
  box-sizing: border-box;
  background-color: ${(p) => p.theme.bgColor};
  box-shadow: rgba(17, 12, 46, 0.15) 0 48px 50px 0;
  width: 500px;
  height: 4em;
  border-radius: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  transition: all 0.1s linear;
  &:hover {
    top: 10px;
    scale: 1.05;
    a {
      color: cornflowerblue;
    }
  }
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${(p) => p.theme.textColor};
    width: 100%;
    height: 100%;
    img {
      margin-right: 1em;
    }
  }
`;

export default function Home() {
  const { data, isLoading } = useQuery<ICoinList[]>("coins", fetchCoins);
  const setDarkMode = useSetRecoilState(DarkMode);
  return (
    <Wrapper>
      <Header>
        <span>Coin Tracker</span>
        <button
          onClick={() => {
            setDarkMode((currVal) => !currVal);
          }}
        >
          <img
            width="40"
            src="https://cdn-icons-png.flaticon.com/512/1829/1829226.png"
            alt="dark mode"
          />
        </button>
      </Header>
      {isLoading ? (
        <span>Is Loading...</span>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coins key={coin.id}>
              <Link to={`/${coin.id}`}>
                <img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                  width="30px"
                  height="30px"
                  alt={""}
                />
                {coin.name} &rarr;
              </Link>
            </Coins>
          ))}
        </CoinList>
      )}
    </Wrapper>
  );
}
