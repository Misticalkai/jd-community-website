'use client';

import { useState } from 'react';
import { signupAction } from '../actions/auth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SHA256 from 'crypto-js/sha256';  // Importing SHA256 from crypto-js
import HCaptcha from '@/components/HCaptcha'; // Adjust the import path as needed

interface SignupState {
  error?: string;
  success?: string;
}

export default function SignupPage() {
  const [state, setState] = useState<SignupState | null>(null); // Manually manage state
  const [isPending, setIsPending] = useState(false);
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    if (!hcaptchaToken) {
      setState({ error: 'Please complete the hCaptcha' });
      return;
    }

    setIsPending(true);
    setState(null);

    formData.append('hcaptchaToken', hcaptchaToken);

    try {
      // Get the password from the formData and hash it using SHA256
      const password = formData.get('password') as string;
      const hashedPassword = SHA256(password).toString();  // Hash the password using SHA256

      // Now include the hashed password in the form data
      formData.set('password', hashedPassword);  // Replace the plain password with the hashed one

      // Call the signup action with the updated formData
      const result = await signupAction(formData);
      setState(result);

      if (result.success) {
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Reload the page after 1 second
      }
    } catch {
      setState({ error: "An unexpected error occurred." });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(new FormData(e.currentTarget)); }}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" type="text" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <HCaptcha onVerify={(token) => setHcaptchaToken(token)} />
              {state?.error && (
                <Alert variant="destructive">
                  <AlertDescription>{state.error}</AlertDescription>
                </Alert>
              )}
              {state?.success && (
                <Alert variant="success">
                  <AlertDescription>{state.success}</AlertDescription>
                </Alert>
              )}
            </div>
            <CardFooter className="flex justify-center pt-6">
              <Button type="submit" disabled={isPending} className="w-full max-w-xs">
                {isPending ? 'Signing up...' : 'Sign Up'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

