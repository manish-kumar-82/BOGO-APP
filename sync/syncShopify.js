const Campaign = require("../models/campaign");
const shopify = require("../shopify/shopify");

const syncShopifyCampaigns = async () => {
  try {
    const shopifyCampaigns = await shopify.priceRule.list();

    for (const campaign of shopifyCampaigns) {
      await Campaign.findOneAndUpdate(
        { name: campaign.title },
        {
          name: campaign.title,
          getY: {
            discountType: "percentage",
            discountValue: Math.abs(campaign.value),
          },
          startDate: campaign.starts_at,
          endDate: campaign.ends_at,
        },
        { upsert: true, new: true }
      );
    }
    console.log("Campaigns Synced Successfully");
  } catch (error) {
    console.error("Sync Error:", error);
  }
};

// Run sync every 1 hour
setInterval(syncShopifyCampaigns, 3600000);
