import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import "../../App.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../../../store/slices/userSlice"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default  function Register({className,...props}) {

  const [fullname , setFullname] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [role , setRole] = useState('')
  const [etheriumPublicKey , setEtheriumPublicKey] = useState('')

  const dispatch = useDispatch()
  const {loading , error , message} = useSelector((state) => state.user)

  const handleRegister = async() => {
    const formdata = new FormData()
    formdata.append("fullname" , fullname )
    formdata.append("email" , email )
    formdata.append("password" , password )
    formdata.append("role" , role )
    formdata.append("etheriumPublicKey" , etheriumPublicKey )
    dispatch(register(formdata))
    setEmail('')
    setFullname('')
    setPassword('')
    setRole('')
    setEtheriumPublicKey('')
  }

  return (
    (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
    <div className="w-full max-w-sm md:max-w-3xl">    
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleRegister}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Ecart</h1>
                <p className="text-muted-foreground text-balance">
                  Register
                </p>
              </div>
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Role
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Select
                      value={role}
                      onValueChange={(selectedValue) =>
                        setRole(selectedValue)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Buyer">Buyer</SelectItem>
                        <SelectItem value="Seller">Seller</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="fullname">Fullname</Label>
                <Input id="fullname" type="fullname" placeholder="Enter your fullname " required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="etheriumPublicKey">Etherium Public Key</Label>
                <Input id="etheriumPublicKey" type="text" placeholder="Enter etherium public key" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter password" required />
              </div>
              <Button type="submit" className="w-full">
                Sign up
              </Button>
              <div className="text-center text-sm">
                already have an account?{" "}
                <Link to={"/login"} className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src=""
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
      <div
        className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
    </div>
    </div>
    )
  );
}

