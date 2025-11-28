# Promotional Banner A/B Testing

## Overview
The promotional banner system includes built-in A/B testing with automatic tracking of impressions, clicks, and dismissals. When multiple banners are active, one is randomly selected for each page load.

## Tracked Metrics

### Automatically Tracked
1. **Impressions** - Tracked when a banner is displayed to a user
2. **Clicks** - Tracked when user clicks the CTA button
3. **Dismissals** - Tracked when user closes the banner

### Manual Conversion Tracking
For conversion tracking, you need to call the tracking function at conversion points (e.g., after checkout, form submission, etc.).

## How to Track Conversions

Import the conversion tracking function:

```typescript
import { trackBannerConversion } from '@/hooks/useBannerAnalytics';
```

Call it when a conversion happens:

```typescript
// Example: After successful checkout
const handleCheckout = async () => {
  // Your checkout logic...
  
  // Track conversion for this goal
  await trackBannerConversion('checkout_completed');
};

// Example: After form submission
const handleFormSubmit = async () => {
  // Your form logic...
  
  await trackBannerConversion('contact_form_submitted');
};
```

## Analyzing Results

All metrics are stored in the `banner_analytics` table with the following fields:
- `banner_id` - Which banner variant was shown
- `event_type` - impression, click, dismissal, or conversion
- `session_id` - Unique session identifier
- `conversion_goal` - Name of the conversion goal (for conversions only)
- `created_at` - Timestamp of the event

### Sample Query to View Results

```sql
-- View click-through rate by banner
SELECT 
  pb.title,
  COUNT(CASE WHEN ba.event_type = 'impression' THEN 1 END) as impressions,
  COUNT(CASE WHEN ba.event_type = 'click' THEN 1 END) as clicks,
  ROUND(
    COUNT(CASE WHEN ba.event_type = 'click' THEN 1 END)::numeric / 
    NULLIF(COUNT(CASE WHEN ba.event_type = 'impression' THEN 1 END), 0) * 100, 
    2
  ) as ctr_percentage
FROM banner_analytics ba
JOIN promotional_banners pb ON pb.id = ba.banner_id
GROUP BY pb.id, pb.title
ORDER BY ctr_percentage DESC;

-- View conversion rate by banner
SELECT 
  pb.title,
  ba.conversion_goal,
  COUNT(CASE WHEN ba.event_type = 'impression' THEN 1 END) as impressions,
  COUNT(CASE WHEN ba.event_type = 'conversion' THEN 1 END) as conversions,
  ROUND(
    COUNT(CASE WHEN ba.event_type = 'conversion' THEN 1 END)::numeric / 
    NULLIF(COUNT(CASE WHEN ba.event_type = 'impression' THEN 1 END), 0) * 100, 
    2
  ) as conversion_rate
FROM banner_analytics ba
JOIN promotional_banners pb ON pb.id = ba.banner_id
WHERE ba.event_type IN ('impression', 'conversion')
GROUP BY pb.id, pb.title, ba.conversion_goal
ORDER BY conversion_rate DESC;
```

## How It Works

1. **Random Selection**: When multiple active banners exist, one is randomly selected per page load
2. **Session Tracking**: A unique session ID is generated and stored in sessionStorage
3. **Banner Memory**: The last viewed banner ID is stored for conversion attribution
4. **Automatic Events**: Impressions, clicks, and dismissals are tracked automatically
5. **Manual Conversions**: You call `trackBannerConversion()` at conversion points
