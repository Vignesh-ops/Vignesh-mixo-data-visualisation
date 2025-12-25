import { useState } from "react";
import type { Campaign } from "../types/campaign";
import CampaignDetailsModal from "./CampaignDetailsModal";

type Props = {
    campaigns: Campaign[];
};
type Campmodal = {
    id: string | null,
    title: string | null
}

export default function CampaignTable({ campaigns }: Props) {
    const [selectedCampaignId, setSelectedCampaignId] = useState<Campmodal>({ id: null, title: null });

    const statusColors: Record<Campaign["status"], string> = {
        active: "green",
        paused: "yellow",
        completed: "blue",
      };
      

    return (
        <>
            <table className="w-full border mt-6">
                <thead>
                    <tr className="text-gray-500 bg-gray-100">
                        <th className="p-2">Name</th>
                        <th>Status</th>
                        <th>Platforms</th>
                        <th>Budget</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {campaigns.map((campaign) => (
                        <tr key={campaign?.id} className="border-t text-center">
                            <td className="p-2">{campaign?.name}</td>
                            <td className="p-2">{campaign?.status} {<span style={{ fontSize: '0.8rem', color: `${statusColors[campaign?.status]}` }}>🎯</span>}</td>
                            <td className="p-2">{campaign?.platforms.join(", ")}</td>
                            <td className="p-2">${campaign?.budget}</td>

                            <td className="p-2" style={{ verticalAlign: 'middle' }}>
                                <button
                                    onClick={() => setSelectedCampaignId((prev) => {
                                        return { ...prev, id: campaign.id, title: campaign.name }
                                    })}
                                    className="text-grey-600 text-center"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >


            {
                selectedCampaignId.id && (
                    <CampaignDetailsModal
                        campaignTitle={selectedCampaignId?.title}
                        campaignId={selectedCampaignId.id}
                        onClose={() => setSelectedCampaignId((prev) => { return { ...prev, id: null, title: null } })}
                    />
                )
            }
        </>
    );
}
