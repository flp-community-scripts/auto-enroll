import { useState } from 'react';
import Image from "next/image";

import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import { redirect } from 'next/navigation'

/**
 * 
 * API docs
 * https://docs.github.com/en/rest/orgs/members?apiVersion=2022-11-28#add-a-member
 */

// curl -L \
//   -X POST \
//   -H "Accept: application/vnd.github+json" \
//   -H "Authorization: Bearer <YOUR-TOKEN>" \
//   -H "X-GitHub-Api-Version: 2022-11-28" \
//   https://api.github.com/orgs/ORG/invitations \
//   -d '{"email":"octocat@github.com","role":"direct_member","team_ids":[12,26]}'

export default function Home({
  searchParams
}: any) {
  async function inviteUser(formData: FormData) {
    'use server'

    // console.log(process.env.GITHUB_PAT)
    
    const response = await fetch('https://api.github.com/orgs/flp-community-scripts/invitations', {
      method: 'POST',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        'Authorization': `Bearer ${process.env.GITHUB_PAT}`,
        'Accept': 'application/vnd.github+json'
      },
      body: JSON.stringify({
        email: formData.get('email'),
        role: 'direct_member',
        team_ids: []
      })
      
    })
    
    if(response.status < 300) {
      redirect(`/?thankyou`)
      return 
    } else {
      console.log(await response.text())
      redirect(`/?oops`)
      return
    }
    
  }
  
  
  if(searchParams?.oops !== undefined) {
    return (
      <main className="flex min-h-screen flex-col items-center gap-10 p-24 overflow-hidden">
        <HeaderThing/>
        
        <div className="relative isolate py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-1">
            <div className="max-w-xl lg:max-w-lg">
              <Headline/>
              <form action={inviteUser}>
              <div className="mt-6 flex flex-col gap-4 max-w-md gap-x-4">
                <b className="text-xl">Oops! Somethings broken! <br/> Try again later.</b>
              </div>
              </form>
            </div>
          </div>
        </div>
        <CutePolygons/>
      </div>  
      </main>      
    )
  }
  
  if(searchParams?.thankyou !== undefined) {
    return (
      <main className="flex min-h-screen flex-col items-center gap-10 p-24 overflow-hidden">
        <HeaderThing/>
        
        <div className="relative isolate py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-1">
            <div className="max-w-xl lg:max-w-lg">
              <Headline/>
              <form action={inviteUser}>
              <div className="mt-6 flex flex-col gap-4 max-w-md gap-x-4">
                <b className="text-xl">Thank you! <br/>Now accept the invite in your inbox!</b>
              </div>
              </form>
            </div>
          </div>
        </div>
        <CutePolygons/>
      </div>  
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24 overflow-hidden">
      <HeaderThing/>
      
      <div className="relative isolate py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-1">
          <div className="max-w-xl lg:max-w-lg">
            <Headline/>
            <form action={inviteUser}>
            <div className="mt-6 flex flex-col gap-4 max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Enter your github email"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Get Invite
              </button>
            </div>
            </form>
            <p className="mt-4 text-sm leading-5 text-gray-300">
              The only way to auto-invite is to use github associated <br/>email unfortunately. Regardless, no data collection occurs.
            </p>
          </div>
        </div>
      </div>
      <CutePolygons/>
    </div>  
    </main>
  );
}

const HeaderThing = () => (
  <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
    Auto-Enroll into&nbsp;<b>flp-community-scripts</b>&nbsp;github org
    {/* <code className="font-mono font-bold">app/page.tsx</code> */}
  </p>
)

const Headline = () => (
  <>
    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">flp-community-scripts</h2>
    <p className="mt-3 text-sm leading-5 text-gray-300">
      Get access to share your FL Studio <br/>piano roll scripts in one github org!
    </p>
  </>
)

const CutePolygons = () => (
  <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
    <div
      className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
    />
  </div>
)