"use client"
import React, { useRef, useState, useEffect, useCallback } from "react";
import {useRouter} from 'next/navigation';
import axios from "axios";
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../store/hooks';
import { loginSuccess, setLoading, setError, clearError } from '../store/slices/authSlice';
import { saveAuthToken, saveUserData } from '../utils/authStorage';
import { useTranslations } from 'next-intl';
import { useRTL } from '../hooks/useRTL';  
interface OtpState {
  otp: string[];
  registrationData: string | null;
  isSubmitting: boolean;
}

export default function Otp2() {
  const [state, setState] = useState<OtpState>({
    otp: Array(5).fill(""), // 5-digit OTP
    registrationData: null,
    isSubmitting: false
  });
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone');
  const router = useRouter();
  const { isLoading, error } = useAuth();
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const { isRTL, direction } = useRTL();
  // Load registration data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('registrationData');
      if (storedData) {
        setState(prev => ({ ...prev, registrationData: storedData }));
      }
    }
  }, []);

  
const handleSubmit = useCallback(async () => {
  setState(prev => ({ ...prev, isSubmitting: true }));
  dispatch(setLoading(true));
  dispatch(clearError());
  
  try {
    let requestData;
    
    // Always use registration data from localStorage if available (complete registration flow)
    if(state.registrationData){
      requestData = {...JSON.parse(state.registrationData), otp_code:String(state.otp.join(''))};
      console.log('Sending complete registration data:', requestData);
    } else {
      // Fallback: if no registration data, use phone from URL (login flow)
      requestData = {phone: `${phone}`, otp_code:String(state.otp.join(''))};
      console.log('Sending login data:', requestData);
    }

    const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+"/auth/login-or-register", requestData);
    console.log('Response:', response.data.data.token);
    // Handle successful response with token
    if (response.data && response.data.data.token) {
      const { token, user } = response.data.data;
      
      // Store token and user data in both localStorage and cookies
      saveAuthToken(token);
      saveUserData(user);
      
      // Clean up registration data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('registrationData');
      }
      
      // Update Redux store with login success
      dispatch(loginSuccess({
        token,
        user: {
          id: user.id || '',
          email: user.email || '',
          name: user.name || user.first_name + ' ' + user.last_name || '',
          phone: user.phone || phone || '',
        }
      }));
      
      console.log('Login successful, token stored:', token);
      router.push("/");
    } else {
      throw new Error('No token received from server');
    }
  } catch (error: unknown) {
    console.error('OTP verification failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'OTP verification failed';
    dispatch(setError(errorMessage));
  } finally {
    setState(prev => ({ ...prev, isSubmitting: false }));
    dispatch(setLoading(false));
  }
}, [state.registrationData, state.otp, phone, dispatch, router]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // Array of refs for each input field

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const target = e.target as HTMLInputElement;
      const index = inputRefs.current.indexOf(target);
      
      // If current field has content, clear it
      if (target.value) {
        setState(prev => ({
          ...prev,
          otp: [
            ...prev.otp.slice(0, index),
            "",
            ...prev.otp.slice(index + 1),
          ]
        }));
      } else {
        // If current field is empty, move to the appropriate field based on direction
        const prevIndex = isRTL ? index + 1 : index - 1;
        if (isRTL ? prevIndex < state.otp.length : prevIndex >= 0) {
          setState(prev => ({
            ...prev,
            otp: [
              ...prev.otp.slice(0, prevIndex),
              "",
              ...prev.otp.slice(prevIndex + 1),
            ]
          }));
          inputRefs.current[prevIndex]?.focus();
        }
      }
    }
  }, [isRTL, state.otp.length]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
      if (target.value) {
        setState(prev => ({
          ...prev,
          otp: [
            ...prev.otp.slice(0, index),
            target.value,
            ...prev.otp.slice(index + 1),
          ]
        }));
        // In RTL, move to the left (previous index), in LTR move to the right (next index)
        const nextIndex = isRTL ? index - 1 : index + 1;
        if (isRTL ? nextIndex >= 0 : nextIndex < state.otp.length) {
          inputRefs.current[nextIndex]?.focus();
        }
      }
  }, [state.otp.length, isRTL]);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${state.otp.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    setState(prev => ({ ...prev, otp: digits }));
  }, [state.otp.length]);

  return (
    <>
  
      <div className="container">
        <div>
        <div id="otp-form" className="space-y-6">
        <div className="flex justify-center gap-2 sm:gap-3">
            {state.otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onPaste={handlePaste}
                inputMode="numeric"
                pattern="\\d*"
                autoComplete="one-time-code"
                disabled={state.isSubmitting || isLoading}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                className={`shadow-xs flex h-12 w-12 items-center justify-center rounded-lg border border-stroke bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:h-14 sm:w-14 sm:text-3xl md:h-16 md:w-16 md:text-4xl dark:border-dark-3 dark:bg-white/5 ${
                  (state.isSubmitting || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                dir={direction as 'ltr' | 'rtl'}
                style={{ textAlign: 'center', direction: direction as 'ltr' | 'rtl' }}
              />
            ))}
          </div>
                   <div className="text-center">
   
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center">
                            {t('Enter the 6-digit code sent to your phone')}
                       </p>
                       
                       {/* Show Redux auth error */}
                       {error && (
                         <div className="mt-2 text-red-600 dark:text-red-400 text-sm">
                           {error}
                         </div>
                       )}
                   </div>
   
                   <div className="text-center">
                       <button
                           type="button"
                           id="resend-otp"
                           className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 disabled:opacity-50 disabled:cursor-not-allowed"
                           disabled={state.isSubmitting || isLoading}>
                           <span id="resend-text">{t('Resend code in ')}</span>
                           <span id="countdown">60</span>s
                       </button>
                   </div>
   
                   <div className="flex flex-col gap-3 sm:flex-row sm:space-x-4">
                       <button
                           type="button"
                           id="back-to-phone-from-otp"
                           disabled={state.isSubmitting || isLoading}
                           className={`te-btn te-btn-default sm:flex-1 ${
                             (state.isSubmitting || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
                           }`}>
                           {t('Change Phone')}
                       </button>
                       <button
                           onClick={handleSubmit}
                           id="otp-submit"
                           disabled={state.isSubmitting || isLoading}
                           className={`te-btn te-btn-primary flex-1 flex justify-center items-center ${
                             (state.isSubmitting || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
                           }`}>
                           {(state.isSubmitting || isLoading) ? (
                             <>
                               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                               <span>{t('Verifying')}</span>
                             </>
                           ) : (
                             <span>{t('Verify & Sign In')}</span>
                           )}
                       </button>
                   </div>
               </div>

         
        </div>
      </div>
      
    </>
   
  );
}
