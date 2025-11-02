import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Briefcase, MapPin, Clock, DollarSign, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  job_type: string;
  salary_range: string;
}

const Career = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    applicant_name: '',
    email: '',
    phone: '',
    cover_letter: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from('career_jobs')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching jobs:', error);
    } else {
      setJobs(data || []);
    }
  };

  const handleShare = (job: Job) => {
    const shareUrl = `${window.location.origin}/career`;
    const shareText = `Check out this job opportunity: ${job.title} at MA Tailor`;
    
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: shareText,
        url: shareUrl,
      }).catch(() => {
        copyToClipboard(shareUrl);
      });
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Link Copied",
      description: "Job link has been copied to clipboard!"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setIsSubmitting(true);

    const { error } = await supabase
      .from('job_applications')
      .insert({
        job_id: selectedJob.id,
        ...formData
      });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Application Submitted",
        description: "We'll review your application and get back to you soon!"
      });
      setFormData({ applicant_name: '', email: '', phone: '', cover_letter: '' });
      setSelectedJob(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <section className="py-16 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-4">
              Join Our Team
            </h1>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Be part of our creative journey. Explore exciting opportunities in fashion and tailoring.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            {jobs.length === 0 ? (
              <p className="text-center text-muted-foreground">No job openings at the moment. Check back soon!</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {jobs.map((job) => (
                  <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-playfair font-bold">{job.title}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleShare(job)}
                        className="shrink-0"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {job.location && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                      )}
                      {job.job_type && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span className="capitalize">{job.job_type}</span>
                        </div>
                      )}
                      {job.salary_range && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          <span>{job.salary_range}</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-4 space-y-3">
                      <div>
                        <h4 className="font-semibold mb-2">Description:</h4>
                        <p className="text-muted-foreground whitespace-pre-wrap">{job.description}</p>
                      </div>
                      
                      {job.requirements && (
                        <div>
                          <h4 className="font-semibold mb-2">Requirements:</h4>
                          <p className="text-muted-foreground whitespace-pre-wrap">{job.requirements}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => setSelectedJob(job)}
                        className="flex-1"
                      >
                        <Briefcase className="h-4 w-4 mr-2" />
                        Apply Now
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleShare(job)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {selectedJob && (
          <section className="py-16 bg-muted/20">
            <div className="container mx-auto px-4 max-w-2xl">
              <Card className="p-8">
                <h2 className="text-3xl font-playfair font-bold mb-2">Apply for {selectedJob.title}</h2>
                <p className="text-muted-foreground mb-6">Fill out the form below to submit your application</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="applicant_name">Full Name *</Label>
                    <Input
                      id="applicant_name"
                      value={formData.applicant_name}
                      onChange={(e) => setFormData({ ...formData, applicant_name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="cover_letter">Cover Letter</Label>
                    <Textarea
                      id="cover_letter"
                      value={formData.cover_letter}
                      onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                      placeholder="Tell us why you're interested in this position..."
                      rows={6}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setSelectedJob(null)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Career;
