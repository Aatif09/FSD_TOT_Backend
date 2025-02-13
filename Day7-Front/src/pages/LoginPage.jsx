
import { Link } from 'react-router-dom';
function LoginPage() {
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const response = await fetch("http://www.localhost:2002/api/v1/login", {
        method: "POST",
        credentials: "include",  // Include credentials for cross-origin requests
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        }
      });
      const resObj = await response.json();
      console.log(resObj)
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input name="email" type="text"></input>
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
        <Link to="/sign-up">Signup</Link>
      </form>
    </div>
  );
}

export default LoginPage;
