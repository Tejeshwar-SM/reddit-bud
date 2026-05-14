export const siteConfig: SiteConfig = {
    name: "Reddit Automation",
    description: "Automate your Reddit tasks with ease.",
    longDescription:
        "Reddit Automation is a powerful tool designed to help you automate various tasks on Reddit, such as posting, commenting, and managing your account. With an intuitive interface and robust features, you can save time and enhance your Reddit experience.",
    category: "Productivity",
    og: {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
    },
    developer: {
        name: "Koonei",
        url: "https://koonei.com",
    },
    keywords: ["Reddit", "Automation", "Productivity", "Social Media", "Tools"],
    links: {},
    contact: "contact@reddit-automation.com",
    sidebar: [
        {
            title: "Getting Started",
            url: "#",
            icon: "House",
            items: [
                {
                    title: "Installation",
                    url: "/getting-started/installation",
                },
                {
                    title: "Quick Start Guide",
                    url: "/getting-started/quick-start",
                },
            ],
        },
        {
            title: "Features",
            url: "#",
            icon: "House",
            items: [
                {
                    title: "Post Scheduler",
                    url: "/features/post-scheduler",
                },
                {
                    title: "Comment Manager",
                    url: "/features/comment-manager",
                },
            ],
        },
    ],
};
