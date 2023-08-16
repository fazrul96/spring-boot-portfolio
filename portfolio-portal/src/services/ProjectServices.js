import videoFile from '../assets/video/Project.mp4';

export async function fetch() {
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
  
  export function fetchVideo() {
    const response = [
      {
        id : 1,
        path : videoFile,
        description : 'Project',
      }
    ];
  
    return response;
  }