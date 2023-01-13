import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import { useState } from 'react';
import { useStateContext } from '../context';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    description: '',
    title: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm((prev) => ({ ...prev, [fieldName]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        console.log(form);
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Please enter a valid image URL');
        setForm({ ...form, image: '' });
      }
    });
  };

  return (
    <div className='bg-[#1c1c24] flex flex-col  justify-center items-center rounded-[10px] sm:p-10 p-4'>
      {isLoading && <Loader />}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className='w-full mt-[65px] flex flex-col gap-[30px]'
      >
        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            labelName='Your Name *'
            placeholder='John Doe'
            inputType='text'
            value={form.name}
            isTextArea={false}
            handleChange={(e) => {
              handleFormFieldChange('name', e);
            }}
          />
          <FormField
            labelName='Campaign Title *'
            placeholder='Write a title'
            inputType='text'
            value={form.title}
            isTextArea={false}
            handleChange={(e) => {
              handleFormFieldChange('title', e);
            }}
          />
        </div>
        <FormField
          labelName='Story *'
          placeholder='Write you story'
          inputType='text'
          value={form.description}
          isTextArea={true}
          handleChange={(e) => {
            handleFormFieldChange('description', e);
          }}
        />

        <div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]'>
          <img
            src={money}
            alt='money'
            className='w-[40px] h-[40px] object-contain'
          />
          <h4 className='font-epilogue font-bold text-[25px] text-white ml-[20px]'>
            You wil get 100% of the raised amount
          </h4>
        </div>

        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            labelName='Goal *'
            placeholder='ETH 0.50'
            inputType='text'
            value={form.target}
            isTextArea={false}
            handleChange={(e) => {
              handleFormFieldChange('target', e);
            }}
          />
          <FormField
            labelName='End Date *'
            placeholder='End Date'
            inputType='date'
            value={form.deadline}
            isTextArea={false}
            handleChange={(e) => {
              handleFormFieldChange('deadline', e);
            }}
          />
        </div>

        <FormField
          labelName='Campaign Image *'
          placeholder='Place image URL of you campaign'
          inputType='url'
          value={form.image}
          isTextArea={false}
          handleChange={(e) => {
            handleFormFieldChange('image', e);
          }}
        />

        <div className='flex justify-center items-center mt-[40px]'>
          <CustomButton
            btnType='submit'
            title='Submit New Campaign'
            styles='bg-[#1dc071]'
            handleClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
