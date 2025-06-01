import Header from "../components/Header";
import Footer from "../components/Footer";
import harshthummarImg from "../../assets/harshthummar.jpg";
import yashthummarImg from "../../assets/yashthummar.jpg";
import { Users, Target, Globe, Search, GraduationCap } from "lucide-react";

const AboutUs = () => {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-soky text-goray px-6 py-16 md:px-20">
        <section className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl font-extrabold mb-4 text-goray mt-20">
            About Us
          </h1>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto text-goray/80">
            Online College Finder is your one-stop solution to explore, compare,
            and choose the best colleges across India. We empower students with
            verified data, insights, and personalized recommendations to help
            them make confident career choices.
          </p>
        </section>

        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-goray text-soky rounded-xl p-6 text-center">
            <Target className="mx-auto mb-3 text-bolue" size={40} />
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-soky/90 text-sm">
              To guide students in finding the right colleges with accurate
              data, smart tools, and expert support.
            </p>
          </div>

          <div className="bg-goray text-soky rounded-xl p-6 text-center">
            <Globe className="mx-auto mb-3 text-bolue" size={40} />
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-soky/90 text-sm">
              To become India's most trusted college search platform, breaking
              barriers to quality education.
            </p>
          </div>

          <div className="bg-goray text-soky rounded-xl p-6 text-center">
            <Users className="mx-auto mb-3 text-bolue" size={40} />
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <p className="text-soky/90 text-sm">
              Transparency, Accessibility, and Innovation to ensure student
              success and satisfaction.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-20 text-center">
          <h2 className="text-3xl font-bold mb-8 text-goray">
            What Makes Us Unique?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-goray text-soky rounded-xl p-6">
              <Search className="text-bolue mb-3 mx-auto" size={32} />
              <h4 className="text-lg font-semibold mb-1">Smart Search</h4>
              <p className="text-soky/90 text-sm">
                Find colleges by location, stream, cutoff, facilities, and
                more—tailored to your needs.
              </p>
            </div>
            <div className="bg-goray text-soky rounded-xl p-6">
              <GraduationCap className="text-bolue mb-3 mx-auto" size={32} />
              <h4 className="text-lg font-semibold mb-1">Verified Info</h4>
              <p className="text-soky/90 text-sm">
                Our database is updated regularly from official sources,
                ensuring credibility and accuracy.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-goray">
            Meet the Founders
          </h2>

          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="bg-goray text-soky rounded-xl p-5 w-64">
              <img
                src={harshthummarImg}
                alt="Harsh Thummar"
                className="rounded-full w-24 h-24 mx-auto mb-3 object-cover"
              />
              <h3 className="text-lg font-semibold">Harsh Thummar</h3>
              <p className="text-sm text-soky/80">Co-Founder & CTO</p>
            </div>

            <div className="bg-goray text-soky rounded-xl p-5 w-64">
              <img
                src={yashthummarImg}
                alt="Yash Thummar"
                className="rounded-full w-24 h-24 mx-auto mb-3 object-cover"
              />
              <h3 className="text-lg font-semibold">Yash Thummar</h3>
              <p className="text-sm text-soky/80">Founder & CEO</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutUs;
