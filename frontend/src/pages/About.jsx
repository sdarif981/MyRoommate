const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About MyRoommate</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We’re dedicated to transforming hostel life by helping students find
            like-minded roommates who match their lifestyle and preferences.
          </p>
        </section>

        {/* Mission Section */}
        <section className="bg-white shadow-sm rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Our Mission</h2>
          <p className="text-gray-700 text-center max-w-2xl mx-auto">
            MyRoommate connects hostel students based on key lifestyle preferences like study habits,
            cleanliness, noise tolerance, and more—making it easier to find a compatible
            roommate and create a peaceful, comfortable living environment.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[
            {
              title: "Smart Matching",
              desc: "Advanced filters to pair you with roommates who share your habits and preferences.",
            },
            {
              title: "Easy Communication",
              desc: "Built-in messaging lets you connect with potential roommates seamlessly.",
            },
            {
              title: "Secure Profiles",
              desc: "Verified student profiles to ensure trust, safety, and authenticity.",
            },
            {
              title: "User-Friendly Design",
              desc: "An intuitive interface designed with students’ real needs in mind.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ready to Find Your Perfect Roommate?
          </h2>
          <a
            href="/find-roommate"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Get Started
          </a>
        </section>
      </main>
    </div>
  );
};

export default About;
