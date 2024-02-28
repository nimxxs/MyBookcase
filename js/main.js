const API_KEY =
  "ddad4259b659af428252ec826266babcb91d3bedc9d03f0dc7c703a28c0100b3";

const getAPI = async () => {
  const url = new URL(
    `https://www.nl.go.kr/NL/search/openApi/search.do?key=${API_KEY}&result_style=json`
  );
  console.log(11);
  const response = await fetch(url);
  console.log("response", response);

  //   const data = await response.json();
};
getAPI();
