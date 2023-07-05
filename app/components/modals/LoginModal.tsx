'use client'

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import { useCallback,useState } from 'react';
import { FieldValues,SubmitHandler,useForm } from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation';

import useLoginModal from '../hooks/useLoginModal';
import useRegisterModal from '../hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';

function LoginModal() {

    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        email:'',
        password:''
    });

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

       signIn('credentials',{
        ...data,
        redirect:false
       })
       .then((callback) => {
            setIsLoading(false);
            if(callback?.ok){
                toast.success("Logged in!");
                router.refresh();
                loginModal.onClose();
            }

            if(callback?.error){
                toast.error(callback.error)
            }

       })
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    },[loginModal, registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title={'Welcome back!'} subtitle={'Login to your account'} center={true}/>

            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>
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
                        First time using Airbnb?
                    </div>
                    <div onClick={toggle} className='text-neutral-800 cursor-pointer hover:underline'>
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <>
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title={"Login"}
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
            actionLabel={'Login'}
        />
    </>
  )
}

export default LoginModal