import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export default function ProgramPage() {
  const tabs = ["OVERVIEW", "ADMISSIONS", "ACADEMICS", "TUITION & FINANCING", "CAREER", "HOW TO APPLY"]

  const benefits = [
    "Comprehensive Foundation",
    "Flexible Learning",
    "One-on-One Tutor Support",
    "Globally Recognised Qualification",
    "Assessment-Based Structure",
    "Accelerated Completion",
    "Affordable and Accessible",
  ]

  const courses = [
    { id: 1, category: "Course Category", title: "Course Title" },
    { id: 2, category: "Course Category", title: "Course Title" },
    { id: 3, category: "Course Category", title: "Course Title" },
    { id: 4, category: "Course Category", title: "Course Title" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 pb-4 border-b-2 border-transparent hover:border-gray-300 transition-colors"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Text */}
            <div className="space-y-4">
              <p className="text-gray-700">
                Advance your career in the vital and rewarding field of{" "}
                <span className="font-bold">Health and Social Care</span> with our{" "}
                <span className="font-bold">Level 7 Diploma</span>, designed for professionals seeking to develop
                leadership, management, and policy expertise. Awarded by Qualifi, a UK-based awarding body and regulated
                by <span className="font-bold">Ofqual</span>, this internationally recognised qualification provides a
                strong academic and practical foundation for senior roles in health and social care sectors.
              </p>

              <p className="text-gray-700">
                This 100% online programme equips learners with advanced knowledge in health care management, strategic
                decision-making, and evidence-based practice—empowering you to make a real difference in the lives of
                individuals and communities.
              </p>
            </div>

            {/* Impact Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Make an Impact in Health and Social Care</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <span>Become a catalyst for change in communities and care systems.</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <span>
                    Apply today for the{" "}
                    <span className="font-bold text-purple-600">Level 7 Diploma in Health and Social Care</span> and
                    lead with compassion, strategy, and vision.
                  </span>
                </li>
              </ul>
            </div>

            {/* View Other Courses Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">View Other Courses</h2>
              <p className="text-gray-700">Explore our wide range of online programs and advance your career</p>

              {/* Course Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course) => (
                  <Card
                    key={course.id}
                    className="bg-gray-900 border-0 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6 space-y-4">
                      {/* Badge */}
                      <Badge className="bg-white text-purple-600 hover:bg-white/90 w-fit rounded-full">
                        {course.category}
                      </Badge>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-white">{course.title}</h3>

                      {/* Course Image */}
                      <div className="mt-4 rounded-lg overflow-hidden h-40">
                        <img
                          src="/two-people-working-on-laptop-brick-wall.jpg"
                          alt="Course preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Benefits Card */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-0 rounded-xl p-8 text-white sticky top-8">
              <div className="space-y-6">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Programme Highlight</p>
                  <h3 className="text-3xl font-bold">Key Benefits</h3>
                </div>

                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-purple-400 font-bold mt-1">•</span>
                      <span className="text-white font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
