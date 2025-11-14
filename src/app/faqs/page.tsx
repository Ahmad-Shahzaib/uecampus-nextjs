import CircularImage from "@/component/about-us/Banner/CommonImage";
import Faqs from "@/component/faqs/Faqs";
import FrequentlyAskedQuestionHeader from "@/component/faqs/faqsQuestionHeader";
import JoinUs from "@/component/joinus";

const Page = () => {
  const faqData = {
    title: "Frequently Asked Questions",
    description: [
      "At UeCampus, our mission is to expand access to higher education by providing flexible, affordable, and high-quality online learning opportunities for students worldwide. We are dedicated to breaking down barriers and empowering individuals from all backgrounds to unlock their full potential through knowledge, skills, and opportunity-driven education.",
      "At UeCampus, our mission is to expand access to higher education by providing flexible, affordable, and high-quality online learning opportunities for students worldwide. We are dedicated to breaking down barriers and empowering individuals from all backgrounds to unlock their full potential through knowledge, skills, and opportunity-driven education.",
    ],
  };

  return (
    <>
      <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 mt-3">
        <div className="w-full md:w-1/2 lg:w-5/12">
          <CircularImage
            imageUrl="https://newwebsite.uecampus.com/wp-content/uploads/2025/08/featured-course-thumbnail.jpg"
            imageStyles="w-full h-auto flex items-center justify-center"
            imageContainer=""
          />
        </div>

        <div className="w-full md:w-1/3 lg:w-6/12">
          <FrequentlyAskedQuestionHeader
            title={faqData.title}
            description={faqData.description}
          />
        </div>
      </div>

      <div>
        <Faqs />
      </div>
      <div>
        <JoinUs />
      </div>
    </>
  );
};

export default Page;
