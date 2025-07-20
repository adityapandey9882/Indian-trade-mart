'use client';

import React, { useState } from 'react';

export default function VendorAnalytics() {
  const [timeRange, setTimeRange] = useState('month');

  const salesData = [
    { month: 'Jan', sales: 45000, orders: 120 },
    { month: 'Feb', sales: 52000, orders: 135 },
    { month: 'Mar', sales: 48000, orders: 128 },
    { month: 'Apr', sales: 61000, orders: 165 },
    { month: 'May', sales: 55000, orders: 148 },
    { month: 'Jun', sales: 67000, orders: 182 }
  ];

  const topProducts = [
    { name: 'Laptop Stand', sold: 245, revenue: 61250 },
    { name: 'Wireless Mouse', sold: 189, revenue: 37800 },
    { name: 'USB Hub', sold: 156, revenue: 46800 },
    { name: 'Phone Case', sold: 134, revenue: 26800 },
    { name: 'Wireless Earbuds', sold: 98, revenue: 49000 }
  ];

  const customerData = [
    { segment: 'New Customers', count: 45, percentage: 35 },
    { segment: 'Returning Customers', count: 78, percentage: 60 },
    { segment: 'VIP Customers', count: 7, percentage: 5 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600 mt-1">Track your business performance and insights</p>
        </div>
        
        <div className="flex gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            📊 Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Revenue</h3>
            <span className="text-2xl">💰</span>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-green-600">₹3,28,000</p>
            <p className="text-sm text-green-600">↗ +12.5% from last month</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Orders</h3>
            <span className="text-2xl">📦</span>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-blue-600">1,248</p>
            <p className="text-sm text-green-600">↗ +8.2% from last month</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Avg Order Value</h3>
            <span className="text-2xl">💳</span>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-purple-600">₹2,630</p>
            <p className="text-sm text-green-600">↗ +5.8% from last month</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Conversion Rate</h3>
            <span className="text-2xl">🎯</span>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-orange-600">3.8%</p>
            <p className="text-sm text-red-600">↘ -2.1% from last month</p>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm">Revenue</button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">Orders</button>
          </div>
        </div>
        
        {/* Simple Bar Chart */}
        <div className="space-y-4">
          {salesData.map((data, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-12 text-sm text-gray-600">{data.month}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                <div 
                  className="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${(data.sales / 70000) * 100}%` }}
                >
                  <span className="text-xs text-white font-medium">₹{data.sales.toLocaleString()}</span>
                </div>
              </div>
              <div className="w-16 text-sm text-gray-600 text-right">{data.orders} orders</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-700">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sold} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">₹{product.revenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Segments</h3>
          <div className="space-y-4">
            {customerData.map((segment, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{segment.segment}</span>
                  <span className="text-sm text-gray-600">{segment.count} customers</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-green-500' : 
                      index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${segment.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">{segment.percentage}% of total customers</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2">🔍</div>
            <div className="text-sm text-gray-600">Search Engines</div>
            <div className="text-lg font-bold text-gray-900">45%</div>
            <div className="text-xs text-green-600">↗ +5%</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2">📱</div>
            <div className="text-sm text-gray-600">Social Media</div>
            <div className="text-lg font-bold text-gray-900">28%</div>
            <div className="text-xs text-green-600">↗ +12%</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2">🔗</div>
            <div className="text-sm text-gray-600">Direct Traffic</div>
            <div className="text-lg font-bold text-gray-900">18%</div>
            <div className="text-xs text-red-600">↘ -3%</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2">📧</div>
            <div className="text-sm text-gray-600">Email Marketing</div>
            <div className="text-lg font-bold text-gray-900">9%</div>
            <div className="text-xs text-green-600">↗ +2%</div>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">📈 Growth Opportunities</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Your laptop accessories are trending - consider expanding this category
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Mobile phone cases show high demand - stock up for better sales
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                Consider offering bundle deals to increase average order value
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">⚠️ Areas for Improvement</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Conversion rate has dropped - review product descriptions
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Some products have low stock - update inventory levels
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Customer response time can be improved for better satisfaction
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
