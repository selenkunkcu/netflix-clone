import axios from 'axios';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa';

import Input from '@/components/Input';
import { signIn } from 'next-auth/react';


export default function Auth() {

    const register = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const router = useRouter();

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, []);

    
    const handleLogin = useCallback(async() => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            });

            router.push('/');

        } catch(error) {
            console.log("login error -> ", error);
        }
    }, [email, password, router]);


    const handleRegister = useCallback(async () => {        
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            });

            handleLogin();
            
        } catch (error) {
            console.log("register error -> ", error);
            
        }
    }, [email, name, password, handleLogin]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover">
        <div className='bg-black h-full w-full md:bg-opacity-50'>

            <nav className='px-12 py-6'>
                <img src="/images/logo.png" className='h-12' alt="logo" />
            </nav>

            <div className='flex justify-center'>
                <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 rounded-md w-full sm:w-[480px]'>
                    <h2 className='text-white text-4xl mb-8 font-semibold'>
                        {variant === 'login' ? 'Sign In' : 'Register'}
                    </h2>

                    <div className='flex flex-col gap-4'>
                        {variant === 'register' &&
                            <Input id='name' value={name} label='Username' onChange={(e:any) => setName(e.target.value)} type='text'/>
                        } 
                        <Input id='email' value={email} label='Email Address' onChange={(e:any) => setEmail(e.target.value)} type='email'/>
                        <Input id='password' value={password} label='Password' onChange={(e:any) => setPassword(e.target.value)} type='password'/>
                    </div>

                    <button 
                        className='bg-red-700 py-3 text-white hover:bg-red-800 transition rounded-md w-full mt-10'
                        onClick= {variant === 'login' ? handleLogin : handleRegister} >
                        {variant === 'login' ? 'Sign In' : 'Get Started'}
                    </button>

                    <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
                        <div className='bg-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
                            onClick={() => signIn('google', {callbackUrl: '/'})}>
                            <FcGoogle size={30}/>
                        </div>

                        <div className='bg-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
                            onClick={() => signIn('github', {callbackUrl: '/'})}>
                            <FaGithub size={30}/>
                        </div>
                    </div>

                    <p 
                        className='text-neutral-600 mt-12'>
                        {variant === 'login' ? 'New to Netflix?' : 'Already have an account?'}
                            <span 
                                onClick={toggleVariant}
                                className='text-white ml-2 cursor-pointer hover:underline transition'>
                                {variant === 'login' ? 'Sign up now.' : 'Sign in.'}
                            </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
