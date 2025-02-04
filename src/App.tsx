import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0Z" fill="url(#paint0_linear)" />
    <path d="M65 35L35 65M35 35L65 65" stroke="white" strokeWidth="8" strokeLinecap="round" />
    <defs>
      <linearGradient id="paint0_linear" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
  </svg>
);

type Deal = {
  product_name: string;
  title: string;
  savings: number;
  requiresNewSignup: boolean;
  aliases: string[];
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTools, setSelectedTools] = useState<Deal[]>([]);

  const deals: Deal[] = [
    {
      product_name: "AWS Activate",
      title: "20-50% off your monthly spend and up to $2,000 in credits",
      savings: 2000,
      requiresNewSignup: true,
      aliases: ["Amazon Web Services", "AWS"]
    },
    {
      product_name: "Notion",
      title: "6 months free on the Plus plan with Unlimited AI",
      savings: 96,
      requiresNewSignup: true,
      aliases: ["Notion App"]
    },
    {
      product_name: "Stripe",
      title: "Waived Stripe fees on your next $20,000 in payment processing",
      savings: 580,
      requiresNewSignup: false,
      aliases: ["Stripe Payments"]
    },
    {
      product_name: "HubSpot",
      title: "75% off for 1 year",
      savings: 4500,
      requiresNewSignup: true,
      aliases: ["Hubspot Marketing"]
    },
    {
      product_name: "Google Cloud",
      title: "$2,000 in credits for 2 years if you never raised funds",
      savings: 2000,
      requiresNewSignup: true,
      aliases: ["GCP", "Google Cloud Platform"]
    }
  ];

  const formatSavings = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleAddTool = (tool: Deal) => {
    if (!selectedTools.find(t => t.product_name === tool.product_name)) {
      setSelectedTools([...selectedTools, tool]);
    }
    setSearchTerm('');
  };

  const handleRemoveTool = (toolName: string) => {
    setSelectedTools(selectedTools.filter(tool => tool.product_name !== toolName));
  };

  const getSearchResults = () => {
    if (searchTerm.length < 2) return [];
    
    const searchTermLower = searchTerm.toLowerCase();
    return deals.filter(deal =>
      (deal.product_name.toLowerCase().includes(searchTermLower) ||
       deal.aliases.some(alias => alias.toLowerCase().includes(searchTermLower))) &&
      !selectedTools.find(tool => tool.product_name === deal.product_name)
    );
  };

  const getImmediateSavings = () => {
    return selectedTools
      .filter(tool => !tool.requiresNewSignup)
      .reduce((sum, tool) => sum + tool.savings, 0);
  };

  const getNewUserSavings = () => {
    return selectedTools
      .filter(tool => tool.requiresNewSignup)
      .reduce((sum, tool) => sum + tool.savings, 0);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <Logo />
            <h1 className="text-3xl font-bold ml-3 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-transparent bg-clip-text">
              StartupStage
            </h1>
          </div>
          <p className="text-gray-400">
            Find out how much you could save with startup deals
          </p>
        </div>

        <div className="bg-[#111111] rounded-xl p-6 shadow-xl border border-gray-800">
          {/* Search */}
          <div className="relative mb-6">
            <div className="flex items-center bg-[#1A1A1A] border border-gray-800 rounded-lg p-3">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for tools (e.g., AWS, Stripe)..."
                className="w-full bg-transparent outline-none text-white placeholder-gray-500"
              />
            </div>
            {searchTerm.length >= 2 && (
              <div className="absolute w-full mt-2 bg-[#1A1A1A] border border-gray-800 rounded-lg shadow-xl z-10">
                {getSearchResults().length > 0 ? (
                  getSearchResults().map(tool => (
                    <div
                      key={tool.product_name}
                      onClick={() => handleAddTool(tool)}
                      className="p-4 hover:bg-[#222222] cursor-pointer border-b border-gray-800 last:border-b-0"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-white">{tool.product_name}</div>
                          <div className="text-sm text-gray-400 mt-1">{tool.title}</div>
                          <div className="mt-2">
                            <span className="text-sm font-medium text-[#8B5CF6]">
                              Save {formatSavings(tool.savings)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-sm text-gray-400">
                    No matches found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Selected Tools */}
          <div className="space-y-4 mb-6">
            {selectedTools.map(tool => (
              <div
                key={tool.product_name}
                className="flex justify-between items-start p-4 bg-[#1A1A1A] rounded-lg border border-gray-800"
              >
                <div>
                  <div className="font-medium text-white">{tool.product_name}</div>
                  <div className="text-sm text-gray-400 mt-1">{tool.title}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-[#8B5CF6]">
                    {formatSavings(tool.savings)}
                  </span>
                  <button
                    onClick={() => handleRemoveTool(tool.product_name)}
                    className="text-gray-500 hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          {selectedTools.length > 0 && (
            <div className="border-t border-gray-800 pt-6">
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                {getImmediateSavings() > 0 && (
                  <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#8B5CF6]">
                    <h3 className="text-sm font-medium text-[#8B5CF6]">Available Now</h3>
                    <p className="text-2xl font-bold text-white mt-1">
                      {formatSavings(getImmediateSavings())}
                    </p>
                  </div>
                )}
                
                {getNewUserSavings() > 0 && (
                  <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#6366F1]">
                    <h3 className="text-sm font-medium text-[#6366F1]">New User Savings</h3>
                    <p className="text-2xl font-bold text-white mt-1">
                      {formatSavings(getNewUserSavings())}
                    </p>
                  </div>
                )}
              </div>

              <div className="text-center">
                <h3 className="text-lg font-medium text-white">
                  Total Potential Savings
                </h3>
                <p className="text-3xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-transparent bg-clip-text mt-2">
                  {formatSavings(getImmediateSavings() + getNewUserSavings())}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  With {selectedTools.length} selected tools
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;