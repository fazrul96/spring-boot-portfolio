import React from 'react';

const Experience = () => {
  return (
    <div>
      <hr className="mb-3" />
      <section id="experience">
        <h1 className="text-center" style={{ fontWeight: 'bold', fontSize: 100 }}>Experience</h1>
        <div className="row">
          <div className="col-md-12">
            <h3 style={{ textAlign: 'justify' }}>Accenture Solutions Sdn. Bhd. - Business & Integration Arch Analyst (Dec 2022 - Present)</h3>
            <ul>
              <li style={{ textAlign: 'left' }}>
                Telco Plan Development
                <ul>
                  <li>Involved in the development and implementation of telco plans, including 5G offerings. Experienced in designing and building web portals or platforms for customers to purchase plans, manage their accounts, and access various services.</li>
                </ul>
              </li>
              <li style={{ textAlign: 'left' }}>
                Customer Portal Development
                <ul>
                  <li>Proficient in creating intuitive and user-friendly customer portals for seamless plan selection, device management, and plan customization. Skilled in front-end development using modern frameworks and integrating with back-end systems.</li>
                </ul>
              </li>
              <li style={{ textAlign: 'left' }}>
                Plan Purchasing and Modification
                <ul>
                  <li>Knowledgeable in implementing features that allow customers to select and purchase telco plans through an online portal. Experienced in integrating secure payment gateways and providing options for plan modifications, such as upgrading, downgrading, or changing plan features.</li>
                </ul>
              </li>
              <li style={{ textAlign: 'left' }}>
                Account Management and Billing
              </li>
            </ul>
          </div>
          <div className="col-md-12">
            <h3 style={{ textAlign: 'justify' }}>The Lorry Online Sdn. Bhd. - Back End Developer (Nov 2020 - Nov 2022)</h3>
            <ul>
              <li style={{ textAlign: 'left' }}>
                Developed and maintained new features for multiple products across various platforms using PHP, ensuring their seamless integration and functionality.
                <ul>
                  <li>Reviewed and refactored code to support multi-country operations, resulting in improved performance and product quality. Implemented best practices and industry standards to enhance code stability, scalability, and maintainability.</li>
                </ul>
              </li>
              <li style={{ textAlign: 'left' }}>
                Implemented AWS services such as Lambda, SQS, CloudWatch, S3, and CodePipeline, leveraging their capabilities to enhance system performance, scalability, and reliability.
              </li>
              <li style={{ textAlign: 'left' }}>
                Integration of payment gateways such as TnG and Razerpay, facilitating seamless and secure transactions for users.
              </li>
              <li style={{ textAlign: 'left' }}>
                Implemented automated testing frameworks like PHPUnit and Cypress for backend code, ensuring high-quality standards and minimizing the occurrence of bugs and issues before deploying changes to production.
              </li>
              <li style={{ textAlign: 'left' }}>
                Proactively resolved bugs and issues, documenting processes using tools such as Postman and Swagger. Enhance query optimization to improve overall performance, reliability, and efficiency of the software applications.
              </li>
            </ul>
          </div>
          <div className="col-md-12">
            <h3 style={{ textAlign: 'justify' }}>BizAid Technologies Sdn. Bhd. - Software Programmer (Apr 2019 - Oct 2020)</h3>
            <ul>
              <li style={{ textAlign: 'left' }}>
                Managed and provided comprehensive support services, including bug fixes, software patches, enhancements, and customizations. Maintained up-to-date documentation and reports in accordance with SSM format, ensuring accurate and accessible information for effective service management.
              </li>
              <li style={{ textAlign: 'left' }}>
                Led a team of 3 interns and 1 developer in the development of two extension features and the maintenance of the OCR & NLP financial statement module. Collaborated closely with clients, enabling them to access their dedicated portals and utilize resources efficiently.
              </li>
              <li style={{ textAlign: 'left' }}>
                Oversaw and maintained Selenium testing, implementing automation to improve processing time and minimize human error. Played a key role in integration testing, ensuring the seamless integration of various system components.
              </li>
              <li style={{ textAlign: 'left' }}>
                Implemented REST API integrations, such as iMacros and Textract, resulting in increased monthly revenue and improved product quality. Leveraged these integrations to enhance system capabilities and provide valuable features to clients.
              </li>
              <li style={{ textAlign: 'left' }}>
                Assumed the role of an internal technician, managing IT-related issues within the organization. This involved tasks such as building, repairing, and formatting computers, installing tools and software for other departments, and managing the network infrastructure.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;