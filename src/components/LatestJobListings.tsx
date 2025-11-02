import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, ArrowRight } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  location: string;
  job_type: string;
}

export const LatestJobListings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetchLatestJobs();
  }, []);

  const fetchLatestJobs = async () => {
    const { data, error } = await supabase
      .from('career_jobs')
      .select('id, title, location, job_type')
      .eq('is_active', true)
      .order('posted_at', { ascending: false })
      .limit(3);

    if (!error && data) {
      setJobs(data);
    }
  };

  if (jobs.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Join Our Team
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore exciting career opportunities at MA Tailor
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {jobs.map((job) => (
            <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{job.title}</h3>
                  {job.location && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{job.location}</span>
                    </div>
                  )}
                </div>
              </div>
              {job.job_type && (
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize mb-4">
                  {job.job_type}
                </span>
              )}
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/career">
            <Button size="lg" className="group">
              View All Openings
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
