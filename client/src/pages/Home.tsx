import React, { useEffect, useState } from 'react';
import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    console.log(data);
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div>
      <DisplayCampaigns
        title='All Campaigns'
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  );
}

export default Home;
