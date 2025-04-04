
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '@/services/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Card from '@/components/ui/Card'; // Import as default
import { useToast } from '@/hooks/use-toast';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      await signUp(email, password);
      toast({
        title: "Account created!",
        description: "You have successfully signed up.",
        variant: "default",
      });
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Sign-up error:', error);
      toast({
        title: "Sign up failed",
        description: error.message || "Please try again with different credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-purple hover:bg-purple/90"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </Button>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/signin" className="text-purple hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </Card>
  );
};

export default SignUpForm;
