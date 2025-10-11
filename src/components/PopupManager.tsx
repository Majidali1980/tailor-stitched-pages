import { useState, useEffect } from 'react';
import { WelcomePopup } from './popups/WelcomePopup';
import { DesignSuggestionPopup } from './popups/DesignSuggestionPopup';
import { DiscountOfferPopup } from './popups/DiscountOfferPopup';
import { MeasurementReminderPopup } from './popups/MeasurementReminderPopup';
import { FeedbackPopup } from './popups/FeedbackPopup';
import { OccasionPopup } from './popups/OccasionPopup';
import { CallbackPopup } from './popups/CallbackPopup';
import { CartValuePopup } from './popups/CartValuePopup';
import { ExitIntentPopup } from './popups/ExitIntentPopup';
import { useLocation } from 'react-router-dom';

export type PopupType = 
  | 'welcome' 
  | 'design-suggestion' 
  | 'discount-offer' 
  | 'measurement-reminder'
  | 'feedback'
  | 'occasion'
  | 'callback'
  | 'cart-value'
  | 'exit-intent';

const PopupManager = () => {
  const [activePopup, setActivePopup] = useState<PopupType | null>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if first visit
    const hasVisited = localStorage.getItem('ma_tailor_visited');
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('ma_tailor_visited', 'true');
      setTimeout(() => setActivePopup('welcome'), 2000);
    }

    // Set last active time
    localStorage.setItem('ma_tailor_last_active', Date.now().toString());

    // Idle timer for callback popup (30 seconds)
    let idleTimer: NodeJS.Timeout;
    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (!activePopup) setActivePopup('callback');
      }, 30000);
    };

    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keypress', resetIdleTimer);
    resetIdleTimer();

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !activePopup) {
        setActivePopup('exit-intent');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keypress', resetIdleTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activePopup]);

  useEffect(() => {
    // Route-specific popups
    if (location.pathname === '/gallery') {
      setTimeout(() => {
        if (!activePopup && !isFirstVisit) setActivePopup('design-suggestion');
      }, 5000);
    }

    if (location.pathname === '/booking') {
      setTimeout(() => {
        if (!activePopup && !isFirstVisit) setActivePopup('discount-offer');
      }, 8000);
    }

    // Returning visitor feedback (after 3 visits)
    const visitCount = parseInt(localStorage.getItem('ma_tailor_visit_count') || '0') + 1;
    localStorage.setItem('ma_tailor_visit_count', visitCount.toString());
    
    if (visitCount === 3 && !isFirstVisit) {
      setTimeout(() => {
        if (!activePopup) setActivePopup('feedback');
      }, 10000);
    }

    // Seasonal occasion popup (check if not shown today)
    const lastOccasionPopup = localStorage.getItem('ma_tailor_last_occasion_popup');
    const today = new Date().toDateString();
    if (lastOccasionPopup !== today && !isFirstVisit) {
      setTimeout(() => {
        if (!activePopup) {
          setActivePopup('occasion');
          localStorage.setItem('ma_tailor_last_occasion_popup', today);
        }
      }, 15000);
    }
  }, [location.pathname, activePopup, isFirstVisit]);

  const handleClose = () => {
    setActivePopup(null);
  };

  return (
    <>
      {activePopup === 'welcome' && <WelcomePopup onClose={handleClose} />}
      {activePopup === 'design-suggestion' && <DesignSuggestionPopup onClose={handleClose} />}
      {activePopup === 'discount-offer' && <DiscountOfferPopup onClose={handleClose} />}
      {activePopup === 'measurement-reminder' && <MeasurementReminderPopup onClose={handleClose} />}
      {activePopup === 'feedback' && <FeedbackPopup onClose={handleClose} />}
      {activePopup === 'occasion' && <OccasionPopup onClose={handleClose} />}
      {activePopup === 'callback' && <CallbackPopup onClose={handleClose} />}
      {activePopup === 'cart-value' && <CartValuePopup onClose={handleClose} />}
      {activePopup === 'exit-intent' && <ExitIntentPopup onClose={handleClose} />}
    </>
  );
};

export default PopupManager;
