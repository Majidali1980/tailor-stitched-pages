import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Notification {
  id: string;
  message: string;
  display_order: number;
  link_url?: string | null;
}


const NotificationBar = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data: section } = await supabase
          .from('homepage_sections')
          .select('is_visible')
          .eq('section_key', 'notification_bar')
          .maybeSingle();

        if (section && section.is_visible === false) {
          setNotifications([]);
          return;
        }

        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching notifications:', error);
          return;
        }

        setNotifications(data || []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);


  if (loading || notifications.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-gold py-3 overflow-hidden">
      <div className="animate-scroll whitespace-nowrap">
        <div className="inline-flex items-center space-x-12">
          {[...notifications, ...notifications].map((notification, index) => (
            <span
              key={`${notification.id}-${index}`}
              className="text-black font-montserrat font-semibold text-sm md:text-base"
            >
              {notification.message}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;
