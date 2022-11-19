const fetch = require("sync-fetch");
const Page = require("./_layout/Default");

module.exports = class extends Page {
  constructor() {
    super({ title: "Home", sName: "Laura" });
  }
  render(sPage) {
    const oJson = fetch(
      "https://prog8110f22-67474-default-rtdb.firebaseio.com/meals.json"
    ).json();
    console.log(oJson);
    let sResult = "<h1>Upcoming Popup Meals</h1>";
    let price = "0";
    Object.keys(oJson).map((key) => {
      const oEntity = oJson[key];
      console.log(oEntity);
      oEntity.id = key;
      price = oEntity.item_price.split("$");
      sResult += `
            <h2>${oEntity.title}</h2>
            <p><img src="${oEntity.featured_image}" alt="${oEntity.title}"</p>
            <p>${oEntity.full_description}</p>
            <p>${oEntity.item_price}</p>
            <form action="https://serene-taiga-04277.herokuapp.com/payment" method="post">
            <input type="hidden" name="title" value="${oEntity.title}" />
            <input type="hidden" name="price" value="${price[1]}" />
            <input type="tel" placeholder="enter your number" name="telephone"/>
            <button type="submit">Order now</button>
            </form>
            `;
    });
    return sResult;
  }
};
