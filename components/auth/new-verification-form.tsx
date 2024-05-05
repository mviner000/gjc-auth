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


  //   const onSubmit = useCallback(() => {
  //     if (!token) {
  //       setError("Missing token!");
  //       return;
  //     }
  //     newVerification(token)
  //       .then((data) => {
  //         setSuccess(data.success);
  //         setError(data.error);
  //       })
  //       .catch(() => {
  //         setError("Something went wrong!");
  //       });
  //   }, [token]);

  //   useEffect(() => {
  //     onSubmit();
  //   }, [onSubmit]);

  useEffect(() => {
    if (!token) {
      setError("Missing token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);


  return (
    <CardWrapper
      headerTitle='GJC Library'
      headerLabel="Confirming your verification"
      backButtonLabel='back to login'
      backButtonHref='/auth/login'
    >
      <div className='flex items-center w-full justify-center'>
          <FormSuccess message={success} link={{ href: "/auth/login"}} />
          {!error && !success && <FidgetSpinner />}
          <FormError message={error} />
      </div>
    </CardWrapper>
  )
}
