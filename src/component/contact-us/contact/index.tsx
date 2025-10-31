"use client"

export default function ContactPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl gap-6">
          {/* Left Column - Image */}
          <div className="flex-1 relative min-h-96 lg:min-h-auto rounded-lg">
            <img
              src="https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/thumbnail-7.jpg"
              alt="Professional woman with books"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Right Column - Contact Information */}
          <div className="flex-1 bg-[#6A1B9A] p-6 lg:p-8 rounded-2xl text-white flex flex-col justify-center">
            {/* Header */}
            <h1 className="text-3xl lg:text-4xl font-medium mb-6 text-white">
              Contact Us
            </h1>

            {/* Introduction Text */}
            <p className="text-base lg:text-lg font-normal mb-6 leading-relaxed opacity-95">
              We'd love to hear from you! Whether you have questions about our
              courses, partnerships, or need support during your studies, our
              dedicated team is here to help.
            </p>

            {/* Phone Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-white">Phone</h3>
              <div className="text-base space-y-1 opacity-90">
                <p>General Inquiries: +1 (555) 123-4567</p>
                <p>+1 (555) 987-6543</p>
                <p>+44 (20) 7946 0958</p>
                <p>+971 4 505 4241</p>
              </div>
            </div>

            {/* Email Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-white">Email</h3>
              <div className="text-base space-y-1">
                <p>
                  General Inquiries:{" "}
                  <a
                    href="mailto:info@company.com"
                    className="underline hover:opacity-80"
                  >
                    info@company.com
                  </a>
                </p>
                <p>
                  Support:{" "}
                  <a
                    href="mailto:support@company.com"
                    className="underline hover:opacity-80"
                  >
                    support@company.com
                  </a>
                </p>
                <p>
                  Admissions:{" "}
                  <a
                    href="mailto:admissions@company.com"
                    className="underline hover:opacity-80"
                  >
                    admissions@company.com
                  </a>
                </p>
              </div>
            </div>

            {/* Live Chat Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-white">
                Live Chat
              </h3>
              <p className="text-base opacity-90">
                Available on our website from 9:00 AM - 5:00 PM (EST). Try our
                live assistance.
              </p>
            </div>

            {/* Social Media Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-white">
                Social Media
              </h3>
              <div className="text-base space-y-1">
                <p>
                  Connect with us on:{" "}
                  <a
                    href="https://instagram.com"
                    className="underline hover:opacity-80"
                  >
                    Instagram
                  </a>
                </p>
                <p>
                  Follow us:{" "}
                  <a
                    href="https://facebook.com"
                    className="underline hover:opacity-80"
                  >
                    Facebook
                  </a>
                </p>
              </div>
            </div>

            {/* Mailing Address Section */}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Mailing Address
              </h3>
              <div className="text-base space-y-1 opacity-90">
                <p>123 Education Street</p>
                <p>New York, NY 10001</p>
                <p>London, UK, EC3A 8AS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
