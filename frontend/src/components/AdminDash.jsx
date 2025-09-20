import Header from "./Header";

export default function AdminDash() {
  const addMember = async (e) => {
    e.preventDefault();
    const name = e.target.membername.value;
    const position = e.target.position.value;
    const email = e.target.email.value;
    const description = e.target.description.value;
    const image = e.target.memberImage.files[0];

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("position", position);
      formData.append("description", description);
      formData.append("email", email);
      if (image) formData.append("image", image);

      const res = await fetch("http://localhost:5000/gallery", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert("uploaded");
        e.target.reset(); // clear form
      } else {
        console.log(data.err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addEvent = async (e) => {
    e.preventDefault();

    const event = e.target.event.value;
    const post = e.target.post.value;
    const sms = e.target.sms.checked;
    const mail = e.target.mail.checked;
    const home = e.target.home.checked;
    const image = e.target.eventImage.files[0];

    try {
      const formData = new FormData();

      formData.append("event", event);
      formData.append("post", post);
      formData.append("sms", sms ? "true" : "false");
      formData.append("mail", mail ? "true" : "false");
      formData.append("home", home ? "true" : "false");
      if (image) formData.append("image", image);

      const res = await fetch("http://localhost:5000/events", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Event added successfully!");
        e.target.reset();
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const addRole = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const mobile = e.target.mobile.value;
    const role = e.target.role.value;
    let password = role === "admin" ? "Admin@123" : "User@123";

    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile, role, password }),
      });

      if (res.ok) {
        alert(`${name} created as ${role} successfully`);
        e.target.reset();
      } else {
        alert(`${name} not created as ${role}`);
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="w-full">
          <h1 className="text-3xl text-center font-bold mb-6 text-cyan-900">
            Admin Dashboard
          </h1>
          <div className="flex justify-evenly mx-auto flex-row gap-10 w-full ">
            {/* User Management */}
            <div className="bg-white p-6 rounded-lg shadow-md w-1/4">
              <h2 className="text-xl font-semibold mb-2">User Management</h2>
              <p className="text-gray-500 mb-4">
                Manage users, roles, and permissions.
              </p>

              <form onSubmit={addRole} method="POST" className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="name" className="font-medium mb-1">
                    Name
                  </label>
                  <input
                    className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600"
                    type="text"
                    name="name"
                    id="name"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="font-medium mb-1">
                    Email
                  </label>
                  <input
                    className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600"
                    type="email"
                    name="email"
                    id="email"
                    required
                  />
                </div>

                <div>
                  <label className="font-medium mb-1 block">Role</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="role" value="admin" required />{" "}
                      Admin
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="role" value="user" /> User
                    </label>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="mobile" className="font-medium mb-1">
                    Mobile Number
                  </label>
                  <input
                    className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600"
                    type="text"
                    name="mobile"
                    id="mobile"
                    required
                  />
                </div>

                <button
                  className="bg-cyan-900 text-white px-6 py-2 rounded-3xl hover:bg-cyan-700 transition"
                  type="submit"
                >
                  Add User
                </button>
              </form>
            </div>

            {/* Events */}
            <div className=" bg-white p-6 rounded-lg shadow-md w-4/6">
              <h2 className="text-xl font-semibold mb-2">Add New Events</h2>
              <p className="text-gray-500 mb-4">
                Manage Events and Notifications.
              </p>
              <form onSubmit={addEvent} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="event" className="font-medium mb-1">
                    Name of the Event
                  </label>
                  <input
                    className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600"
                    type="text"
                    name="event"
                    id="event"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="post" className="font-medium mb-1">
                    Event Post
                  </label>
                  <textarea
                    className="border min-h-40 border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600"
                    name="post"
                    id="post"
                    required
                  ></textarea>
                </div>

                <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 w-fit">
                  <h1 className="text-lg font-semibold text-gray-800 mb-4">
                    Notification Via :
                  </h1>
                  <div className="flex gap-8 flex-row items-center">
                    <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                      <input
                        type="checkbox"
                        name="mail"
                        id="mail"
                        className="w-5 h-5 accent-cyan-600 rounded"
                      />
                      Mail to Users
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                      <input
                        type="checkbox"
                        name="sms"
                        id="sms"
                        className="w-5 h-5 accent-cyan-600 rounded"
                      />
                      SMS to Users
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                      <input
                        type="checkbox"
                        name="home"
                        id="home"
                        className="w-5 h-5 accent-cyan-600 rounded"
                      />
                      Post in Homepage
                    </label>
                  </div>
                </div>
                <div>
                  <label htmlFor="eventImage" className="font-medium mb-1">
                    Poster Image
                  </label>
                  <input
                    className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600"
                    type="file"
                    name="image"
                    accept="image/png,image/jpeg,image/jpg"
                    id="eventImage"
                    required
                  />
                </div>

                <button
                  className="bg-cyan-900 text-white px-6 py-2 rounded-3xl hover:bg-cyan-700 transition"
                  type="submit"
                >
                  Add Event
                </button>
              </form>
            </div>
          </div>

          {/* Gallery Members */}
          <div className="bg-white p-6 rounded-lg shadow-md m-9">
            <h1 className="text-center text-xl font-semibold mb-2">
              Gallery Members
            </h1>
            <p className="text-center mb-4">Add or remove Gallery Members</p>
            <div>
              <form method="POST" onSubmit={addMember} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="membername" className="font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="membername"
                    id="membername"
                    required
                    className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="font-medium mb-1">
                    Email Id
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="description" className="font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    className="border min-h-32 border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600"
                    required
                  ></textarea>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="position" className="font-medium mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    id="position"
                    className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="memberImage" className="font-medium mb-1">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="memberImage"
                    accept="image/png,image/jpeg,image/jpg"
                    className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-cyan-900 text-white px-6 py-2 rounded-3xl hover:bg-cyan-700 transition"
                >
                  Add Gallery Member
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
