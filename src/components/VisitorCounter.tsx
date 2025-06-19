
import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

const VisitorCounter = () => {
  const [visitors, setVisitors] = useState<number>(0);
  const [onlineNow, setOnlineNow] = useState<number>(0);

  useEffect(() => {
    // Generate a realistic starting number based on current time
    const baseVisitors = 1250 + Math.floor(Math.random() * 500);
    const baseOnline = 3 + Math.floor(Math.random() * 8);
    
    setVisitors(baseVisitors);
    setOnlineNow(baseOnline);

    // Simulate real-time visitor updates
    const interval = setInterval(() => {
      // Randomly increment visitors (0-3 new visitors every 10 seconds)
      const newVisitors = Math.floor(Math.random() * 4);
      if (newVisitors > 0) {
        setVisitors(prev => prev + newVisitors);
      }

      // Fluctuate online users (±1-2 users)
      const onlineChange = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2
      setOnlineNow(prev => Math.max(1, prev + onlineChange));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gold/20">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Eye className="h-5 w-5 text-gold" />
        <h4 className="font-playfair font-bold text-gold">Live Visitor Stats</h4>
      </div>
      
      <div className="text-center space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-montserrat text-gray-300 text-sm">Total Visitors:</span>
          <span className="font-montserrat text-white font-bold">{visitors.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-montserrat text-gray-300 text-sm">Online Now:</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-montserrat text-green-400 font-bold">{onlineNow}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;
