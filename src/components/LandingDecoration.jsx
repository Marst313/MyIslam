import clouds from '../assets/images/clouds.png';
import bushes from '../assets/images/bushes.png';
import { Icon } from '@iconify/react';

const LandingDecoration = () => {
  return (
    <>
      <img src={clouds} alt="clouds" className="w-20 absolute overflow-hidden -left-4 lg:-left-10 animate-wave lg:w-32 " />
      <img src={clouds} alt="clouds" className="w-20 lg:w-32 absolute overflow-hidden -right-4 lg:-right-10 animate-wave " />
      <img src={bushes} alt="clouds" className="w-16 absolute overflow-hidden top-5 animate-wave  mx-auto left-1/2 lg:w-24 lg:top-2  " />
      <img src={bushes} alt="clouds" className="w-24 absolute animate-wave overflow-hidden top-24 mx-auto  left-2 " />
      <Icon icon="pepicons-print:stars" color="#00FFD1" className="absolute left-[60%] top-20 lg:w-[50px]" width="40" height="40" />
      <Icon icon="bi:moon-stars-fill" color="#03001C" width="24" height="24" className="animate-wiggle origin-top absolute top-1/4 left-[47%] transform -translate-x-1/2 -translate-y-1/2 lg:w-[44px]" />
      <Icon icon="solar:stars-line-bold" color="#00ffd1" width="30" className="absolute top-1/3 left-[45%] transform -translate-x-1/2 -translate-y-1/2 rotate-180 lg:w-[40px] lg:h-[40px]" />
      <Icon icon="solar:stars-line-bold" color="#00ffd1" width="30" height="30" className="absolute top-1/3 left-[55%] transform -translate-x-1/2 -translate-y-1/2  -scale-y-100   scale-x-100 lg:w-[40px] lg:h-[40px] " />
    </>
  );
};

export default LandingDecoration;
