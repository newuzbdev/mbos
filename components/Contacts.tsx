'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { Button as MovingButton } from '@/components/ui/moving-border'
import { Textarea } from './ui/textarea'
import { getDictionary } from '@/get-dictionary'
import { SparklesCore } from './ui/sparkles'

const contactsSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  message: z
    .string()
    .min(1, { message: 'Message must be at least 10 characters long' })
})

export default function Contacts({
  t
}: {
  t: Awaited<ReturnType<typeof getDictionary>>
}) {
  const form = useForm<z.infer<typeof contactsSchema>>({
    resolver: zodResolver(contactsSchema),
    defaultValues: {
      name: '',
      phone: '',
      message: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof contactsSchema>) => {
    console.log(values)
  }

  return (
    <section
      id='contacts'
      className='flex flex-wrap items-center justify-center w-screen h-full gap-10 pt-8 px-4'
    >
      <div className='mbos-button'>{t.contact}</div>
      <h1 className='uppercase text-3xl md:text-5xl font-bold w-full text-center'>
        {t.contacth1}{' '}
        <span className='text-mbosLinear'> {t.contacth1span}</span>{' '}
        {t.contacth12}
      </h1>
      <div className='w-screen flex flex-col items-center  overflow-x-clip relative'>
        <div className='w-full md:w-[40rem] h-20 relative -mt-11'>
          <div className='absolute inset-x-18 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />
          <div className='absolute inset-x-18 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />
          <div className='absolute inset-x-18 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm' />
          <div className='absolute inset-x-18 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />
          <SparklesCore
            background='transparent'
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className='w-full h-full'
            particleColor='#FFFFFF'
          />
          <div className='absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]'></div>
        </div>
      </div>

      <div className='container sm:gap-8 items-stretch flex flex-col sm:flex-row w-full'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d95536.06413809728!2d60.539482691549175!3d41.55837868702473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d41.5584081!2d60.621883499999996!5e0!3m2!1sen!2s!4v1746118998846!5m2!1sen!2s'
          width='100%'
          height='350'
          style={{
            border: 0,
            width: '100%',
            borderRadius: '1rem'
          }}
          allowFullScreen={false}
          loading='lazy'
          className='block md:hidden'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>

        <div className='relative w-full my-3'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d95536.06413809728!2d60.539482691549175!3d41.55837868702473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d41.5584081!2d60.621883499999996!5e0!3m2!1sen!2s!4v1746118998846!5m2!1sen!2s'
            width='100%'
            height='500px'
            style={{
              border: 0,
              borderRadius: '1rem',
              width: '100%',
              height: '100%'
            }}
            className='hidden md:block'
            allowFullScreen={false}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>

        <MovingButton
          containerClassName='w-[calc(100vw-2rem)] md:w-2/5 !w-full h-full p-1 m-1'
          className='bg-black border border-gray-400'
        >
          <Form {...form}>
            <Image
              src='/backgroundFooter.png'
              alt='background'
              width={1400}
              height={1400}
              className='absolute size-[1400px] bg-black object-cover blur-2xl -z-10'
            />
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8 w-full h-full py-15 px-8 md:px-15  rounded-3xl relative'
            >
              <h1 className='font-semibold text-2xl mb-8 w-full text-center'>
                {t.contact}
              </h1>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t.name}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='+998'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder={t.message}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full'
                variant={'secondary'}
              >
                {t.send}
              </Button>
            </form>
          </Form>
        </MovingButton>
      </div>
    </section>
  )
}
