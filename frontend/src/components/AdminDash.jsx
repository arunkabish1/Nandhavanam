import React, { useEffect, useState } from "react";
import AdminModal from "./AdminModal.jsx";

const StatusMessage = ({ message, type }) => {
  if (!message) return null;
  const types = {
    success: "bg-green-100 text-green-700 border-green-300",
    error: "bg-red-100 text-red-700 border-red-300",
    info: "bg-blue-100 text-blue-700 border-blue-300",
  };
  return (
    <div
      className={`border p-3 rounded-lg text-center font-medium mt-3 ${types[type]}`}
    >
      {message}
    </div>
  );
};

export default function AdminDash() {
  const [activeTab, setActiveTab] = useState("users");

  const [memberData, setMemberData] = useState({
    name: "",
    position: "",
    email: "",
    description: "",
  });
  const [memberImage, setMemberImage] = useState(null);
  const [memberStatus, setMemberStatus] = useState({ message: "", type: "" });
  const [isSubmittingMember, setIsSubmittingMember] = useState(false);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);

  const [contactdata, setContactdata] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  const [eventData, setEventData] = useState({
    event: "",
    post: "",
    sms: false,
    mail: false,
    home: false,
    date: "",
  });
  const [eventImage, setEventImage] = useState(null);
  const [eventStatus, setEventStatus] = useState({ message: "", type: "" });
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [isGeneratingPost, setIsGeneratingPost] = useState(false);

  const [roleData, setRoleData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
  });
  const [roleStatus, setRoleStatus] = useState({ message: "", type: "" });
  const [isSubmittingRole, setIsSubmittingRole] = useState(false);

  const inputClass =
    "w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-600 outline-none transition text-gray-700";
  const buttonPrimary =
    "bg-cyan-700 hover:bg-cyan-800 text-white py-2 px-4 rounded-lg w-full transition font-medium";
  const buttonSecondary =
    "bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-3 rounded-md text-sm transition";

  const handleInputChange = (setter) => (e) => {
    const { name, value, type, checked } = e.target;
    setter((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (setter) => (e) => setter(e.target.files[0] || null);

  const handleChange = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ respond: true }),
      });
      setContactdata((prev) =>
        prev.map((c) => (c._id === id ? { ...c, respond: true } : c))
      );
    } catch {}
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/contactsview`);
        const data = await res.json();
        setContactdata(data || []);
      } catch {}
    })();
  }, []);

  const callAI = async (prompt) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const json = await res.json();
    return json.text;
  };

  const handleGenerateEventPost = async () => {
    if (!eventData.event) return;
    setIsGeneratingPost(true);
    try {
      const text = await callAI(
        `Write a professional announcement post for the event: "${eventData.event}" held by NFA Kuwait. The announcement should sound formal and engaging.
Include placeholders for the date, time, and location in the format: [Date], [Time], [Location].
Do not use bold, italics, emojis, or decorative characters.
Provide the result as clean plain text only. in tamil`
      );
      setEventData((p) => ({ ...p, post: text }));
      setEventStatus({ message: "Post Generated!", type: "success" });
    } catch {
      setEventStatus({ message: "Failed to generate post.", type: "error" });
    } finally {
      setIsGeneratingPost(false);
    }
  };

  const handleGenerateMemberBio = async () => {
    if (!memberData.name || !memberData.position) return;
    setIsGeneratingBio(true);
    try {
      const text = await callAI(
        `Write a short, friendly bio for ${memberData.name}, who is a ${memberData.position}.
Keep the tone warm, approachable, and positive.
Do not use emojis or overly formal language.
Output plain text only.`
      );
      setMemberData((p) => ({ ...p, description: text }));
      setMemberStatus({
        message: "Bio Generated Successfully!",
        type: "success",
      });
    } catch {
      setMemberStatus({ message: "Failed to generate bio.", type: "error" });
    } finally {
      setIsGeneratingBio(false);
    }
  };

  const addMember = async (e) => {
    e.preventDefault();
    setIsSubmittingMember(true);
    setMemberStatus({ message: "", type: "" });

    const fd = new FormData();
    fd.append("mname", memberData.name);
    fd.append("position", memberData.position);
    fd.append("description", memberData.description);
    fd.append("email", memberData.email);
    if (memberImage) fd.append("image", memberImage);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/gallery`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error();
      setMemberStatus({ message: "Member Added!", type: "success" });
      setMemberData({ name: "", position: "", email: "", description: "" });
      setMemberImage(null);
      e.target.reset();
    } catch {
      setMemberStatus({ message: "Failed to add member.", type: "error" });
    } finally {
      setIsSubmittingMember(false);
    }
  };

  const addEvent = async (e) => {
    e.preventDefault();
    setIsSubmittingEvent(true);
    setEventStatus({ message: "", type: "" });

    const fd = new FormData();
    Object.entries(eventData).forEach(([k, v]) => fd.append(k, v));
    if (eventImage) fd.append("image", eventImage);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error();
      setWhatsappUrl(await res.json());

      setEventStatus({ message: "Event Added!  ", type: "success" });

      setEventData({
        event: "",
        post: "",
        sms: false,
        mail: false,
        home: false,
        date: "",
      });

      setEventImage(null);

      e.target.reset();
    } catch {
      setEventStatus({ message: "Failed to add event.", type: "error" });
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  const addRole = async (e) => {
    e.preventDefault();
    setIsSubmittingRole(true);
    const password = roleData.role === "admin" ? "Admin@123" : "User@123";
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...roleData, password }),
      });
      if (!res.ok) throw new Error();
      setRoleStatus({ message: `User Created!`, type: "success" });
      setRoleData({ name: "", email: "", mobile: "", role: "" });
      e.target.reset();
    } catch {
      setRoleStatus({ message: "Failed to create user.", type: "error" });
    } finally {
      setIsSubmittingRole(false);
    }
  };

  const sendReplyEmail = async () => {
    if (!replyMessage.trim()) return;
    setSendingEmail(true);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/sent-reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: selectedContact.email,
          message: replyMessage,
          date: selectedContact.createdAt,
        }),
      });

      handleChange(selectedContact._id);
      setReplyMessage("");
      alert("✅ Email Sent Successfully");
    } catch {
      alert("❌ Failed to send email");
    } finally {
      setSendingEmail(false);
    }
  };

  useEffect(() => {
    if (selectedContact) {
      setReplyMessage(`Hi ${selectedContact.name},\n\n`);
    }
  }, [selectedContact]);

  return (
    <div className="min-h-screen pt-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <h1 className="text-3xl font-bold text-center text-cyan-800 mb-6">
          Admin Dashboard
        </h1>

        {/* TABS */}
        <div className="flex gap-3 flex-wrap justify-center mb-8">
          {["users", "events", "members", "contacts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                activeTab === tab
                  ? "bg-cyan-800 text-white shadow"
                  : "bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {tab === "users" && "User Management"}
              {tab === "events" && "Events"}
              {tab === "members" && "Gallery Members"}
              {tab === "contacts" && "Contacts"}
            </button>
          ))}
        </div>

        {/* USERS */}
        {activeTab === "users" && (
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Add User</h2>
            <form onSubmit={addRole} className="space-y-4">
              <input
                className={inputClass}
                placeholder="Name"
                name="name"
                required
                onChange={handleInputChange(setRoleData)}
              />
              <input
                className={inputClass}
                placeholder="Email"
                name="email"
                required
                onChange={handleInputChange(setRoleData)}
              />
              <input
                className={inputClass}
                placeholder="Mobile"
                name="mobile"
                required
                onChange={handleInputChange(setRoleData)}
              />
              <div className="flex gap-6">
                <label className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    onChange={handleInputChange(setRoleData)}
                  />{" "}
                  Admin
                </label>
                <label className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    onChange={handleInputChange(setRoleData)}
                  />{" "}
                  User
                </label>
              </div>
              <button className={buttonPrimary} disabled={isSubmittingRole}>
                {isSubmittingRole ? "Adding..." : "Add User"}
              </button>
              <StatusMessage {...roleStatus} />
            </form>
          </div>
        )}

        {/* EVENTS */}
        {activeTab === "events" && (
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Add Event</h2>
            <form onSubmit={addEvent} className="space-y-4">
              <input
                className={inputClass}
                name="event"
                placeholder="Event Name"
                value={eventData.event}
                onChange={handleInputChange(setEventData)}
                required
              />

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label>Event Post</label>
                  <button
                    type="button"
                    onClick={handleGenerateEventPost}
                    className={buttonSecondary}
                    disabled={isGeneratingPost}
                  >
                    {isGeneratingPost ? "..." : "✨ Generate"}
                  </button>
                </div>
                <textarea
                  className={inputClass + " min-h-28"}
                  name="post"
                  value={eventData.post}
                  onChange={handleInputChange(setEventData)}
                  required
                />
              </div>

              <div className="flex gap-4 flex-wrap">
                {["mail", "sms", "home"].map((n) => (
                  <label key={n} className="flex gap-2 items-center text-sm">
                    <input
                      type="checkbox"
                      name={n}
                      checked={eventData[n]}
                      onChange={handleInputChange(setEventData)}
                    />{" "}
                    {n.toUpperCase()}
                  </label>
                ))}
              </div>

              <input
                type="file"
                onChange={handleFileChange(setEventImage)}
                className="text-sm"
                required
              />
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleInputChange(setEventData)}
                className={inputClass}
                required
              />

              <button className={buttonPrimary} disabled={isSubmittingEvent}>
                {isSubmittingEvent ? "Adding..." : "Add Event"}
              </button>
              <StatusMessage {...eventStatus} />
              {whatsappUrl?.whatsappShareURL && (
                <a
                  href={whatsappUrl.whatsappShareURL}
                  target="_blank"
                  className="flex justify-center gap-2  mt-4 px-5 py-2.5 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 transition-all duration-300 animate-pulse hover:animate-none shadow-md hover:shadow-lg"
                >
                  <span className="text-xl">💚</span>
                  Share on WhatsApp
                </a>
              )}
            </form>
          </div>
        )}

        {/* MEMBERS */}
        {activeTab === "members" && (
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Add Gallery Member</h2>
            <form onSubmit={addMember} className="space-y-4">
              <input
                className={inputClass}
                name="name"
                value={memberData.name}
                placeholder="Name"
                onChange={handleInputChange(setMemberData)}
                required
              />
              <input
                className={inputClass}
                name="email"
                value={memberData.email}
                placeholder="Email"
                onChange={handleInputChange(setMemberData)}
                required
              />
              <input
                className={inputClass}
                name="position"
                value={memberData.position}
                placeholder="Position"
                onChange={handleInputChange(setMemberData)}
                required
              />

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label>Description</label>
                  <button
                    type="button"
                    onClick={handleGenerateMemberBio}
                    className={buttonSecondary}
                    disabled={isGeneratingBio}
                  >
                    {isGeneratingBio ? "..." : "✨ Generate Bio"}
                  </button>
                </div>
                <textarea
                  className={inputClass + " min-h-28"}
                  name="description"
                  value={memberData.description}
                  onChange={handleInputChange(setMemberData)}
                  required
                />
              </div>

              <input
                type="file"
                onChange={handleFileChange(setMemberImage)}
                className="text-sm"
              />

              <button className={buttonPrimary} disabled={isSubmittingMember}>
                {isSubmittingMember ? "Adding..." : "Add Member"}
              </button>
              <StatusMessage {...memberStatus} />
            </form>
          </div>
        )}

        {/* CONTACTS */}
        {activeTab === "contacts" && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Contact Messages
            </h2>

            {contactdata.length === 0 ? (
              <p className="text-center text-gray-600">No Messages Found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-left border">
                  <thead className="bg-gray-50 text-sm">
                    <tr>
                      <th className="p-3 border-b">Name</th>
                      <th className="p-3 border-b">Date</th>
                      <th className="p-3 border-b">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactdata.map((c) => (
                      <tr
                        key={c._id}
                        className={`border hover:bg-gray-50 cursor-pointer ${
                          c.respond ? " bg-green-100" : ""
                        }`}
                        onClick={() => {
                          setSelectedContact(c);
                          setOpenModal(true);
                        }}
                      >
                        <td className="p-3">{c.name}</td>
                        <td className="p-3">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              c.respond
                                ? "bg-green-200 text-green-700"
                                : "bg-red-200 text-red-700"
                            }`}
                          >
                            {c.respond ? "Responded" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <AdminModal isOpen={openModal} onClose={() => setOpenModal(false)}>
              {selectedContact && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-cyan-800 border-b pb-2">
                    Contact Details
                  </h2>

                  <p>
                    <b>Name:</b> {selectedContact.name}
                  </p>
                  <p>
                    <b>Email:</b> {selectedContact.email}
                  </p>
                  <p>
                    <b>Mobile:</b> {selectedContact.mobile}
                  </p>

                  <p className="p-3 bg-gray-100 rounded">
                    <b>Message:</b>
                    <br /> {selectedContact.message}
                  </p>

                  <textarea
                    className={inputClass + " min-h-24"}
                    placeholder="Type reply..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                  />

                  <button
                    className={buttonPrimary}
                    onClick={sendReplyEmail}
                    disabled={sendingEmail}
                  >
                    {sendingEmail ? "Sending..." : "Send Reply Email"}
                  </button>
                  <button
                    className={buttonSecondary + " w-full mt-2"}
                    onClick={() => setOpenModal(false)}
                  >
                    Close
                  </button>
                </div>
              )}
            </AdminModal>
          </div>
        )}
      </div>
    </div>
  );
}
