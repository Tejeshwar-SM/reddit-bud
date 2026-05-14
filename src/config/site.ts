export const siteConfig: SiteConfig = {
    name: "Reddit Bud",
    description: "Research Reddit faster.",
    longDescription:
        "Reddit Bud is a research tool for exploring posts, comments, and communities on Reddit.",
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
    keywords: ["Reddit", "Research", "Productivity", "Social Media", "Tools"],
    links: {},
    contact: "contact@reddit-bud.com",
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
