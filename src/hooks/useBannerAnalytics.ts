import { supabase } from '@/integrations/supabase/client';

// Generate or retrieve session ID from sessionStorage
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('banner_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('banner_session_id', sessionId);
  }
  return sessionId;
};

export const useBannerAnalytics = () => {
  const trackEvent = async (
    bannerId: string,
    eventType: 'impression' | 'click' | 'dismissal' | 'conversion',
    conversionGoal?: string
  ) => {
    try {
      const sessionId = getSessionId();
      
      await supabase.from('banner_analytics').insert({
        banner_id: bannerId,
        event_type: eventType,
        session_id: sessionId,
        conversion_goal: conversionGoal || null,
      });
    } catch (error) {
      console.error('Failed to track banner event:', error);
    }
  };

  return { trackEvent };
};

// Standalone function for conversion tracking that can be called anywhere
export const trackBannerConversion = async (conversionGoal: string) => {
  try {
    const sessionId = sessionStorage.getItem('banner_session_id');
    const lastSeenBannerId = sessionStorage.getItem('last_banner_id');
    
    if (!lastSeenBannerId) {
      console.warn('No banner was seen in this session, skipping conversion tracking');
      return;
    }

    await supabase.from('banner_analytics').insert({
      banner_id: lastSeenBannerId,
      event_type: 'conversion',
      session_id: sessionId,
      conversion_goal: conversionGoal,
    });
  } catch (error) {
    console.error('Failed to track banner conversion:', error);
  }
};
