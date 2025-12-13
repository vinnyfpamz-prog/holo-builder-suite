-- Create storage buckets for portfolio items and video testimonials
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('testimonial-videos', 'testimonial-videos', true);

-- Portfolio categories table
CREATE TABLE public.portfolio_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Portfolio items table
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES public.portfolio_categories(id) ON DELETE SET NULL,
  image_url TEXT,
  video_url TEXT,
  external_link TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Video testimonials table
CREATE TABLE public.video_testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  client_name TEXT,
  client_role TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.portfolio_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_testimonials ENABLE ROW LEVEL SECURITY;

-- Public read access for portfolio (anyone can view)
CREATE POLICY "Portfolio categories are publicly viewable" 
ON public.portfolio_categories 
FOR SELECT 
USING (true);

CREATE POLICY "Portfolio items are publicly viewable" 
ON public.portfolio_items 
FOR SELECT 
USING (true);

CREATE POLICY "Published video testimonials are publicly viewable" 
ON public.video_testimonials 
FOR SELECT 
USING (is_published = true);

-- Storage policies for portfolio bucket
CREATE POLICY "Portfolio images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'portfolio');

CREATE POLICY "Portfolio images can be uploaded by authenticated users" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'portfolio');

CREATE POLICY "Portfolio images can be updated by authenticated users" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'portfolio');

CREATE POLICY "Portfolio images can be deleted by authenticated users" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'portfolio');

-- Storage policies for testimonial-videos bucket
CREATE POLICY "Testimonial videos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'testimonial-videos');

CREATE POLICY "Testimonial videos can be uploaded by authenticated users" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'testimonial-videos');

CREATE POLICY "Testimonial videos can be updated by authenticated users" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'testimonial-videos');

CREATE POLICY "Testimonial videos can be deleted by authenticated users" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'testimonial-videos');

-- Insert default portfolio categories
INSERT INTO public.portfolio_categories (name, slug, icon, description, display_order) VALUES
('Artes Digitais', 'digital', 'Palette', 'Artes para redes sociais, flyers e banners', 1),
('Impressos', 'impressos', 'Printer', 'Banners, cartões de visita e materiais gráficos', 2),
('Vídeos', 'video', 'Video', 'Edição de vídeos e conteúdo audiovisual', 3),
('Web', 'web', 'Globe', 'Sites, landing pages e portfólios', 4),
('Identidade Visual', 'identidade', 'PenTool', 'Logos e identidades visuais completas', 5),
('Projetos Especiais', 'especiais', 'Star', 'Projetos diferenciados e personalizados', 6);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for portfolio_items
CREATE TRIGGER update_portfolio_items_updated_at
BEFORE UPDATE ON public.portfolio_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();