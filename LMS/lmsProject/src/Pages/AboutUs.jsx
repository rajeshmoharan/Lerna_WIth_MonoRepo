import HomeLayout from "../Layouts/HomeLayout";
import aboutUsImage from "../assets/about.png";
import abdulKamal from "../assets/abdulKalam.jpg";
import CarouselSlide from "./CarouselSlide";
import BibekaNanda from "../assets/bidekaNanda.jpg";
import RatanSir from '../assets/ratanTata.jpeg';

function AboutUs() {
  const celebrites = [
    {
      image: abdulKamal,
      title: "Hard Work is the Key of Success",
      description:
        "Abdul Kamal",
      slideNumber: 1,
    },
    {
      image: BibekaNanda,
      title: "Commitment to Excellence",
      description: "Bibekananda is a visionary Person",
      slideNumber: 2,
    },
    {
      image: RatanSir,
      title: "Commitment to Excellence",
      description: "Ratan Sir is a visionary Person",
      slideNumber: 3,
    },
  ];

  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white w-full h-full">
        <div className="flex items-center gap-5 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className="text-4xl text-yellow-400">
              Affordable and quality education
            </h1>
            <p>
              Our goal is to provide the affordable and quality education to the
              world. We are providint he platform for the aspiring teachers and
              students to share their skils, creativity and knowledge to each
              other to empower the student
            </p>
          </section>
          <div>
            <img src={aboutUsImage} className="drop-shadow-2xl rounded-lg" />
          </div>
        </div>
      </div>

      {/** Caroousel */}
      <div className="carousel w-1/2 ml-[35%] my-16 relative">
        {celebrites &&
          celebrites?.map((celebrity, i) => (
            <CarouselSlide
              key={i}
              image={celebrity.image}
              description={celebrity.description}
              title={celebrity.title}
              slideNumber={celebrity.slideNumber}
              totalSlides={celebrites.length}
            />
          ))}
      </div>
    </HomeLayout>
  );
}
export default AboutUs;
