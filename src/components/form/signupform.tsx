"use client"

import Link from "next/link"
import {useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const FormSchema = z
.object({
    username: z.string().min(1, 'User Name is required').max(30),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
  .string()
  .min(1, 'Password is requied')
  .min(8, 'Password must have 8 characters'),
  confirmpassword: z.string().min(1, 'Password confirmation is required'),
  
  
})

.refine((data) => data.password === data.confirmpassword, {
    path: ['confirmpassword'],
    message: 'Password do not match',
})


const Signupform = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    }
   
  })

  const onSubmit = (values: z.infer<typeof FormSchema> ) => {
    console.log(values)
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">

      <div className="space-y-2">

      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>User Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="john" {...field} />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />


      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="email address" {...field} />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />

      

    <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Enter Your  Password" {...field} />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="confirmpassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Re-Enter Your  Password" {...field} />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />




</div>


      <Button className="w-full mt-6" type="submit">Sign Up</Button>
    </form>

          <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 
          after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            or
          </div>
          <p>
            if you don't have an account, please- 
            <Link className="text-blue-500 hover:underline" href="/sign-in">Sign in</Link>
          </p>

  </Form>
  )
}

export default Signupform;
