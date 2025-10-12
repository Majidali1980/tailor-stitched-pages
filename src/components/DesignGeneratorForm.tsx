import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Loader2, Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const DesignGeneratorForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string>('');
  
  const [formData, setFormData] = useState({
    dressType: '',
    fabricType: '',
    neckDesign: '',
    sleeveDesign: '',
    bottomStyle: '',
    additionalNotes: ''
  });

  const handleGenerate = async () => {
    if (!formData.dressType || !formData.fabricType) {
      toast({
        title: "Missing Information",
        description: "Please select at least dress type and fabric type.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-design', {
        body: formData
      });

      if (error) throw error;

      setGeneratedImage(data.image);
      setSuggestions(data.suggestions);
      
      toast({
        title: "Design Generated!",
        description: "Your custom design has been created successfully."
      });
    } catch (error: any) {
      console.error('Error generating design:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate design. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `ma-tailor-design-${Date.now()}.png`;
    link.click();
  };

  const handleShare = async () => {
    if (!generatedImage) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Custom Design - MA Tailor',
          text: 'Check out my custom design from MA Tailor AI Design Studio!',
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Design link copied to clipboard!"
      });
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="p-6 space-y-6 bg-card/50 backdrop-blur">
        <h3 className="text-2xl font-playfair font-bold">Design Your Perfect Dress</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="dressType">Dress Type *</Label>
            <Select value={formData.dressType} onValueChange={(value) => setFormData({...formData, dressType: value})}>
              <SelectTrigger id="dressType">
                <SelectValue placeholder="Select dress type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Shalwar Kameez">Shalwar Kameez</SelectItem>
                <SelectItem value="Maxi">Maxi</SelectItem>
                <SelectItem value="Frock">Frock</SelectItem>
                <SelectItem value="Saree">Saree</SelectItem>
                <SelectItem value="Lehenga">Lehenga</SelectItem>
                <SelectItem value="Anarkali">Anarkali</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="fabricType">Fabric Type *</Label>
            <Select value={formData.fabricType} onValueChange={(value) => setFormData({...formData, fabricType: value})}>
              <SelectTrigger id="fabricType">
                <SelectValue placeholder="Select fabric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Silk">Silk</SelectItem>
                <SelectItem value="Cotton">Cotton</SelectItem>
                <SelectItem value="Chiffon">Chiffon</SelectItem>
                <SelectItem value="Lawn">Lawn</SelectItem>
                <SelectItem value="Organza">Organza</SelectItem>
                <SelectItem value="Velvet">Velvet</SelectItem>
                <SelectItem value="Georgette">Georgette</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="neckDesign">Neck Design</Label>
            <Select value={formData.neckDesign} onValueChange={(value) => setFormData({...formData, neckDesign: value})}>
              <SelectTrigger id="neckDesign">
                <SelectValue placeholder="Select neck design" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Round Neck">Round Neck</SelectItem>
                <SelectItem value="V-Neck">V-Neck</SelectItem>
                <SelectItem value="Boat Neck">Boat Neck</SelectItem>
                <SelectItem value="Square Neck">Square Neck</SelectItem>
                <SelectItem value="Sweetheart">Sweetheart</SelectItem>
                <SelectItem value="High Neck">High Neck</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="sleeveDesign">Sleeve Design</Label>
            <Select value={formData.sleeveDesign} onValueChange={(value) => setFormData({...formData, sleeveDesign: value})}>
              <SelectTrigger id="sleeveDesign">
                <SelectValue placeholder="Select sleeve design" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full Sleeves">Full Sleeves</SelectItem>
                <SelectItem value="Half Sleeves">Half Sleeves</SelectItem>
                <SelectItem value="3/4 Sleeves">3/4 Sleeves</SelectItem>
                <SelectItem value="Cap Sleeves">Cap Sleeves</SelectItem>
                <SelectItem value="Sleeveless">Sleeveless</SelectItem>
                <SelectItem value="Bell Sleeves">Bell Sleeves</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="bottomStyle">Bottom Style</Label>
            <Select value={formData.bottomStyle} onValueChange={(value) => setFormData({...formData, bottomStyle: value})}>
              <SelectTrigger id="bottomStyle">
                <SelectValue placeholder="Select bottom style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Trouser">Trouser</SelectItem>
                <SelectItem value="Sharara">Sharara</SelectItem>
                <SelectItem value="Gharara">Gharara</SelectItem>
                <SelectItem value="Palazzo">Palazzo</SelectItem>
                <SelectItem value="Straight Pants">Straight Pants</SelectItem>
                <SelectItem value="Cigarette Pants">Cigarette Pants</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="additionalNotes">Additional Notes / Inspirations</Label>
            <Textarea
              id="additionalNotes"
              placeholder="Describe any specific embroidery, colors, or design elements you'd like..."
              value={formData.additionalNotes}
              onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
              rows={4}
            />
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Design...
              </>
            ) : (
              'Generate AI Design'
            )}
          </Button>
        </div>
      </Card>

      <Card className="p-6 space-y-4 bg-card/50 backdrop-blur">
        <h3 className="text-2xl font-playfair font-bold">Your Design Preview</h3>
        
        {!generatedImage ? (
          <div className="h-[500px] flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed">
            <p className="text-muted-foreground text-center">
              Your AI-generated design<br />will appear here
            </p>
          </div>
        ) : (
          <>
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={generatedImage} 
                alt="Generated Design" 
                className="w-full h-auto"
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleDownload} variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button onClick={handleShare} variant="outline" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>

            {suggestions && (
              <div className="p-4 bg-primary/5 rounded-lg">
                <h4 className="font-semibold mb-2">Styling Suggestions</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{suggestions}</p>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};