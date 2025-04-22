import { LoginForm } from "@/components/login-form"

const Login = () => {
  return (
    <div className="flex min-h-svh bg-gradient-to-r from-yellow-100 to-pink-100 flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login