const data = require("./data/data.json");
const fs = require("fs");

const result = data.establishments.map((item) => {
  const establishment = {};

  item.productsId.forEach((id) => {
    const prod = data.products.find((prodId) => prodId.id === id);
    prod.categoriesId.forEach((id) => {
      const categ = data.categories.find((categId) => categId.id === id);

      const exist = establishment[categ.name];

      console.log(establishment[prod.price])
      establishment[categ.name] = Object.assign(exist ? exist : {}, {
        [prod.name]: {
          price: prod.price/100,
        },
      });
    });
  });

  return { [item.name]: establishment };
});

fs.writeFileSync("result.json", JSON.stringify(result, null, 2));
