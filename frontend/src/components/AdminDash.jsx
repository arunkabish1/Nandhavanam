import React, { useState } from "react";

// A reusable component for displaying submission status messages
const StatusMessage = ({ message, type }) => {
  if (!message) return null;

  const baseClasses = "p-3 rounded-lg text-center font-semibold my-4";
  const typeClasses = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };

  return <div className={`${baseClasses} ${typeClasses[type]}`}>{message}</div>;
};


export default function AdminDash() {
  // State for the "Add Member" form
  const [memberData, setMemberData] = useState({ name: '', position: '', email: '', description: '' });
  const [memberImage, setMemberImage] = useState(null);
  const [memberStatus, setMemberStatus] = useState({ message: '', type: '' });
  const [isSubmittingMember, setIsSubmittingMember] = useState(false);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);

  // State for the "Add Event" form
  const [eventData, setEventData] = useState({ event: '', post: '', sms: false, mail: false, home: false });
  const [eventImage, setEventImage] = useState(null);
  const [eventStatus, setEventStatus] = useState({ message: '', type: '' });
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [isGeneratingPost, setIsGeneratingPost] = useState(false);

  // State for the "Add Role" form
  const [roleData, setRoleData] = useState({ name: '', email: '', mobile: '', role: '' });
  const [roleStatus, setRoleStatus] = useState({ message: '', type: '' });
  const [isSubmittingRole, setIsSubmittingRole] = useState(false);

  // --- Gemini API Integration ---

  const callGeminiAPI = async (prompt) => {
    // In a real application, you'd use a secure way to handle API keys.
    // This empty key is a placeholder for the Canvas environment.
    const apiKey = 'AIzaSyBy7Dvw0sxN2zK-h-nBVeAX7PD5YwcnkVQ' || 'ak';
     
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    // Implements exponential backoff for retries
    let response;
    let delay = 1000;
    for (let i = 0; i < 5; i++) {
        try {
            response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const result = await response.json();
                const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                    return text;
                } else {
                    throw new Error("Failed to extract generated text from the API response.");
                }
            } else if (response.status === 429 || response.status >= 500) {
                // Throttled or server error, wait and retry
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2;
                continue;
            } else {
                 const errorData = await response.json();
                 throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
            }
        } catch (error) {
           if (i === 4) { // Last attempt
              console.error("Gemini API call failed after multiple retries:", error);
              throw error;
           }
        }
    }
     throw new Error("The request to the Gemini API failed after multiple retries.");
  };
  
  const handleGenerateEventPost = async () => {
    if (!eventData.event) {
      setEventStatus({ message: 'Please enter an event name first to generate a post.', type: 'error' });
      return;
    }
    setIsGeneratingPost(true);
    setEventStatus({ message: 'Generating your event post with AI...', type: 'info' });
    const prompt = `Write a professional and engaging event announcement post for an event called "${eventData.event}". The tone should be exciting and welcoming. Include placeholders like [Date], [Time], [Location]. Keep it concise and informative. Only 1 response.`;
    try {
      const generatedPost = await callGeminiAPI(prompt);
      setEventData(prev => ({ ...prev, post: generatedPost }));
      setEventStatus({ message: 'AI-generated post is ready!', type: 'success' });
    } catch (error) {
      setEventStatus({ message: error.message, type: 'error' });
    } finally {
      setIsGeneratingPost(false);
    }
  };

  const handleGenerateMemberBio = async () => {
    if (!memberData.name || !memberData.position) {
      setMemberStatus({ message: 'Please enter a name and position first to generate a bio.', type: 'error' });
      return;
    }
    setIsGeneratingBio(true);
    setMemberStatus({ message: 'Generating member bio with AI...', type: 'info' });
    const prompt = `Write a short, professional, and friendly bio for a new team gallery member. Their name is ${memberData.name} and their position is ${memberData.position}. The bio should be approximately 2-4 sentences and highlight their role in a positive way.`;
    try {
      const generatedBio = await callGeminiAPI(prompt);
      setMemberData(prev => ({ ...prev, description: generatedBio }));
      setMemberStatus({ message: 'AI-generated bio is ready!', type: 'success' });
    } catch (error) {
      setMemberStatus({ message: error.message, type: 'error' });
    } finally {
      setIsGeneratingBio(false);
    }
  };


    // --- Original Form Handlers ---

  const handleInputChange = (setter) => (e) => {
    const { name, value, type, checked } = e.target;
    setter(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (setter) => (e) => {
    setter(e.target.files[0]);
  };

  const addMember = async (e) => {
    e.preventDefault();
    setIsSubmittingMember(true);
    setMemberStatus({ message: '', type: '' });

    const formData = new FormData();
    formData.append("mname", memberData.name);
    formData.append("position", memberData.position);
    formData.append("description", memberData.description);
    formData.append("email", memberData.email);
    if (memberImage) formData.append("image", memberImage);

    try {
      const res = await fetch("https://nandhavanam-backend.onrender.com/gallery", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setMemberStatus({ message: 'Gallery member added successfully!', type: 'success' });
        e.target.reset();
        setMemberData({ name: '', position: '', email: '', description: '' });
        setMemberImage(null);
      } else { throw new Error(data.err || "Failed to add member."); }
    } catch (err) {
      setMemberStatus({ message: err.message, type: 'error' });
    } finally {
      setIsSubmittingMember(false);
    }
  };

  const addEvent = async (e) => {
    e.preventDefault();
    setIsSubmittingEvent(true);
    setEventStatus({ message: '', type: '' });

    const formData = new FormData();
    Object.keys(eventData).forEach(key => formData.append(key, eventData[key]));
    if (eventImage) formData.append("image", eventImage);
    
    try {
      const res = await fetch("https://nandhavanam-backend.onrender.com/events", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setEventStatus({ message: 'Event added successfully!', type: 'success' });
        e.target.reset();
        setEventData({ event: '', post: '', sms: false, mail: false, home: false });
        setEventImage(null);
      } else { throw new Error(data.error || "Something went wrong."); }
    } catch (err) {
      setEventStatus({ message: err.message, type: 'error' });
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  const addRole = async (e) => {
    e.preventDefault();
    setIsSubmittingRole(true);
    setRoleStatus({ message: '', type: '' });

    const password = roleData.role === "admin" ? "Admin@123" : "User@123";
    const payload = { ...roleData, password };

    try {
      const res = await fetch("https://nandhavanam-backend.onrender.com/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        setRoleStatus({ message: `${roleData.name} created as ${roleData.role} successfully.`, type: 'success' });
        e.target.reset();
        setRoleData({ name: '', email: '', mobile: '', role: '' });
      } else {
        const data = await res.json();
        throw new Error(data.error || `${roleData.name} not created as ${roleData.role}.`);
      }
    } catch (err) {
      setRoleStatus({ message: err.message, type: 'error' });
    } finally {
      setIsSubmittingRole(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="text-3xl text-center font-bold mb-8 text-cyan-900">
            Admin Dashboard
          </h1>

          <div className="flex flex-col lg:flex-row justify-center mx-auto gap-8 w-full ">
            {/* User Management */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/3">
              <h2 className="text-xl font-semibold mb-2">User Management</h2>
              <p className="text-gray-500 mb-4">Manage users, roles, and permissions.</p>
              <form onSubmit={addRole} method="POST" className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="name" className="font-medium mb-1">Name</label>
                  <input className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600 outline-none" type="text" name="name" id="name" value={roleData.name} onChange={handleInputChange(setRoleData)} required />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email_role" className="font-medium mb-1">Email</label>
                  <input className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600 outline-none" type="email" name="email" id="email_role" value={roleData.email} onChange={handleInputChange(setRoleData)} required />
                </div>
                <div>
                  <label className="font-medium mb-1 block">Role</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2"><input type="radio" name="role" value="admin" onChange={handleInputChange(setRoleData)} required /> Admin</label>
                    <label className="flex items-center gap-2"><input type="radio" name="role" value="user" onChange={handleInputChange(setRoleData)} /> User</label>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="mobile" className="font-medium mb-1">Mobile Number</label>
                  <input className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600 outline-none" type="text" name="mobile" id="mobile" value={roleData.mobile} onChange={handleInputChange(setRoleData)} required />
                </div>
                <button className="w-full bg-cyan-900 text-white px-6 py-2 rounded-3xl hover:bg-cyan-700 transition disabled:bg-gray-400" type="submit" disabled={isSubmittingRole}>
                  {isSubmittingRole ? 'Adding User...' : 'Add User'}
                </button>
                <StatusMessage message={roleStatus.message} type={roleStatus.type} />
              </form>
            </div>

            {/* Events */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-2/3">
              <h2 className="text-xl font-semibold mb-2">Add New Events</h2>
              <p className="text-gray-500 mb-4">Manage Events and Notifications.</p>
              <form onSubmit={addEvent} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="event" className="font-medium mb-1">Name of the Event</label>
                  <input className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600 outline-none" type="text" name="event" id="event" value={eventData.event} onChange={handleInputChange(setEventData)} required />
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="post" className="font-medium">Event Post</label>
                    <button type="button" onClick={handleGenerateEventPost} disabled={isGeneratingPost || !eventData.event} className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center gap-1">
                      ✨ {isGeneratingPost ? 'Generating...' : 'Generate with AI'}
                    </button>
                  </div>
                  <textarea className="border min-h-40 border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600 outline-none" name="post" id="post" value={eventData.post} onChange={handleInputChange(setEventData)} required></textarea>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 w-full">
                  <h3 className="text-md font-semibold text-gray-800 mb-3">Notification Via:</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
                    <label className="flex items-center gap-2 cursor-pointer text-gray-700"><input type="checkbox" name="mail" id="mail" checked={eventData.mail} onChange={handleInputChange(setEventData)} className="w-5 h-5 accent-cyan-600 rounded" /> Mail to Users</label>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-700"><input type="checkbox" name="sms" id="sms" checked={eventData.sms} onChange={handleInputChange(setEventData)} className="w-5 h-5 accent-cyan-600 rounded" /> Whatsapp Message to Users</label>
                    <label className="flex items-center gap-2 cursor-pointer text-gray-700"><input type="checkbox" name="home" id="home" checked={eventData.home} onChange={handleInputChange(setEventData)} className="w-5 h-5 accent-cyan-600 rounded" /> Post in Homepage</label>
                  </div>
                </div>
                <div>
                  <label htmlFor="eventImage" className="font-medium mb-1">Poster Image</label>
                  <input className="w-full border border-gray-300 p-2 rounded file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100" type="file" name="eventImage" accept="image/png,image/jpeg,image/jpg" id="eventImage" onChange={handleFileChange(setEventImage)} required />
                </div>
                <button className="w-full bg-cyan-900 text-white px-6 py-2 rounded-3xl hover:bg-cyan-700 transition disabled:bg-gray-400" type="submit" disabled={isSubmittingEvent}>
                  {isSubmittingEvent ? 'Adding Event...' : 'Add Event'}
                </button>
                <StatusMessage message={eventStatus.message} type={eventStatus.type} />
              </form>
            </div>
          </div>

          {/* Gallery Members */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-center text-xl font-semibold mb-2">Gallery Members</h2>
            <p className="text-center text-gray-500 mb-6">Add or remove Gallery Members</p>
            <div>
              <form method="POST" onSubmit={addMember} className="space-y-4 max-w-2xl mx-auto">
                 <div className="flex flex-col">
                  <label htmlFor="membername" className="font-medium mb-1">Name</label>
                  <input type="text" name="name" id="membername" value={memberData.name} onChange={handleInputChange(setMemberData)} required className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600 outline-none" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email_member" className="font-medium mb-1">Email Id</label>
                  <input type="email" name="email" id="email_member" value={memberData.email} onChange={handleInputChange(setMemberData)} className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600 outline-none" required />
                </div>
                 <div className="flex flex-col">
                  <label htmlFor="position" className="font-medium mb-1">Position</label>
                  <input type="text" name="position" id="position" value={memberData.position} onChange={handleInputChange(setMemberData)} className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600 outline-none" required />
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="description" className="font-medium">Description</label>
                    <button type="button" onClick={handleGenerateMemberBio} disabled={isGeneratingBio || !memberData.name || !memberData.position} className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center gap-1">
                      ✨ {isGeneratingBio ? 'Generating...' : 'Generate Bio with AI'}
                    </button>
                  </div>
                  <textarea name="description" id="description" value={memberData.description} onChange={handleInputChange(setMemberData)} className="border min-h-32 border-gray-300 p-2 rounded focus:ring-2 focus:ring-cyan-600 outline-none" required></textarea>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="memberImage" className="font-medium mb-1">Image</label>
                  <input type="file" name="image" id="memberImage" accept="image/png,image/jpeg,image/jpg" onChange={handleFileChange(setMemberImage)} className="w-full border border-gray-300 p-2 rounded file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100" />
                </div>
                <button type="submit" className="w-full bg-cyan-900 text-white px-6 py-2 rounded-3xl hover:bg-cyan-700 transition disabled:bg-gray-400" disabled={isSubmittingMember}>
                  {isSubmittingMember ? 'Adding Member...' : 'Add Gallery Member'}
                </button>
                 <StatusMessage message={memberStatus.message} type={memberStatus.type} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

