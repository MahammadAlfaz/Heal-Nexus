import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, User, Stethoscope, Mail, Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: (userType: 'patient' | 'doctor') => void;
  onNavigate: (page: 'landing') => void;
}

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('patient');

  const handleLogin = () => {
    onLogin(activeTab as 'patient' | 'doctor');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-gray-600 hover:text-gray-900"
          onClick={() => onNavigate('landing')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="shadow-2xl border-0 rounded-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl text-gray-900">Welcome Back</CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to access your healthcare dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-100">
                <TabsTrigger 
                  value="patient" 
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <User className="w-4 h-4 mr-2" />
                  Patient
                </TabsTrigger>
                <TabsTrigger 
                  value="doctor"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Doctor
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="patient" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="patient-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="patient-email"
                      type="email"
                      placeholder="patient@example.com"
                      className="pl-10 rounded-xl border-gray-200 focus:border-primary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="patient-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="patient-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 rounded-xl border-gray-200 focus:border-primary"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="doctor" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="doctor-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="doctor-email"
                      type="email"
                      placeholder="doctor@hospital.com"
                      className="pl-10 rounded-xl border-gray-200 focus:border-primary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="doctor-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="doctor-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 rounded-xl border-gray-200 focus:border-primary"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="space-y-4">
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl"
                onClick={handleLogin}
              >
                Sign In
              </Button>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Don't have an account?
                </p>
                <Button variant="link" className="text-primary hover:text-primary/80 p-0">
                  Create an account
                </Button>
              </div>
              
              <div className="text-center">
                <Button variant="link" className="text-sm text-gray-500 hover:text-gray-700 p-0">
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