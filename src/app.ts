import { scrapData } from "./scrapping";
import { saveSpots } from "./firestore";

async function main() {
  const spots = await scrapData();
  console.log(spots);
  await saveSpots(spots);
}

main();
