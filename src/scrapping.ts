const puppeteer = require("puppeteer-core");
const url =
  "https://www.gob.pe/13334-consultar-centros-de-vacunacion-contra-la-covid-19-en-lima-metropolitana-y-callao";
const executablePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function scrapData() {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: executablePath,
  });

  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (request: any) =>
    request.resourceType() === "script" ? request.abort() : request.continue()
  );

  await page.goto(url);

  const data = await page.evaluate(() => {
    const ul = Array.from(document.querySelectorAll(".select_content li"));
    return ul.map((li) => {
      const anchors = li.getElementsByTagName("a");
      const regx = /(\-([\d]{2}\.[\d]+))/g;
      const points =
        anchors.length > 0
          ? [...new Set(anchors[0].getAttribute("href").match(regx))].slice(
              0,
              2
            )
          : [];
      return {
        name: li.textContent,
        points,
      };
    });
  });
  await browser.close();
  return data;
}

export { scrapData };
