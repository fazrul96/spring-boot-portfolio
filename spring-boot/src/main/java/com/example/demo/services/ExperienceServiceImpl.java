package com.example.demo.services;

import com.example.demo.models.Experience;
import com.example.demo.models.ExperienceItem;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExperienceServiceImpl implements ExperienceService {

    @Override
    public List<Experience> getExperiences() {
        List<Experience> experiences = new ArrayList<>();

        experiences.add(createAccentureExperience());
        experiences.add(createTheLorryExperience());
        experiences.add(createBizAidExperience());

        return experiences;
    }

    private static String arrayToString(String[] array) {
        return String.join(", ", array);
    }

    private Experience createAccentureExperience() {
        String[] acnTags = {"Web Development", "Laravel", "Java", "PHP", "JavaScript", "Cypress", "MySQL", "Unit Testing", "Data Manipulation"};
        String acnTagsString = arrayToString(acnTags);

        return new Experience(
            1,
            "Accenture Solutions Sdn. Bhd.",
            "Business & Integration Arch Analyst", acnTagsString,
            "Dec 2022 - Present",
            "1 yrs 4 mo",
            "https://cdnv2.dropr.io/image/7m-VCLUpSjG3z_tAei75rg/Iagvf8Qx/1200x630/sf/f78e1fde-bff5-4287-9476-9db5f6b6a1ef.jpg?cache_buster=39dfa55283318d31afe5a3ff4a0e3253e2045e43",
            createItemsForAccenture()
        );
    }

    private Experience createTheLorryExperience() {
        String[] lorryTags = {"Web Development", "Laravel", "AWS", "PHP", "JavaScript", "Cypress", "Microsoft SQL Server", "MySQL"};
        String lorryTagsString = arrayToString(lorryTags);

        return new Experience(
            2,
            "The Lorry Online Sdn. Bhd.",
            "Back End Developer", lorryTagsString,
            "Nov 2020 - Nov 2022",
            "2 yrs 1 mo",
            "https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-banner-pic/54769d664d4b90f2c2320644b49c20ff.jpeg",
            createItemsForTheLorry()
        );
    }

    private Experience createBizAidExperience() {
        String[] bizTags = {"Web Development", "Laravel", "AWS", "PHP", "VB6", "JavaScript", "Selenium WebDriver", "Microsoft SQL Server", "MySQL"};
        String bizTagsString = arrayToString(bizTags);

        return new Experience(
            3,
            "BizAid Technologies Sdn. Bhd.",
            "Software Programmer", bizTagsString,
            "Apr 2019 - Oct 2020",
            "1 yr 7 mos",
            "https://siva.jsstatic.com/my/5530/images/banner/5530_banner_0_770933.jpg",
            createItemsForBizAid()
        );
    }
    
    private List<ExperienceItem> createItemsForAccenture() {
        List<ExperienceItem> items = new ArrayList<>();

        items.add(new ExperienceItem("Application Developer", null));
        items.add(new ExperienceItem(null, "Developed AnIML converter plugins in Java, aligning closely with requirements provided by Data Acquisition Platform (DAP) business analysts to ensure seamless data processing and transformation"));
        items.add(new ExperienceItem(null,"Achieved a significant milestone by writing comprehensive unit tests, achieving 100% code coverage, and thereby ensuring the reliability and robustness of the developed converter plugins."));
        items.add(new ExperienceItem(null,"Writing BRD and FDS documentation to provide a detailed blueprint of the converter's functionality, demonstrating alignment with requirements and serving as a valuable reference for future development and maintenance."));

        items.add(new ExperienceItem("PHP Developer", null));
        items.add(new ExperienceItem(null, "Designed and built user-friendly web portals and platforms that empowered customers to effortlessly purchase telco plans, manage their accounts, and access a wide range of services"));
        items.add(new ExperienceItem(null, "Implemented robust features that streamlined the plan purchasing and modification process, allowing customers to conveniently select and customize telco plans through our online portal"));
        items.add(new ExperienceItem(null, "Collaborated closely with cross-functional teams to ensure seamless plan selection, device management, and plan customization, resulting in an enhanced user experience"));
        items.add(new ExperienceItem(null, "Designed and developed RESTful API endpoints for efficient data retrieval, validation, and manipulation. Collaborated closely with Android and iOS developers, ensuring smooth integration and optimal user experience."));
        items.add(new ExperienceItem(null, "Implemented automated testing frameworks like Cypress to improve overall regression development and ensuring high-quality standards and minimizing the occurrence of bugs and issues before deploying changes to production."));
        items.add(new ExperienceItem(null, "Proactively resolved bugs and issues, documenting processes using tools such as Postman. Enhance and leverage the tools script to improve overall performance, reliability, and efficiency during debugging."));
        
        return items;
    }
    
    private List<ExperienceItem> createItemsForTheLorry() {
        List<ExperienceItem> items = new ArrayList<>();

        items.add(new ExperienceItem("PHP Developer", null));
        items.add(new ExperienceItem(null,"Developed and maintained new features for multiple products across various platforms using PHP, ensuring their seamless integration and functionality."));
        items.add(new ExperienceItem(null,"Reviewed and refactored code to support multi-country operations, resulting in improved performance and product quality. Implemented best practices and industry standards to enhance code stability, scalability, and maintainability."));
        items.add(new ExperienceItem(null,"Implemented AWS services such as Lambda, SQS, CloudWatch, S3, and CodePipeline, leveraging their capabilities to enhance system performance, scalability, and reliability."));
        items.add(new ExperienceItem(null,"Designed and developed RESTful API endpoints for efficient data retrieval, validation, and manipulation. Collaborated closely with Android and iOS front-end developers, ensuring smooth integration and optimal user experience."));
        items.add(new ExperienceItem(null,"Integration of payment gateways such as TnG and Razerpay, facilitating seamless and secure transactions for users."));
        items.add(new ExperienceItem(null,"Implemented automated testing frameworks like PHPUnit and Cypress for backend code, ensuring high-quality standards and minimizing the occurrence of bugs and issues before deploying changes to production."));
        items.add(new ExperienceItem(null,"Proactively resolved bugs and issues, documenting processes using tools such as Postman and Swagger. Enhance query optimization to improve overall performance, reliability, and efficiency of the software applications."));
        
        return items;
    }
    
    private List<ExperienceItem> createItemsForBizAid() {
        List<ExperienceItem> items = new ArrayList<>();

        items.add(new ExperienceItem("Software Developer",null));
        items.add(new ExperienceItem(null,"Managed and provided comprehensive support services, including bug fixes, software patches, enhancements, and customizations. Maintained up-to-date documentation and reports in accordance with SSM format, ensuring accurate and accessible information for effective service management."));
        items.add(new ExperienceItem(null,"Led a team of 3 interns and 1 developer in the development of two extension features and the maintenance of the OCR & NLP financial statement module. Collaborated closely with clients, enabling them to access their dedicated portals and utilize resources efficiently."));
        items.add(new ExperienceItem(null,"Oversaw and maintained Selenium testing, implementing automation to improve processing time and minimize human error. Played a key role in integration testing, ensuring the seamless integration of various system components."));
        items.add(new ExperienceItem(null,"Implemented REST API integrations, such as iMacros and Textract, resulting in increased monthly revenue and improved product quality. Leveraged these integrations to enhance system capabilities and provide valuable features to clients."));
        items.add(new ExperienceItem(null,"Assumed the role of an internal technician, managing IT-related issues within the organization. This involved tasks such as building, repairing, and formatting computers, installing tools and software for other departments, and managing the network infrastructure."));
        
        return items;
    }    
}