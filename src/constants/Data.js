export const tempData = {
    categories: [
        {
            id: "cspm-dashboard",
            name: "CSPM Executive Dashboard",
            widgetName: "CSPM",
            widgets: [
                {
                    id: "cloud-accounts",
                    name: "Cloud Accounts",
                    content: "Connected (2) ,Not Connected (2)",
                    categoryName: "CSPM",
                    values: [2, 2],
                    chartType:"Doughnut",
                },
                {
                    id: "cloud-account-risk",
                    name: "Cloud Account Risk Assessment",
                    content:
                    "Failed(1689),Warning(681),Not available(36),Passed(7253)",
                    categoryName: "CSPM",
                    values: [1689, 681, 36, 7253],
                    chartType:"Doughnut",
                },
            ],
        },
        {
            id: "cwpp-dashboard",
            name: "CWPP Dashboard",
            widgetName: "CWPP",
            widgets: [
                {
                    id: "namespace-alerts",
                    name: "Top 5 Namespace Specific Alerts",
                    content: "No Graph data available!",
                    categoryName: "CWPP",
                    values: [],
                    chartType:"Doughnut",
                },
                {
                    id: "workload-alerts",
                    name: "Workload Alerts",
                    content: "freshers,jobs",
                    categoryName: "CWPP",
                    values: [10, 1],
                    chartType:"Doughnut",
                },
            ],
        },
        {
            id: "registry-scan",
            name: "Registry Scan",
            widgetName: "Image",
            widgets: [
                {
                    id: "image-risk-assessment",
                    name: "Image Risk Assessment",
                    content:
                    "1470 Total Vulnerabilities, Critical (9),High (150)",
                    categoryName: "Image",
                    values: [1470, 9, 150],
                    chartType: "Stack",
                    about:"Total Vulnerabilities",
                },
                {
                    id: "image-security-issues",
                    name: "Image Security Issues",
                    content: "2 Total Images,Critical (2),High (2)",
                    categoryName: "Image",
                    about:"Total images",
                    chartType: "Stack",
                    values: [2, 2, 2],
                },
            ],
        },
    ],
};
