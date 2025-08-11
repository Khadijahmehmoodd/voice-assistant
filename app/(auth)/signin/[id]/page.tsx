// import React from 'react';
// import { Button, Card, Logo } from '@/components/ui';
// import { createClient } from '@/lib/utils/supabase/server';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
// import {
//   getAuthTypes,
//   getViewTypes,
//   getDefaultSignInView,
//   getRedirectMethod,
// } from '@/lib/utils/auth-helpers/settings';
// import { PasswordSignIn } from '@/components/ui/auth-forms/password-signin';
// import EmailSignIn from '@/components/ui/auth-forms/email-signin';
// import ForgotPassword from '@/components/ui/auth-forms/forgot-password';
// import UpdatePassword from '@/components/ui/auth-forms/update-password';
// import SignUp from '@/components/ui/auth-forms/signup';
// import Separator from '@/components/ui/auth-forms/separator';
// import OauthSignIn from '@/components/ui/auth-forms/o-auth-signin';
// import Link from 'next/link';

// export default async function SignIn({
//   params,
//   searchParams,
// }: {
//   params: { id: string };
//   searchParams: { disable_button: boolean };
// }) {
//   const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
//   const viewTypes = getViewTypes();
//   const redirectMethod = getRedirectMethod();

//   // Declare 'viewProp' and initialize with the default value
//   let viewProp: string;

//   // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
//   const { id } = await params;
//   if (typeof id === 'string' && viewTypes.includes(id)) {
//     viewProp = id;
//   } else {
//     const preferredSignInView =
//       (await cookies()).get('preferredSignInView')?.value || null;
//     viewProp = getDefaultSignInView(preferredSignInView);
//     return redirect(`/signin/${viewProp}`);
//   }

//   // Check if the user is already logged in and redirect to the account page if so
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (user && viewProp !== 'update_password') {
//     return redirect('/');
//   } else if (!user && viewProp === 'update_password') {
//     return redirect('/signin');
//   }

//   return (
//     <>
//       <nav className='fixed top-0 right-0 p-6'>
//         {viewProp === 'signup' ? (
//           <Link href='/signin'>
//             <Button color='gray' variant='ghost' size='small'>
//               Login
//             </Button>
//           </Link>
//         ) : viewProp !== 'update_password' &&
//           viewProp !== 'forgot_password' &&
//           viewProp !== 'reset_password' ? (
//           <Link href='/signin/signup'>
//             <Button color='gray' variant='ghost' size='small'>
//               Register
//             </Button>
//           </Link>
//         ) : null}
//       </nav>
//       {viewProp === 'forgot_password' || viewProp === 'update_password' ? (
//         <nav className='fixed top-0 p-5'>
//           <Link href='/'>
//             <Logo width='64px' height='64px' />
//           </Link>
//         </nav>
//       ) : null}
//       <div className='flex flex-col items-center justify-between w-full h-screen lg:pt-48'>
//         <div className='flex flex-col max-w-lg gap-12 lg:w-96'>
//           {viewProp !== 'forgot_password' && viewProp !== 'update_password' ? (
//             <div className='flex justify-center'>
//               <Link href='/'>
//                 <Logo width='64px' height='64px' />
//               </Link>
//             </div>
//           ) : null}
//           <Card
//             title={
//               viewProp === 'forgot_password'
//                 ? 'Forgot your password?'
//                 : viewProp === 'update_password'
//                   ? 'Update Password'
//                   : viewProp === 'signup'
//                     ? 'Welcome to App'
//                     : 'Sign In'
//             }
//             description={
//               viewProp === 'signup'
//                 ? "Get started by creating an account. It's free."
//                 : viewProp === 'reset_password'
//                   ? "Don't worry, we'll send you a message to help you reset your password."
//                   : viewProp === 'forgot_password'
//                     ? "Don't worry, we'll send you a message to help you reset your password."
//                     : viewProp === 'update_password'
//                       ? 'Please set a new password for your account'
//                       : 'Login to continue to the app.'
//             }
//           >
//             <div>
//               {viewProp !== 'update_password' &&
//                 viewProp !== 'forgot_password' &&
//                 allowOauth && (
//                   <>
//                     <OauthSignIn />
//                     <Separator text='OR' />
//                   </>
//                 )}
//               {viewProp === 'password_signin' && (
//                 <PasswordSignIn
//                   allowEmail={allowEmail}
//                   redirectMethod={redirectMethod}
//                 />
//               )}
//               {viewProp === 'email_signin' && (
//                 <EmailSignIn
//                   allowPassword={allowPassword}
//                   redirectMethod={redirectMethod}
//                   disableButton={searchParams.disable_button}
//                 />
//               )}
//               {viewProp === 'forgot_password' && (
//                 <ForgotPassword
//                   allowEmail={allowEmail}
//                   redirectMethod={redirectMethod}
//                   disableButton={searchParams.disable_button}
//                 />
//               )}
//               {viewProp === 'update_password' && (
//                 <UpdatePassword redirectMethod={redirectMethod} />
//               )}
//               {viewProp === 'signup' && (
//                 <SignUp
//                   allowEmail={allowEmail}
//                   redirectMethod={redirectMethod}
//                 />
//               )}
//             </div>
//           </Card>
//         </div>
//         <div>
//           <p className='py-4 text-xs text-canvas-text'>
//             By continuing, you agree to our{' '}
//             <Link href='/terms-of-service' className='text-canvas-text-contrast'>
//               Terms of services{' '}
//             </Link>
//             and{' '}
//             <Link href='/privacy-policy' className='text-canvas-text-contrast'>
//               Privacy Policy.
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }
import React from 'react';
import { Button, Card, Logo } from '@/components/ui';
import { createClient } from '@/lib/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getAuthTypes,
  getViewTypes,
  getDefaultSignInView,
  getRedirectMethod,
} from '@/lib/utils/auth-helpers/settings';
import { PasswordSignIn } from '@/components/ui/auth-forms/password-signin';
import EmailSignIn from '@/components/ui/auth-forms/email-signin';
import ForgotPassword from '@/components/ui/auth-forms/forgot-password';
import UpdatePassword from '@/components/ui/auth-forms/update-password';
import SignUp from '@/components/ui/auth-forms/signup';
import Separator from '@/components/ui/auth-forms/separator';
import OauthSignIn from '@/components/ui/auth-forms/o-auth-signin';
import Link from 'next/link';

export default async function SignIn({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ disable_button: boolean }>;
}) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes();
  const redirectMethod = getRedirectMethod();

  // Declare 'viewProp' and initialize with the default value
  let viewProp: string;

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  const { id } = await params;
  const awaitedSearchParams = await searchParams;
  if (typeof id === 'string' && viewTypes.includes(id)) {
    viewProp = id;
  } else {
    const preferredSignInView =
      (await cookies()).get('preferredSignInView')?.value || null;
    viewProp = getDefaultSignInView(preferredSignInView);
    return redirect(`/signin/${viewProp}`);
  }

  // Check if the user is already logged in and redirect to the account page if so
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && viewProp !== 'update_password') {
    return redirect('/');
  } else if (!user && viewProp === 'update_password') {
    return redirect('/signin');
  }

  return (
    <>
      <nav className='fixed top-0 right-0 p-6'>
        {viewProp === 'signup' ? (
          <Link href='/signin'>
            <Button color='gray' variant='ghost' size='small'>
              Login
            </Button>
          </Link>
        ) : viewProp !== 'update_password' &&
          viewProp !== 'forgot_password' &&
          viewProp !== 'reset_password' ? (
          <Link href='/signin/signup'>
            <Button color='gray' variant='ghost' size='small'>
              Register
            </Button>
          </Link>
        ) : null}
      </nav>
      {viewProp === 'forgot_password' || viewProp === 'update_password' ? (
        <nav className='fixed top-0 p-5'>
          <Link href='/'>
            <Logo width='64px' height='64px' />
          </Link>
        </nav>
      ) : null}
      <div className='flex flex-col items-center justify-between w-full h-screen lg:pt-48'>
        <div className='flex flex-col max-w-lg gap-12 lg:w-96'>
          {viewProp !== 'forgot_password' && viewProp !== 'update_password' ? (
            <div className='flex justify-center'>
              <Link href='/'>
                <Logo width='64px' height='64px' />
              </Link>
            </div>
          ) : null}
          <Card
            title={
              viewProp === 'forgot_password'
                ? 'Forgot your password?'
                : viewProp === 'update_password'
                  ? 'Update Password'
                  : viewProp === 'signup'
                    ? 'Welcome to App'
                    : 'Sign In'
            }
            description={
              viewProp === 'signup'
                ? "Get started by creating an account. It's free."
                : viewProp === 'reset_password'
                  ? "Don't worry, we'll send you a message to help you reset your password."
                  : viewProp === 'forgot_password'
                    ? "Don't worry, we'll send you a message to help you reset your password."
                    : viewProp === 'update_password'
                      ? 'Please set a new password for your account'
                      : 'Login to continue to the app.'
            }
          >
            <div>
              {viewProp !== 'update_password' &&
                viewProp !== 'forgot_password' &&
                allowOauth && (
                  <>
                    <OauthSignIn />
                    <Separator text='OR' />
                  </>
                )}
              {viewProp === 'password_signin' && (
                <PasswordSignIn
                  allowEmail={allowEmail}
                  redirectMethod={redirectMethod}
                />
              )}
              {viewProp === 'email_signin' && (
                <EmailSignIn
                  allowPassword={allowPassword}
                  redirectMethod={redirectMethod}
                  disableButton={awaitedSearchParams.disable_button}
                />
              )}
              {viewProp === 'forgot_password' && (
                <ForgotPassword
                  allowEmail={allowEmail}
                  redirectMethod={redirectMethod}
                  disableButton={awaitedSearchParams.disable_button}
                />
              )}
              {viewProp === 'update_password' && (
                <UpdatePassword redirectMethod={redirectMethod} />
              )}
              {viewProp === 'signup' && (
                <SignUp
                  allowEmail={allowEmail}
                  redirectMethod={redirectMethod}
                />
              )}
            </div>
          </Card>
        </div>
        <div>
          <p className='py-4 text-xs text-canvas-text'>
            By continuing, you agree to our{' '}
            <Link href='/terms-of-service' className='text-canvas-text-contrast'>
              Terms of services{' '}
            </Link>
            and{' '}
            <Link href='/privacy-policy' className='text-canvas-text-contrast'>
              Privacy Policy.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}