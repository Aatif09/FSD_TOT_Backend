function ProductForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    const values = e.target;
    const title = values[0].value;
    const company = values[1].value;
    console.log(title, company)
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
            Product discount
            <input type="text" name="thumbnail" />
          </label>
        </div>
        <button>Add Product</button>
      </form>
    </div>
  )
}

export default ProductForm