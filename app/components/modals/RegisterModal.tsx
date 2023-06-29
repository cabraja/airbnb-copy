'use client'

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import { useCallback,useState } from 'react';
import { FieldValues,SubmitHandler,useForm } from 'react-hook-form';
import {toast} from 'react-hot-toast';


import useRegisterModal from '../hooks/useRegisterModal'
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import { signIn } from 'next-auth/react';

function RegisterModal() {

    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        name:'',
        email:'',
        password:''
    });

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register',data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error('Oopsie daisy!')
            })
            .finally(() => {
                setIsLoading(false);
                
            })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title={'Welcome to Airbnb'} subtitle={'Create an account'} center={true}/>

            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>
            <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required/>
            <Input id='password' label='Password' type='password' disabled={isLoading} register={register} errors={errors} required/>
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                outline={true}
                label={"Continue with Google"}
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />

            <Button 
                outline={true}
                label={"Continue with Github"}
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />

            <div className='
            text-neutral-500
            text-center
            mt-3
            font-light
            '>
                <div className='flex flex-row justify-center items-center gap-2'>
                    <div >
                        Already have an account?
                    </div>
                    <div onClick={registerModal.onClose} className='text-neutral-800 cursor-pointer hover:underline'>
                        Log in here
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <>
        <Modal 
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title={"Register"}
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
            actionLabel={'Register'}
        />
    </>
  )
}

export default RegisterModal