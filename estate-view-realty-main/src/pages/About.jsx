import { Users, Award, Building, Target, Heart, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';


const About = () => {
  const navigate = useNavigate();
  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We prioritize our customers\' needs and satisfaction above everything else.'
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We believe in honest, transparent dealings with verified property information.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every service we provide to our clients.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'We continuously innovate to make real estate accessible and simple.'
    }
  ];

  const team = [
    {
      name: 'Nidhi Patel',
      role: 'CEO & Founder',
      experience: '15+ years',
      avatar: 'NP'
    },
    {
      name: 'Kashish Desai',
      role: 'Head of Sales',
      experience: '12+ years',
      avatar: 'KD'
    },
    {
      name: 'Nency Shah',
      role: 'Technology Lead',
      experience: '10+ years',
      avatar: 'NS'
    },
    {
      name: 'Khushi Suthar',
      role: 'Customer Success',
      experience: '8+ years',
      avatar: 'KS'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Properties Listed' },
    { number: '5,000+', label: 'Happy Families' },
    { number: '50+', label: 'Cities Covered' },
    { number: '15+', label: 'Years Experience' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Nivaas360
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to make real estate simple, transparent, and accessible for everyone. 
              With over 15 years of experience, we've helped thousands of families find their dream homes.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2009, Nivaas360 started as a small real estate consultancy with a simple vision: 
                    to make property buying and selling transparent, efficient, and stress-free for everyone.
                  </p>
                  <p>
                    What began as a team of three passionate real estate professionals has now grown into 
                    one of India's most trusted property platforms, serving over 50 cities and helping 
                    thousands of families find their perfect homes.
                  </p>
                  <p>
                    Today, we leverage cutting-edge technology to provide comprehensive real estate solutions, 
                    from property discovery to legal assistance, making us your one-stop destination for 
                    all real estate needs.
                  </p>
                </div>
                <Button className="mt-6" size="lg">
                  Join Our Journey
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 shadow-card text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These values guide everything we do and shape how we serve our customers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-card text-center hover:shadow-card-hover transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our experienced team of Nivaas360 professionals is here to help you every step of the way
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-card text-center hover:shadow-card-hover transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4">
                    {member.avatar}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary mb-2">
                    {member.role}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {member.experience} experience
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="text-center lg:text-left">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4 mx-auto lg:mx-0">
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To revolutionize the real estate industry by providing transparent, efficient, 
                  and customer-centric property solutions that make finding your perfect home 
                  a delightful experience.
                </p>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4 mx-auto lg:mx-0">
                  <Building className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To be India's most trusted and innovative real estate platform, where every 
                  property transaction is seamless, secure, and satisfying for all parties involved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of happy families who found their perfect property with us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
             
              <Button
                variant="outline"
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;