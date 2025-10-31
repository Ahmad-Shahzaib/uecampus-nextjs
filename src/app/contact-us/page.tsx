"use client";
import StatsCards from '@/component/common/StatsCards';
import ContactPage from '@/component/contact-us/contact';
import JoinUs from '@/component/joinus';

const page = () => {
    return (
        <>
            <ContactPage />
            <div>
                <JoinUs />
            </div>
            <div className='px-6'>
                <StatsCards />
            </div>

        </>
    )
}

export default page