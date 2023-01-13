import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';
import { CustomButton } from './';
import { useStateContext } from '../context';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toogleDrawer, setToogleDrawer] = useState(false);

  const { connect, address } = useStateContext();

  return (
    <div className='flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6'>
      <div className='lg:flex-1 flex flow-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]'>
        <input
          type='text'
          placeholder='Search for Campaigns'
          className='flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none'
        />

        <div className='w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer'>
          <img
            src={search}
            alt='Search'
            className='w-[15px] h-[15px] object-contain'
          />
        </div>
      </div>

      <div className='flex-row justify-end hidden gap-4 sm:flex'>
        <CustomButton
          btnType='button'
          title={address ? 'Create a canpaign' : 'Connect Wallet'}
          styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if (address) {
              navigate('create-campaign');
            } else {
              connect();
            }
          }}
        />

        <Link to={'/profile'}>
          <div className='w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer'>
            <img
              src={thirdweb}
              alt='user'
              className='w-[60%] h-[60%] object-contain'
            />
          </div>
        </Link>
      </div>
      {/* Mobile */}

      <div className='relative flex items-center justify-between sm:hidden'>
        <div className='w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer'>
          <img
            src={logo}
            alt='user'
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
        <img
          src={menu}
          alt='menu'
          className='w-[34px] h-[34px] object-contain cursor-pointer'
          onClick={() => setToogleDrawer((value) => !value)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary
        py-4 ${
          !toogleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'
        } transition-all duration-700`}
        >
          <ul className='mb-4'>
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && 'bg-[#3a3a43]'
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToogleDrawer(false);
                  navigate(link.path);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[20px] h-[20px] object-contain ${
                    isActive === link.name ? 'grayscale-0' : 'grayscale'
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] first-letter:uppercase ${
                    isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
          <div className='flex mx-4'>
            <CustomButton
              btnType='button'
              title={address ? 'Create a canpaign' : 'Connect Wallet'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if (address) {
                  navigate('create-campaign');
                } else {
                  connect();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
