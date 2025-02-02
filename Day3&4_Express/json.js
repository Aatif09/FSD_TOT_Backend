//-----------------------------------------------------------------------------
//JSON.parse():Receiving Data (e.g., from an API or file):
const jsonString = '{"name": "chips", "price": 18}'; // JSON string format
console.log(jsonString.name);  // Output: "chips"

const jsonObject = JSON.parse(jsonString);  // Now a JavaScript object
console.log(jsonObject.name);  // Output: "chips"
//-----------------------------------------------------------------------------



//-----------------------------------------------------------------------------
//JSON.stringify():Sending or Saving Data:
const jsonObject1 = { name: "chips", price: 18 };  // JavaScript object
console.log(jsonObject1);  // Output: { name: 'chips', price: 18 }

const jsonString1 = JSON.stringify(jsonObject1);    // Now a JSON string
console.log(jsonString1);  // Output: '{"name":"chips","price":18}'


//-----------------------------------------------------------------------------

