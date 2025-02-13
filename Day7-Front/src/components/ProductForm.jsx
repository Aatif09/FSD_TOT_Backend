function ProductForm() {
  const postProduct = (dataobject) => {
    const url = import.meta.env.VITE_BACKEND_URL + '/api/v1/products';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataobject)
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    const values = e.target;
    const title = values[0].value;
    const company = values[1].value;
    const price = values[2].value;
    const discount = values[3].value;
    const quantity = values[4].value;
    const thumbnail = values[5].value;
    const dataobject = {
      title: title, company: company || undefined, price: price, discount: discount || undefined, quantity: quantity || undefined, thumbnail: thumbnail || undefined,
    }
    console.log(dataobject)

    console.log(title, company, price, discount, quantity, thumbnail)
    postProduct(dataobject);
  };
  return (
    <div><h2>Welcome to ProductForm</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Product Name:
            <input type="text" name="title" />
          </label>
        </div>
        <div>
          <label>
            Company Name:
            <input type="text" name="company" />
          </label>
        </div>
        <div>
          <label>
            Product Price:
            <input type="number" name="price" />
          </label>
        </div>
        <div>
          <label>
            Product discount
            <input type="number" name="discount" />
          </label>
        </div>
        <div>
          <label>
            Quantity
            <input type="number" name="quantity" />
          </label>
        </div>
        <div></div>

        <div>
          <label>
            Thumbnail
            <input type="text" name="thumbnail" />
          </label>
        </div>
        <button>Add Product</button>
      </form>
    </div>
  )
}

export default ProductForm