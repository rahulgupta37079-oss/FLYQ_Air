import AuthForm from '@/components/forms/auth-form'
export const metadata = { title: 'Reset password' }
export default function ForgotPage() {
  return <div className="pt-32 pb-20 px-5 min-h-screen grid place-items-start justify-center"><AuthForm mode="forgot" /></div>
}
