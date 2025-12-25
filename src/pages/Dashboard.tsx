import { useEffect, useState } from "react";
import { getCampaigns, getAggregateInsights } from "../services/api";
import StatCard from "../components/StatCard";
import CampaignTable from "../components/CampaignTable";
import Loader from "../components/Loader";

export default function Dashboard() {
    const [campaigns, setCampaigns] = useState([]);
    const [insights, setInsights] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setError(null);
                const [c, i] = await Promise.all([
                    getCampaigns(),
                    getAggregateInsights(),
                ]);

                setCampaigns(c.campaigns);
                setInsights(i.insights);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    if (loading) return <Loader />;
    if (error) {
        return <div className="text-red-600 p-6">{error}</div>;
    }


    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Campaign Dashboard</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Total Campaigns" value={insights.total_campaigns} />
                <StatCard title="Impressions" value={insights.total_impressions} />
                <StatCard title="Clicks" value={insights.total_clicks} />
                <StatCard title="Spend" value={`$${insights.total_spend}`} />
            </div>

            <CampaignTable campaigns={campaigns} />
        </div>
    );
}
