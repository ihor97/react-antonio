import Input from '@/components/input'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import {  FcGoogle} from 'react-icons/fc'; // для Feather Icons
import {  FaGithub} from 'react-icons/fa'; // для Feather Icons

const Auth = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [variant, setVariant] = useState('login')

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    )
  }, [])
  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles',
      })
    } catch (error) {
      console.log(error)
    }
  }, [email, password])
  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      })
      login()
    } catch (error) {
      console.log(error)
    }
  }, [email, name, password, login])

  return (
    <div className="relative h-full w-full bg-[url('/images/1.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full bg-opacity-50">
        <nav className="px-12 py-12">
          <img src="/images/logo.jpg" alt="" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className=" bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign In' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  label="Username"
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                  id="name"
                  value={name}
                />
              )}

              <Input
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                id="password"
                type="password"
                value={password}
              />
              <button
                onClick={variant === 'login' ? login : register}
                className="bg-red-600 py-3 text-white transition rounded-md w-full mt-10 hover:bg-red-700"
              >
                {variant === 'login' ? 'Log In' : 'Sign Up'}
              </button>
              <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                <div
                  onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                >
                  <FcGoogle size={30} />
                </div>
                <div
                  onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                >
                  <FaGithub size={30} />
                </div>
              </div>
              <p className="text-neutral-500 mt-12">
                {variant === 'login'
                  ? ' First time?'
                  : 'Already have an account'}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:cursor-pointer"
                >
                  {variant === 'login' ? 'Create an Account' : 'Login'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Auth
