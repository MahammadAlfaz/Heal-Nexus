import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  ArrowLeft, 
  Users, 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Heart,
  Activity,
  Brain,
  Stethoscope,
  User,
  Calendar,
  Shield
} from 'lucide-react';

interface CommunitySupportProps {
  onNavigate: (page: string) => void;
  userType: 'patient' | 'doctor' | null;
}

export function CommunitySupport({ onNavigate, userType }: CommunitySupportProps) {
  const [activeGroup, setActiveGroup] = useState('diabetes');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const groups = [
    {
      id: 'diabetes',
      name: 'Diabetes Care',
      description: 'Support group for diabetes management and lifestyle tips',
      members: 2847,
      posts: 1243,
      icon: Activity,
      color: 'bg-blue-500'
    },
    {
      id: 'heart-health',
      name: 'Heart Health',
      description: 'Community for cardiovascular health and recovery',
      members: 1956,
      posts: 876,
      icon: Heart,
      color: 'bg-red-500'
    },
    {
      id: 'mental-health',
      name: 'Mental Health',
      description: 'Safe space for mental health support and discussions',
      members: 3421,
      posts: 1567,
      icon: Brain,
      color: 'bg-purple-500'
    },
    {
      id: 'general-wellness',
      name: 'General Wellness',
      description: 'Overall health, nutrition, and wellness tips',
      members: 4123,
      posts: 2134,
      icon: Stethoscope,
      color: 'bg-green-500'
    }
  ];

  const posts = [
    {
      id: 1,
      author: 'Priya S.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9ce0422?w=50&h=50&fit=crop&crop=face',
      timestamp: '2 hours ago',
      content: 'I\'ve been managing my diabetes for 5 years now. Here\'s a simple home remedy that really helps me: Having a glass of bitter gourd juice early morning on empty stomach. It naturally helps control blood sugar. Please consult your doctor before trying this!',
      likes: 23,
      replies: 8,
      isRemedy: true,
      verified: false,
      tags: ['Home Remedy', 'Blood Sugar', 'Natural']
    },
    {
      id: 2,
      author: 'Dr. Amit Kumar',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=50&h=50&fit=crop&crop=face',
      timestamp: '4 hours ago',
      content: 'Great question about HbA1c levels! For most adults with diabetes, the target is below 7%. However, this can vary based on age, health conditions, and other factors. Always discuss your individual target with your healthcare provider.',
      likes: 45,
      replies: 12,
      isRemedy: false,
      verified: true,
      tags: ['Doctor Advice', 'HbA1c', 'Target Levels']
    },
    {
      id: 3,
      author: 'Rajesh M.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      timestamp: '6 hours ago',
      content: 'Walking after meals has been a game changer for me! Just 10-15 minutes helps keep my blood sugar stable. Started this 3 months ago and my numbers have improved significantly. My doctor approved this routine too.',
      likes: 34,
      replies: 15,
      isRemedy: true,
      verified: false,
      tags: ['Exercise', 'Post-meal', 'Lifestyle']
    }
  ];

  const handlePostSubmit = () => {
    if (newPostContent.trim()) {
      alert('Post shared with the community! It will be reviewed by our moderators before being published.');
      setNewPostContent('');
      setShowNewPost(false);
    }
  };

  const currentGroup = groups.find(g => g.id === activeGroup);

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 pt-16 md:pt-0">
          <Button
            variant="ghost"
            onClick={() => onNavigate(userType === 'patient' ? 'patient-dashboard' : 'doctor-dashboard')}
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl text-gray-900">Community Support</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Connect with others, share experiences, and support each other on your health journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Groups Sidebar */}
          <div className="space-y-4 lg:space-y-6">
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  Support Groups
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                {groups.map((group) => (
                  <Button
                    key={group.id}
                    variant={activeGroup === group.id ? "default" : "ghost"}
                    className="w-full justify-start gap-2 sm:gap-3 rounded-xl py-4 sm:py-6 h-auto text-sm"
                    onClick={() => setActiveGroup(group.id)}
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 ${group.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <group.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-medium truncate">{group.name}</div>
                      <div className="text-xs opacity-70">{group.members} members</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-xl bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800 text-base sm:text-lg">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-yellow-700 text-xs sm:text-sm">
                <p>• Be respectful and supportive</p>
                <p>• Share experiences, not medical advice</p>
                <p>• Always consult doctors for treatment</p>
                <p>• Report inappropriate content</p>
                <p>• Protect your privacy</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Group Header */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${currentGroup?.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {currentGroup && <currentGroup.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl text-gray-900 mb-1">{currentGroup?.name}</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-3">{currentGroup?.description}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                        {currentGroup?.members} members
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {currentGroup?.posts} posts
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowNewPost(!showNewPost)}
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-xl text-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Share Experience</span>
                    <span className="sm:hidden">Share</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* New Post Form */}
            {showNewPost && (
              <Card className="border-0 shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle>Share Your Experience</CardTitle>
                  <CardDescription>
                    Share your health journey, tips, or ask questions to the community
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <AlertDescription className="text-orange-800">
                      <strong>Important:</strong> Share personal experiences only. Do not provide medical advice. 
                      All posts are reviewed by our medical team before publishing.
                    </AlertDescription>
                  </Alert>
                  
                  <Textarea
                    placeholder="Share your experience, ask a question, or provide support to others..."
                    className="min-h-32 rounded-xl"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  />
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={handlePostSubmit}
                      disabled={!newPostContent.trim()}
                      className="bg-primary hover:bg-primary/90 text-white rounded-xl"
                    >
                      Share with Community
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowNewPost(false)}
                      className="rounded-xl"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Search and Filter */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search posts in this group..."
                      className="pl-10 rounded-xl text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto rounded-xl text-sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            <div className="space-y-4 sm:space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="border-0 shadow-lg rounded-xl">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h4 className="font-medium text-gray-900 text-sm sm:text-base">{post.author}</h4>
                          {post.verified && (
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              <span className="hidden sm:inline">Verified Doctor</span>
                              <span className="sm:hidden">Verified</span>
                            </Badge>
                          )}
                          {post.isRemedy && !post.verified && (
                            <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                              <span className="hidden sm:inline">Home Remedy</span>
                              <span className="sm:hidden">Remedy</span>
                            </Badge>
                          )}
                          <span className="text-xs sm:text-sm text-gray-500">• {post.timestamp}</span>
                        </div>

                        {post.isRemedy && !post.verified && (
                          <Alert className="mb-4 border-yellow-200 bg-yellow-50">
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            <AlertDescription className="text-yellow-800 text-xs sm:text-sm">
                              This is a community tip, not professional medical advice. Please consult your doctor before trying.
                            </AlertDescription>
                          </Alert>
                        )}

                        <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">{post.content}</p>

                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-6">
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600 text-xs sm:text-sm px-2 sm:px-3">
                            <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Helpful ({post.likes})</span>
                            <span className="sm:hidden">({post.likes})</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600 text-xs sm:text-sm px-2 sm:px-3">
                            <ThumbsDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Not Helpful</span>
                            <span className="sm:hidden">No</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600 text-xs sm:text-sm px-2 sm:px-3">
                            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Reply ({post.replies})</span>
                            <span className="sm:hidden">({post.replies})</span>
                          </Button>
                          {post.isRemedy && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-gray-600 hover:text-primary text-xs sm:text-sm px-2 sm:px-3"
                              onClick={() => onNavigate('health-assistant')}
                            >
                              <Stethoscope className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">Ask Doctor</span>
                              <span className="sm:hidden">Ask</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" className="w-full sm:w-auto rounded-xl text-sm">
                Load More Posts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}