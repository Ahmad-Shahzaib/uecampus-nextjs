"use client";
import Seo from '@/component/common/Seo';
import StatsCards from '@/component/common/StatsCards';
import ContactPage from '@/component/contact-us/contact';
import ContactUsSection from '@/component/contact-us/contact/ContactUsSection';
import JoinUs from '@/component/joinus';

const page = () => {
    return (
        <>
                 <Seo pageKey="contact" />

            <ContactPage />
            <div>
                <JoinUs />
            </div>
            <div className='px-6'>
                <StatsCards />
            </div>
            <div className='px-6 my-8'>
                <ContactUsSection />
            </div>

        </>
    )
}

export default page