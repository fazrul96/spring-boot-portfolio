const mosqueImage = "/management/mosque.jpg";
const donationImage = "/management/donation.jpg";
const inventoryImage = "/management/inventory.jpg";

export const sectionsData = (t, navigate) => [
    {
        image: donationImage,
        title: t('sections.donations.title'),
        description: t('sections.donations.description'),
        buttonText: t('sections.donations.button'),
        onClick: () => navigate('/mosque/users'),
        type: 'card'
    },
    {
        image: inventoryImage,
        title: t('sections.logistics.title'),
        description: t('sections.logistics.description'),
        buttonText: t('sections.logistics.button'),
        onClick: () => navigate('/mosque/logistic'),
        type: 'card'
    },
    {
        image: mosqueImage,
        title: t('sections.prayerTimes.title'),
        description: t('sections.prayerTimes.description'),
        buttonText: t('sections.prayerTimes.button'),
        onClick: () => navigate('/mosque/prayerTimes'),
        type: 'card'
    },
    {
        title: t('sections.sponsors.title'),
        description: t('sections.sponsors.description'),
        buttonText: t('sections.sponsors.button'),
        onClick: () => alert(t('sections.sponsors.comingSoon')),
        type: 'paper'
    },
    {
        title: t('sections.events.title'),
        description: t('sections.events.description'),
        buttonText: t('sections.events.button'),
        onClick: () => alert(t('sections.events.comingSoon')),
        type: 'paper'
    },
    {
        title: t('sections.announcements.title'),
        description: t('sections.announcements.description'),
        buttonText: t('sections.announcements.button'),
        onClick: () => alert(t('sections.announcements.comingSoon')),
        type: 'paper'
    }
];