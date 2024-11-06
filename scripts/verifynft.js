const { verify } = require("../utils/verify");

async function main() {
  await verify("0xFcC2402F990ACb1Ad9D8D3E4af3Ff79Ca5Dc68BE", []);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
