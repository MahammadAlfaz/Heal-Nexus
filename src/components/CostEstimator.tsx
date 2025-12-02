import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  Calculator, 
  Search,
  CreditCard,
  MapPin,
  Star,
  TrendingUp,
  TrendingDown,
  Info,
  CheckCircle,
  Hospital,
  Calendar
} from 'lucide-react';

interface CostEstimatorProps {
  onNavigate: (page: string) => void;
  userType: 'patient' | 'doctor' | null;
}

export function CostEstimator({ onNavigate, userType }: CostEstimatorProps) {
  const [selectedProcedure, setSelectedProcedure] = useState('');
  const [selectedHealthCard, setSelectedHealthCard] = useState('none');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const procedures = [
    {
      name: 'MRI Scan (Brain)',
      category: 'Diagnostic',
      avgCost: 8500
    },
    {
      name: 'CT Scan (Chest)',
      category: 'Diagnostic',
      avgCost: 4500
    },
    {
      name: 'Blood Test Package (Complete)',
      category: 'Lab Test',
      avgCost: 1500
    },
    {
      name: 'ECG',
      category: 'Diagnostic',
      avgCost: 300
    },
    {
      name: 'Ultrasound (Abdomen)',
      category: 'Diagnostic',
      avgCost: 1200
    },
    {
      name: 'Angioplasty',
      category: 'Surgery',
      avgCost: 350000
    },
    {
      name: 'Cataract Surgery',
      category: 'Surgery',
      avgCost: 45000
    },
    {
      name: 'Appendectomy',
      category: 'Surgery',
      avgCost: 65000
    }
  ];

  const healthCards = [
    'ABHA (Ayushman Bharat Health Account)',
    'Ayushman Bharat PM-JAY',
    'CGHS (Central Government Health Scheme)',
    'ESI (Employee State Insurance)',
    'Karnataka State Health Insurance',
    'Private Health Insurance'
  ];

  const mockResults = [
    {
      id: 1,
      hospitalName: 'Apollo Hospitals',
      location: 'Bannerghatta Road',
      rating: 4.8,
      baseCost: 8500,
      coveredAmount: 6000,
      patientPayment: 2500,
      savings: 6000,
      acceptsCard: true,
      distance: '2.1 km'
    },
    {
      id: 2,
      hospitalName: 'Manipal Hospital',
      location: 'HAL Airport Road',
      rating: 4.6,
      baseCost: 7800,
      coveredAmount: 5500,
      patientPayment: 2300,
      savings: 5500,
      acceptsCard: true,
      distance: '3.5 km'
    },
    {
      id: 3,
      hospitalName: 'Fortis Hospital',
      location: 'Cunningham Road',
      rating: 4.5,
      baseCost: 9200,
      coveredAmount: 7000,
      patientPayment: 2200,
      savings: 7000,
      acceptsCard: true,
      distance: '4.2 km'
    },
    {
      id: 4,
      hospitalName: 'Private Clinic',
      location: 'Koramangala',
      rating: 4.2,
      baseCost: 6500,
      coveredAmount: 0,
      patientPayment: 6500,
      savings: 0,
      acceptsCard: false,
      distance: '1.8 km'
    }
  ];

  const handleSearch = () => {
    if (selectedProcedure) {
      setResults(mockResults);
      setShowResults(true);
    }
  };

  const filteredProcedures = procedures.filter(proc =>
    proc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate(userType === 'patient' ? 'patient-dashboard' : 'doctor-dashboard')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl text-gray-900">Healthcare Cost Estimator</h1>
          <p className="text-gray-600">
            Get transparent pricing and insurance coverage information for medical procedures
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Form */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Cost Calculator
                </CardTitle>
                <CardDescription>
                  Select procedure and health card to get estimates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-900 mb-3 block">
                    Search Procedure
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Type procedure name..."
                      className="pl-10 rounded-xl"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {searchQuery && (
                    <div className="mt-2 space-y-1">
                      {filteredProcedures.slice(0, 5).map((proc, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedProcedure(proc.name);
                            setSearchQuery(proc.name);
                          }}
                          className="w-full justify-start text-left p-2 rounded-lg"
                        >
                          <div>
                            <div className="font-medium">{proc.name}</div>
                            <div className="text-xs text-gray-500">
                              {proc.category} • Avg: ₹{proc.avgCost.toLocaleString()}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 mb-3 block">
                    Health Card / Insurance
                  </label>
                  <Select value={selectedHealthCard} onValueChange={setSelectedHealthCard}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select your health card" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No insurance / Self-pay</SelectItem>
                      {healthCards.map((card) => (
                        <SelectItem key={card} value={card}>
                          {card}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleSearch}
                  disabled={!selectedProcedure}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Get Cost Estimates
                </Button>
              </CardContent>
            </Card>

            {/* Popular Procedures */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Popular Procedures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {procedures.slice(0, 6).map((proc, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedProcedure(proc.name);
                        setSearchQuery(proc.name);
                      }}
                      className="w-full justify-between text-left p-3 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-sm">{proc.name}</div>
                        <div className="text-xs text-gray-500">{proc.category}</div>
                      </div>
                      <div className="text-sm text-primary font-medium">
                        ₹{proc.avgCost.toLocaleString()}
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {!showResults ? (
              <Card className="border-0 shadow-lg rounded-xl">
                <CardContent className="p-12 text-center">
                  <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl text-gray-900 mb-2">Select a Procedure</h3>
                  <p className="text-gray-600">
                    Choose a medical procedure to see cost estimates from different hospitals
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Summary */}
                <Card className="border-0 shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle>Cost Estimates for {selectedProcedure}</CardTitle>
                    {selectedHealthCard && (
                      <CardDescription className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Coverage: {selectedHealthCard}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <div className="text-2xl font-semibold text-blue-700">₹{results[0]?.baseCost.toLocaleString()}</div>
                        <div className="text-sm text-blue-600">Average Cost</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-xl">
                        <div className="text-2xl font-semibold text-green-700">₹{results[0]?.coveredAmount.toLocaleString()}</div>
                        <div className="text-sm text-green-600">Insurance Coverage</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-xl">
                        <div className="text-2xl font-semibold text-orange-700">₹{results[0]?.patientPayment.toLocaleString()}</div>
                        <div className="text-sm text-orange-600">You Pay</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-xl">
                        <div className="text-2xl font-semibold text-purple-700">₹{results[0]?.savings.toLocaleString()}</div>
                        <div className="text-sm text-purple-600">You Save</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Hospital Comparison */}
                <Card className="border-0 shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle>Hospital Cost Comparison</CardTitle>
                    <CardDescription>Compare costs and coverage across different hospitals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {results.map((hospital, index) => (
                        <div 
                          key={hospital.id}
                          className={`p-4 border-2 rounded-xl ${
                            hospital.acceptsCard 
                              ? 'border-green-200 bg-green-50' 
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-medium text-gray-900">{hospital.hospitalName}</h3>
                                {hospital.acceptsCard && (
                                  <Badge className="bg-green-100 text-green-700 border-green-200">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Card Accepted
                                  </Badge>
                                )}
                                {index === 0 && (
                                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                                    Best Value
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {hospital.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  {hospital.rating}
                                </div>
                                <div>{hospital.distance}</div>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                  <div className="text-lg font-semibold text-gray-900">
                                    ₹{hospital.baseCost.toLocaleString()}
                                  </div>
                                  <div className="text-xs text-gray-600">Total Cost</div>
                                </div>

                                <div>
                                  <div className="text-lg font-semibold text-green-700">
                                    ₹{hospital.coveredAmount.toLocaleString()}
                                  </div>
                                  <div className="text-xs text-green-600">Covered</div>
                                </div>

                                <div>
                                  <div className="text-lg font-semibold text-orange-700">
                                    ₹{hospital.patientPayment.toLocaleString()}
                                  </div>
                                  <div className="text-xs text-orange-600">You Pay</div>
                                </div>

                                <div>
                                  <div className="text-lg font-semibold text-purple-700">
                                    ₹{hospital.savings.toLocaleString()}
                                  </div>
                                  <div className="text-xs text-purple-600">You Save</div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Button 
                                size="sm"
                                onClick={() => onNavigate('appointment-booking')}
                                className="bg-primary hover:bg-primary/90 text-white rounded-lg"
                              >
                                <Calendar className="w-4 h-4 mr-1" />
                                Book Appointment
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => onNavigate('hospital-finder')}
                                className="rounded-lg"
                              >
                                <Hospital className="w-4 h-4 mr-1" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Cost Breakdown */}
                <Card className="border-0 shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle>Detailed Cost Breakdown</CardTitle>
                    <CardDescription>Understanding the components of your medical bill</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Procedure Cost</span>
                        <span className="font-medium">₹6,500</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Doctor's Fee</span>
                        <span className="font-medium">₹1,200</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Hospital Charges</span>
                        <span className="font-medium">₹800</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center text-lg font-semibold">
                          <span>Total Cost</span>
                          <span>₹8,500</span>
                        </div>
                        <div className="flex justify-between items-center text-green-700 mt-1">
                          <span>Insurance Coverage (70%)</span>
                          <span>-₹5,950</span>
                        </div>
                        <div className="flex justify-between items-center text-xl font-bold text-primary mt-2 pt-2 border-t">
                          <span>You Pay</span>
                          <span>₹2,550</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Information Card */}
            <Card className="border-0 shadow-lg rounded-xl bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Important Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-blue-700">
                <p className="text-sm">• Prices are estimates and may vary based on individual cases</p>
                <p className="text-sm">• Insurance coverage depends on policy terms and conditions</p>
                <p className="text-sm">• Additional costs may apply for complications or extended care</p>
                <p className="text-sm">• Always confirm pricing directly with the hospital before treatment</p>
                <p className="text-sm">• Emergency procedures may have different pricing structures</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}