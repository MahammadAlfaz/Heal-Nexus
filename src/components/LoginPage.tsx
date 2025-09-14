import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, User, Stethoscope, Shield, Mail, Lock, AlertCircle } from 'lucide-react';
import { loginUser } from '../utils/api';
interface LoginPageProps {
  onLogin: (userType: 'patient' | 'doctor' | 'admin') => void;
  onNavigate: (page: 'landing' | 'signup') => void;
}

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      if (activeTab === 'admin') {
        // 🚨 SECURITY WARNING: This is a major security vulnerability.
        // Admin login should never be handled on the client-side without
        // proper authentication. This is a placeholder and must be replaced
        // with a secure server-side authentication mechanism.
        localStorage.setItem('authToken', 'admin-token');
        localStorage.setItem('userId', 'admin-id');
        localStorage.setItem('userType', 'admin');
        onLogin('admin');
      } else {
        const response = await loginUser(email, password, activeTab);
        if (response.token && response.userId) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('userType', activeTab);
          onLogin(activeTab as 'patient' | 'doctor');
        } else {
          throw new Error(response.message || 'Login failed: No token received');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 transition-all duration-300">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-black font-medium hover:bg-gray-100"
          onClick={() => onNavigate('landing')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="shadow-2xl border-0 rounded-3xl bg-white">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-black text-black">Welcome Back</CardTitle>
            <CardDescription className="text-gray-500">
              Sign in to access your healthcare dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-xl p-1 bg-gray-200">
                <TabsTrigger
                  value="patient"
                  className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  <User className="w-4 h-4 mr-2" />
                  Patient
                </TabsTrigger>
                <TabsTrigger
                  value="doctor"
                  className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Doctor
                </TabsTrigger>
                <TabsTrigger
                  value="admin"
                  className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </TabsTrigger>
              </TabsList>

              <div className="space-y-4 mt-6">
                {activeTab === 'patient' || activeTab === 'doctor' ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-black">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder={activeTab === 'patient' ? "patient@example.com" : "doctor@example.com"}
                            className="pl-10 rounded-xl border-gray-300 bg-white text-black placeholder-gray-500 focus:border-black focus:ring-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-black">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 rounded-xl border-gray-300 bg-white text-black placeholder-gray-500 focus:border-black focus:ring-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-gray-600 pt-4 pb-2">
                      Click "Access Admin Dashboard" to log in.
                    </div>
                  )}
              </div>
            </Tabs>
            
            <div className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <Button
                className="w-full bg-black text-white hover:bg-gray-800 font-bold py-3 rounded-full"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : activeTab === 'admin' ? 'Access Admin Dashboard' : 'Sign In'}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-gray-600 text-sm">
                  Don't have an account?
                </p>
                <Button variant="link" className="text-black font-medium hover:text-gray-700 p-0" onClick={() => onNavigate('signup')}>
                  Create an account
                </Button>
              </div>

              <div className="text-center">
                <Button variant="link" className="text-gray-500 text-sm hover:text-black p-0">
                  Forgot your password?
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
