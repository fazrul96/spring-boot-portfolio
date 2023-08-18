import videoFile from '../assets/video/Project.mp4';
  
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