export interface Campaign {
    id: string;
    name: string;
    status: string;
    platform: string;
    budget: number;
  }
  
  export interface AggregateInsights {
    total_campaigns: number;
    active_campaigns: number;
    paused_campaigns: number;
    completed_campaigns: number;
    total_impressions: number;
    total_clicks: number;
    total_conversions: number;
    total_spend: number;
    avg_ctr: number;
    avg_cpc: number;
    avg_conversion_rate: number;
  }
  
  export interface CampaignInsights {
    campaign_id: string;
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
    ctr: number;
    cpc: number;
    conversion_rate: number;
  }
  