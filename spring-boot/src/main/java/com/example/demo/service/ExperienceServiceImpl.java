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
        return createListOfExperiences();
    }

    private List<Experience> createListOfExperiences() {
        List<Experience> experiences = new ArrayList<>();

        experiences.add(new Experience(1, "Accenture Solutions Sdn. Bhd.", "Business & Integration Arch Analyst", "Dec 2022 - Present", createItemsForAccenture()));
        experiences.add(new Experience(2, "The Lorry Online Sdn. Bhd.", "Back End Developer", "Nov 2020 - Nov 2022", createItemsForTheLorry()));
        experiences.add(new Experience(3, "BizAid Technologies Sdn. Bhd.", "Software Programmer", "Apr 2019 - Oct 2020", createItemsForBizAid()));

        return experiences;
    }

    private List<ExperienceItem> createItemsForAccenture() {
        List<ExperienceItem> items = new ArrayList<>();
        
        items.add(new ExperienceItem("Telco Plan Development", "Involved in the development and implementation of telco plans..."));
        items.add(new ExperienceItem("Customer Portal Development", "Proficient in creating intuitive and user-friendly customer portals..."));
        items.add(new ExperienceItem("Plan Purchasing and Modification", "Knowledgeable in implementing features that allow customers to select..."));
        items.add(new ExperienceItem("Account Management and Billing", ""));
        
        return items;
    }
    
    private List<ExperienceItem> createItemsForTheLorry() {
        List<ExperienceItem> items = new ArrayList<>();
        
        items.add(new ExperienceItem("Developed and maintained new features for multiple products across various platforms using PHP, ensuring their seamless integration and functionality.", "Reviewed and refactored code to support multi-country operations, resulting in improved performance and product quality. Implemented best practices and industry standards to enhance code stability, scalability, and maintainability."));
        items.add(new ExperienceItem("Implemented AWS services such as Lambda, SQS, CloudWatch, S3, and CodePipeline, leveraging their capabilities to enhance system performance, scalability, and reliability.", ""));
        items.add(new ExperienceItem("Integration of payment gateways such as TnG and Razerpay, facilitating seamless and secure transactions for users.", ""));
        items.add(new ExperienceItem("Implemented automated testing frameworks like PHPUnit and Cypress for backend code, ensuring high-quality standards and minimizing the occurrence of bugs and issues before deploying changes to production.", ""));
        items.add(new ExperienceItem("Proactively resolved bugs and issues, documenting processes using tools such as Postman and Swagger. Enhance query optimization to improve overall performance, reliability, and efficiency of the software applications.", ""));
        
        return items;
    }
    
    private List<ExperienceItem> createItemsForBizAid() {
        List<ExperienceItem> items = new ArrayList<>();
        
        items.add(new ExperienceItem("Managed and provided comprehensive support services, including bug fixes, software patches, enhancements, and customizations. Maintained up-to-date documentation and reports in accordance with SSM format, ensuring accurate and accessible information for effective service management.", ""));
        items.add(new ExperienceItem("Led a team of 3 interns and 1 developer in the development of two extension features and the maintenance of the OCR & NLP financial statement module. Collaborated closely with clients, enabling them to access their dedicated portals and utilize resources efficiently.", ""));
        items.add(new ExperienceItem("Oversaw and maintained Selenium testing, implementing automation to improve processing time and minimize human error. Played a key role in integration testing, ensuring the seamless integration of various system components.", ""));
        items.add(new ExperienceItem("Implemented REST API integrations, such as iMacros and Textract, resulting in increased monthly revenue and improved product quality. Leveraged these integrations to enhance system capabilities and provide valuable features to clients.", ""));
        items.add(new ExperienceItem("Assumed the role of an internal technician, managing IT-related issues within the organization. This involved tasks such as building, repairing, and formatting computers, installing tools and software for other departments, and managing the network infrastructure.", ""));
        
        return items;
    }    
}
