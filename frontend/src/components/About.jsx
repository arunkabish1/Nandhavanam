import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b mt-10 from-gray-50 to-white text-gray-800 px-6 py-12">
      {/* Introduction */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          About <span className="text-yellow-600">Kuwait Nandhavanam</span>
        </h1>
        <p className="text-lg leading-relaxed mb-4">
          The <strong>Kuwait Nandhavanam Tamil Family Association</strong> is a
          well-recognized organization in Kuwait. It was founded in{" "}
          <strong>2005</strong> by a group of like-minded individuals with the
          aim of creating a social and cultural environment for the Tamil
          community living in Kuwait.
        </p>
        <p className="text-lg leading-relaxed text-gray-600">
          As a socio-cultural organization, the association is officially
          registered with the <strong>Embassy of India, Kuwait</strong>.
        </p>
      </section>

      {/* Key Activities */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Key Activities
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Promotion of Tamil Language */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">
            <h3 className="text-xl font-semibold text-yellow-700 mb-3">
              1. Promotion of the Tamil Language
            </h3>
            <p className="text-gray-700 mb-2">
              The association strives to preserve and promote the Tamil
              language. It organizes events by inviting scholars, writers,
              thinkers, and speakers from Tamil Nadu to share their knowledge
              and ideas.
            </p>
            <p className="text-gray-700">
              Volunteers conduct Tamil classes for children, and the association
              maintains a library with classical and modern Tamil works to
              spread awareness of the language.
            </p>
          </div>

          {/* Social Initiatives */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">
            <h3 className="text-xl font-semibold text-green-700 mb-3">
              2. Social Initiatives
            </h3>
            <p className="text-gray-700">
              The association actively participates in social welfare
              activities. With contributions from members and Indian residents
              in Kuwait, it provides financial support to institutions in Tamil
              Nadu that serve the underprivileged, differently-abled, and
              economically weaker sections of society.
            </p>
          </div>

          {/* Cultural Events */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">
            <h3 className="text-xl font-semibold text-purple-700 mb-3">
              3. Cultural Events
            </h3>
            <p className="text-gray-700">
              The association regularly organizes cultural programs by inviting
              renowned artists and personalities from Tamil Nadu. These events
              provide a platform to celebrate Tamil culture and traditions while
              fostering unity and togetherness within the Tamil community in
              Kuwait.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Us</h2>
        <p className="text-gray-600 mb-6">
          Want to be part of our journey? Explore opportunities to connect with
          our cultural, social, and educational initiatives.
        </p>
        <a
          href="/admission"
          className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-yellow-600 transition"
        >
          Explore Admissions
        </a>
      </section>
    </div>
  );
}
