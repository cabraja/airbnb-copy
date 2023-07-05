'use client'

import { useMemo, useState } from "react";
import useRentModal from "../hooks/useRentModal"
import Modal from "./Modal"
import Heading from "../Heading";
import CategoryInput from '../inputs/CategoryInput'
import Counter from "../inputs/Counter";
import { categories } from "../navbar/Categories";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import ImageUpload from "../inputs/ImageUpload";

enum STEPS{
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}


function RentModal() {

    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);

    // FORM
    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState:{
        errors
      },
      reset
    } = useForm<FieldValues>({
      defaultValues:{
        category: '',
        location: null,
        guestCount:1,
        roomCount:1,
        bathroomCount:1,
        imageSrc: '',
        price:1,
        title: '',
        description: ''
      }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');

    const Map = useMemo(() => dynamic(() => import('../Map'), { 
      ssr: false 
    }), [location]);

    const setCustomValue = (id:string,value:any) => {
      setValue(id,value,{
        shouldDirty:true,
        shouldTouch:true,
        shouldValidate:true
      })
    }

    // FUNCTIONS
    const onBack = () =>{
      setStep(value => value - 1)
    }

    const onNext = () =>{
      setStep(value => value + 1)
    }

    const actionLabel = useMemo(() => {
      if(step == STEPS.PRICE){
        return 'Finish'
      }
      return 'Next'
    },[step])

    const secondaryActionLabel = useMemo(() => {
      if(step == STEPS.CATEGORY){
        return undefined
      }
      return 'Back'
    },[step])

    let bodyContent = (
      <div className="
      flex
      flex-col
      gap-8
      ">
        <Heading center={true} title={'Which of these best describes your place?'} subtitle={'Pick a category'}/>

        <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto
        ">
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(category) => setCustomValue("category",category)}
                selected={category == item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    )

    if(step == STEPS.LOCATION){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title={'Where is your place located?'} subtitle={'Help guests find you'} center={true}/>

          <CountrySelect value={location} onChange={(value) => setCustomValue('location',value)}/>

          <Map center={location?.latlng}/>
        </div>
      )
    }

    if(step == STEPS.INFO){
      bodyContent = (
        <div className="flex flex-col gap-6">
          <Heading title={"Share some info about your place"} center={true} subtitle={"What amenities do you have?"}/>

          <Counter title={"Number of guests"} subtitle={"How many guests can stay here?"} value={guestCount} onChange={(value) => setCustomValue('guestCount',value)}/>
          <hr />
          <Counter title={"Number of rooms"} subtitle={"How many rooms do you have?"} value={roomCount} onChange={(value) => setCustomValue('roomCount',value)}/>
          <hr />
          <Counter title={"Number of bathrooms"} subtitle={"How many bathrooms do you have?"} value={bathroomCount} onChange={(value) => setCustomValue('bathroomCount',value)}/>
        </div>
      )
    }

    if(step == STEPS.IMAGES){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title={"Add a photo of your place"} center={true} subtitle={"Show guests what your place looks like!"}/>

          <ImageUpload />
        </div>
      )
    }

  return (
    <Modal 
        title={'Airbnb your home'}
        onClose={rentModal.onClose}
        onSubmit={onNext}
        actionLabel={actionLabel}
        secondaryLabel={secondaryActionLabel}
        secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
        isOpen={rentModal.isOpen}
        body={bodyContent}
    />
  )
}

export default RentModal