import { cert, initializeApp } from "firebase-admin/app";
import { GeoPoint, getFirestore } from "firebase-admin/firestore";
const serviceAccount = require("../earnest-sandbox-332713-a2ad6a3b0648.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const spotsCol = db.collection("spots");

async function saveSpots(data: { name: string; points: string[] }[]) {
  await Promise.all(
    data.map((e) => {
      spotsCol.add({
        name: e.name,
        latlong: e.points.length
          ? new GeoPoint(
              Number.parseFloat(e.points[0]),
              Number.parseFloat(e.points[1])
            )
          : null,
      });
    })
  );
}

export { saveSpots };
