import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';
import FundCard from './FundCard';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign: any) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className='font-semibold text-left text-white font-epilogue'>
        {title} {campaigns.length}
      </h1>

      <div className='grid md:grid-cols-2 lg:grid-cols-4 mt-[20px] gap-[26px]'>
        {isLoading && (
          <img
            src={loader}
            alt='loader'
            className='w-[100px] h-[100px] object-contain'
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className='font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]'>
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.id}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
