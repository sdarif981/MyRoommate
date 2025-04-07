// Adjust path as needed

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
     

      {/* Main Content */}
      <div className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About MyRoommate</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We’re dedicated to transforming the hostel experience by helping students find
            like-minded roommates who match their lifestyle and preferences.
          </p>
        </section>

        {/* Mission Section */}
        <section className=" rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Our Mission</h3>
          <p className="text-gray-700 text-center max-w-2xl mx-auto">
            Our platform connects hostel students based on key preferences like study habits,
            cleanliness, noise tolerance, and more—making it easier to find a compatible
            roommate and create a comfortable living environment.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="text-center">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Smart Matching</h4>
            <p className="text-gray-600">
              Advanced filters to pair you with roommates who share your habits and preferences.
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Easy Communication</h4>
            <p className="text-gray-600">
              Built-in messaging to connect with potential roommates seamlessly.
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Secure Profiles</h4>
            <p className="text-gray-600">
              Verified student profiles to ensure trust and safety.
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">User-Friendly Design</h4>
            <p className="text-gray-600">
              Intuitive interface designed with students in mind.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Ready to Find Your Perfect Roommate?
          </h3>
          <a
            href="/find-roommate"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Get Started
          </a>
        </section>
      </div>

     
    </div>
  );
};

export default About;