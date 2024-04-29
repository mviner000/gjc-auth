"use client";

import { useCallback, useEffect, useState } from 'react'
import { FidgetSpinner } from 'react-loader-spinner'
import { useSearchParams } from 'next/navigation';

import { newVerification } from '@/actions/new-verification';
import { CardWrapper } from './card-wrapper'
import { FormSuccess } from '../form-success';
import { FormError } from '../form-error';

type Data = {
  success?: string;
  error?: string;
} | undefined;

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (success || error ) return;

    if (!token) {
      setError("Missing token!");
      return;
    }
  
    try {
      const data: Data = await newVerification(token);
      setSuccess(data?.success);
      setSuccess("Email Verified. You can now proceed to login!");
    } catch (err) {
      setError("Something went wrong!");
    }
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
  headerTitle='GJC Library'
  headerLabel="Confirming your verification"
  backButtonLabel='back to login'
  backButtonHref='/auth/login'

  >
    <div className='flex items-center w-full justify-center'>
        {!error && !success && <FidgetSpinner />}

        {error && <FormError message={error} />}

        {success && <FormSuccess message={success} />}


      </div>
</CardWrapper>
  )
}
