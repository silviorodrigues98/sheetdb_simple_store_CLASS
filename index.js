var axios = require("axios")
const yourusername = process.env['yourusername']
const yourpassword = process.env['yourpassword']
const yoursheeturl = process.env['yoursheeturl']


function save(name, product, quantity, value)
//Add values to the database
{
  axios.post(yoursheeturl, {
    "data": {
      "name": name,
      "product": product,
      "quantity": quantity,
      "value": value
    }
  }, {
    "auth": {
      "username": yourusername,
      "password": yourpassword
    }
  })
}

function collect()
//Collects all data from the sheet
{
  axios.get(yoursheeturl, {
    "auth": {
      "username": yourusername,
      "password": yourpassword
    }
  })
    .then(response => {
      console.log(response.data)
    })
}

function productOf(person_name) //Searchs by person in the database
{
  axios.get(yoursheeturl + `/search?name=${person_name}`, {
    "auth": {
      "username": yourusername,
      "password": yourpassword
    }
  })
    .then(response => {
      const data = response.data
      const user = data[0]
      const product = user.product
      console.log(data)
    })
}

function updateProduct(name, product)
//Changes the value of a user product
{
  axios.patch(yoursheeturl + `/name/${name}`, {
    "data": { "product": product }
  }, {
    "auth": {
      "username": yourusername,
      "password": yourpassword
    }
  })

    .then(response => {
      console.log(response.data);
    })
}
save("ana", "x-burguer", 2, 10)

collect()

updateProduct("ana", "icecream")

productOf("ana")