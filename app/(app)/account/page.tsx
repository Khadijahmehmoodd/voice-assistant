import { redirect } from 'next/navigation';
import { createClient } from '@/lib/utils/supabase/server';
import {
  getSubscription,
  getUser,
  getUserDetails,
} from '@/lib/utils/supabase/queries';
import CustomerPortalForm from '@/components/ui/account-forms/customer-portal-form';
import EmailForm from '@/components/ui/account-forms/email-form';
import NameForm from '@/components/ui/account-forms/name-form';
import SignOutForm from '@/components/ui/account-forms/signout-form';


export default async function Account() {
  const supabase = await createClient();
  const [user, userDetails, subscription] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
    getSubscription(supabase),
  ]);

  if (!user) {return redirect('/signin');}

  return (
    <section>
      <div className='flex flex-col items-start max-w-6xl gap-8 p-6 mx-auto'>
        <h1 className='text-2xl font-semibold text-canvas-text-contrast sm:text-center sm:text-3xl'>
          Account Management
        </h1>

        <div className='flex flex-col gap-8'>
          
          <CustomerPortalForm subscription={subscription} />
          <NameForm userName={userDetails?.full_name ?? ''} />
          <EmailForm userEmail={user?.email} />

          <SignOutForm />
        </div>
      </div>
    </section>
  );
}
