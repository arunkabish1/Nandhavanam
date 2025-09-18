import Header from "./Header";

export default function Login() {
  const checkLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    var password = e.target.password.value;

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Login Successful!");
        localStorage.setItem("User", JSON.stringify(data.user));
        window.location.href ="http://localhost:5173/admin";
      }else{
        alert(data.message)
      }
    } catch (err) {
      console.log("Login error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <Header />
        <div className="flex justify-center items-center">
          <div>
            <form onSubmit={checkLogin} method="post">
              <label htmlFor="">
                Email
                <input type="email" name="email" id="email" />
              </label>
              <label htmlFor="">
                Password
                <input type="password" name="password" id="password" />
              </label>
              <button>Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
