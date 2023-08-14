import videoFile from '../assets/video/Project.mp4';

const BASE_URL = 'http://localhost:8080'; // Your backend URL

export async function fetchProjects() {
  // const response = await fetch(`${BASE_URL}/api/projects`);
  // if (!response.ok) {
  //   throw new Error('Failed to fetch projects');
  // }

  const response = [
    {
      id : 1,
      title : 'Web Development',
      description : 'Laravel Project',
      status : 'Still in development',
      reference : './pages/web-development-page.html',
      img : 'https://th.bing.com/th/id/R.3548e421c01b0f748bff76499bc26601?rik=2VM1RoPhaP%2f52w&riu=http%3a%2f%2fdarrenstephenson.ie%2fwp-content%2fuploads%2f2015%2f03%2flaravel-logo.png&ehk=jLAh49QKn3bN%2fSAYBiw%2foznFMvmLKdLV8DTiwMJc3vg%3d&risl=&pid=ImgRaw&r=0',
      footer : '#intelligentfood'
    },
    {
      id : 2,
      title : 'University Eclipse Collection',
      description : 'Java Project',
      status : 'Still in development',
      reference : './pages/eclipse-page.html',
      img : 'https://getwallpapers.com/wallpaper/full/b/2/0/491662.jpg',
      footer : '#intelligentfood'
    },
    {
      id : 3,
      title : '3D Game',
      description : 'Unity Project',
      status : 'Still in development',
      reference : './pages/unity-page.html',
      img : 'https://images.squarespace-cdn.com/content/v1/5f031aa98cea4c639ef3f14f/1628960759502-QD0B2LMTGQHDAAC3DY42/Unity.jpeg',
      footer : '#intelligentfood'
    },
    {
      id : 4,
      title : 'Python Assessment',
      description : 'Python Project',
      status : 'Still in development',
      reference : './pages/python-page.html',
      img : 'https://miro.medium.com/max/3960/1*taf9WHc3BPmhbxyKEu2jIg.png',
      footer : '#intelligentfood'
    },
    {
      id : 5,
      title : 'Automated Testing',
      description : 'Automation',
      status : 'Still in development',
      reference : './pages/automation-page.html',
      img : 'https://blog.aspiresys.com/wp-content/uploads/2017/12/shutterstock_727680178.jpg',
      footer : '#intelligentfood'
    }
  ];

  return response;
  // return response.json();
}

export function fetchVideoProjects() {
  const response = [
    {
      id : 1,
      path : videoFile,
      description : 'Project',
    }
  ];

  return response;
}

export function fetchExperiences() {
  const response = [
    {
      id: 1,
      companyName: 'Accenture Solutions Sdn. Bhd.',
      role: 'Business & Integration Arch Analyst',
      year: 'Dec 2022 - Present',
      items: [
        {
          title: 'Telco Plan Development',
          description:
            'Involved in the development and implementation of telco plans, including 5G offerings. Experienced in designing and building web portals or platforms for customers to purchase plans, manage their accounts, and access various services.'
        },
        {
          title: 'Customer Portal Development',
          description:
            'Proficient in creating intuitive and user-friendly customer portals for seamless plan selection, device management, and plan customization. Skilled in front-end development using modern frameworks and integrating with back-end systems.'
        },
        {
          title: 'Plan Purchasing and Modification',
          description:
            'Knowledgeable in implementing features that allow customers to select and purchase telco plans through an online portal. Experienced in integrating secure payment gateways and providing options for plan modifications, such as upgrading, downgrading, or changing plan features'
        },
        {
          title: 'Account Management and Billing',
          description: ''
        }
      ]
    },
    {
      id: 2,
      companyName: 'The Lorry Online Sdn. Bhd.',
      role: 'Back End Developer',
      year: 'Nov 2020 - Nov 2022',
      items: [
        {
          title: 'Developed and maintained new features for multiple products across various platforms using PHP, ensuring their seamless integration and functionality.',
          description:
            'Reviewed and refactored code to support multi-country operations, resulting in improved performance and product quality. Implemented best practices and industry standards to enhance code stability, scalability, and maintainability.'
        },
        {
          title: 'Implemented AWS services such as Lambda, SQS, CloudWatch, S3, and CodePipeline, leveraging their capabilities to enhance system performance, scalability, and reliability.',
          description:
            ''
        },
        {
          title: 'Integration of payment gateways such as TnG and Razerpay, facilitating seamless and secure transactions for users.',
          description:
            ''
        },
        {
          title: 'Implemented automated testing frameworks like PHPUnit and Cypress for backend code, ensuring high-quality standards and minimizing the occurrence of bugs and issues before deploying changes to production.',
          description: ''
        },
        {
          title: 'Proactively resolved bugs and issues, documenting processes using tools such as Postman and Swagger. Enhance query optimization to improve overall performance, reliability, and efficiency of the software applications.',
          description: ''
        }
      ]
    },
    {
      id: 3,
      companyName: 'BizAid Technologies Sdn. Bhd.',
      role: 'Software Programmer',
      year: 'Apr 2019 - Oct 2020',
      items: [
        {
          title: 'Managed and provided comprehensive support services, including bug fixes, software patches, enhancements, and customizations. Maintained up-to-date documentation and reports in accordance with SSM format, ensuring accurate and accessible information for effective service management.',
          description:
            ''
        },
        {
          title: 'Led a team of 3 interns and 1 developer in the development of two extension features and the maintenance of the OCR & NLP financial statement module. Collaborated closely with clients, enabling them to access their dedicated portals and utilize resources efficiently.',
          description:
            ''
        },
        {
          title: 'Oversaw and maintained Selenium testing, implementing automation to improve processing time and minimize human error. Played a key role in integration testing, ensuring the seamless integration of various system components.',
          description:
            ''
        },
        {
          title: 'Implemented REST API integrations, such as iMacros and Textract, resulting in increased monthly revenue and improved product quality. Leveraged these integrations to enhance system capabilities and provide valuable features to clients.',
          description: ''
        },
        {
          title: 'Assumed the role of an internal technician, managing IT-related issues within the organization. This involved tasks such as building, repairing, and formatting computers, installing tools and software for other departments, and managing the network infrastructure.',
          description: ''
        }
      ]
    }
  ];

  return response;
}

export function fetchEducations() {
  const response = [
    {
      id: 1,
      name: 'National University of Malaysia (UKM)',
      module: 'Bachelor of Software Engineering (Information Systems)',
      year: '2015 - 2019',
    }
  ];

  return response;
}