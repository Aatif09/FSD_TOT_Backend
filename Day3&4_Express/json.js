//-----------------------------------------------------------------------------
//JSON.parse():Receiving Data (e.g., from an API or file):
const jsonString = '{"name": "chips", "price": 18}';
console.log(jsonString.name);

const jsonObject = JSON.parse(jsonString);
console.log(jsonObject.name);
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//JSON.stringify():Sending or Saving Data:
const jsonObject1 = { name: "chips", price: 18 };
console.log(jsonObject1);

const jsonString1 = JSON.stringify(jsonObject1);
console.log(jsonString1);


//-----------------------------------------------------------------------------

