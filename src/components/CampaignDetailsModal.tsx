import { useEffect, useState } from "react";
import { getCampaignInsights } from "../services/api";

type Props = {
    campaignTitle:string
    campaignId: string;
    onClose: () => void;
};

export default function CampaignDetailsModal({campaignTitle, campaignId, onClose }: Props) {
    const [insights, setInsights] = useState<any>(null);

    useEffect(() => {
        getCampaignInsights(campaignId).then((res) =>
            setInsights(res.insights)
        );

        const es = new EventSource(
            `https://mixo-fe-backend-task.vercel.app/campaigns/${campaignId}/insights/stream`
        );

        es.onmessage = (event) => {
            setInsights(JSON.parse(event.data));
        };

        return () => es.close();
    }, [campaignId]);

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[500px] rounded-lg p-6 relative">

                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-xl"
                >
                    ✖
                </button>

                <div>
                    <h2 className="text-lg text-gray-900 font-bold mb-4">
                    {campaignTitle}
                    </h2>

                    <ul className="space-y-2 text-gray-500">
                        <li>Impressions: {insights?.impressions ?? "please wait..."}</li>
                        <li>Clicks: {insights?.clicks ?? "please wait..."}</li>
                        <li>Conversions: {insights?.conversions ?? "please wait..."}</li>
                        <li>Spend: {insights?.spend ? `$${insights.spend}` : "please wait..."}</li>
                        <li>CTR: {insights?.ctr ? `${insights.ctr}%` : "please wait..."}</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}
