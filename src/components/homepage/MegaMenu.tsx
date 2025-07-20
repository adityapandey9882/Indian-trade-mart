'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { categoryAPI, Category } from '@/lib/categoryApi';
import { productAPI, Product } from '@/lib/productApi';
import { useRouter } from 'next/navigation';

// Import MegaMenu assets
import mm1 from '@/assets/MegaMenu/mm1.png';
import mm2 from '@/assets/MegaMenu/mm2.png';
import mm3 from '@/assets/MegaMenu/mm3.png';
import mm4 from '@/assets/MegaMenu/mm4.png';
import mm5 from '@/assets/MegaMenu/mm5.png';
import mm6 from '@/assets/MegaMenu/mm6.png';

// Import category components
import {
  BuildingConstructionMenu,
  ElectronicsMenu,
  PharmaMenu,
  AutomobileMenu,
  ApparelMenu,
  AgricultureMenu,
} from '@/components/MegaMenu';

// Types
interface MenuCategory {
  id: string;
  title: string;
  icon: any;
  component: React.ComponentType;
  description?: string;
  itemCount?: number;
}

// Menu configuration data
const menuData: MenuCategory[] = [

   {
    id: 'properties-builder-real-estate',
    title: 'Properties, Builder & Real Estate',
    icon: mm1,
    component: BuildingConstructionMenu,
    description: 'Residential Flats, Commercial Space, Townhouse & Villas, Plots Residential, Industrial Plot, Agriculture Land, Farmhouse Land, Property Verification, Property Management, Retail spaces, Industrial Properties, Hotels, Resorts, Mixed-Use Developments, Factory, Ready to move offices, Ready to move Residential Flats, Ready to move Commercial Space, Ready to move Townhouse & Villas, Ready to move retail spaces, Paying Guest PG, Co-living, Warehouse/Godwns, Shopping Malls/ Complexes, Cold Storage, Duplex Home, Luxury Home',
    itemCount: 29
  },
  {
    id: 'building-survey-soil-investigation',
    title: 'Building Survey & Soil Investigation',
    icon: mm2,
    component: ElectronicsMenu,
    description: 'Geotechnical Engineering, Geotechnical Investigation Services, Dgps Survey Services, Drone Survey, Soil Investigation, Earth Pit Testing, Thermal Imaging Service, Layout Survey Service, Soil Nailing, Building Survey Services, Soil Resistivity Testing Service, Site Survey Services, City Survey Services, Hydro Geological Study, Seismic Refraction Survey, Route Surveys Services',
    itemCount: 16
  },
  {
    id: 'engineering-services',
    title: 'Engineering Services',
    icon: mm4,
    component: PharmaMenu,
    description: 'Civil Engineering Services, Mechanical Engineering Services, Electrical Engineering Services, Structural Engineering Services, MEP Services, PEB Building Design, Firefighting Design Consultant, HVAC Design Consultant, MEP BIM Modeler, Plumbing Design Consultant',
    itemCount: 10
  },
  {
    id: 'architecture-interiors',
    title: 'Architecture & Interiors',
icon: mm5,
    component: AutomobileMenu,
    description: 'Interior Designing Services, Architectural Designing Services, Turnkey Interior Projects, Landscape Designing, Furniture Designing Services',
    itemCount: 5
  },
  {
    id: 'building-construction',
    title: 'Building & Construction',
icon: mm1,
    component: ApparelMenu,
    description: 'Construction Services, Building Construction Services, Residential Construction Services, Commercial Construction Services, Industrial Construction Services',
    itemCount: 5
  },
  {
    id: 'agriculture-farming',
    title: 'Agriculture & Farming',
icon: mm1,
    component: AgricultureMenu,
    description: 'Agricultural Equipment, Farming Tools, Irrigation Systems, Seeds & Fertilizers, Agricultural Consultancy',
    itemCount: 5
  },
  {
    id: 'electrical-equipment',
    title: 'Electrical Equipment',
icon: mm1,
    component: AgricultureMenu,
    description: 'Electrical Panels, Transformers, Switchgears, Cables & Wires, Power Distribution Systems',
    itemCount: 5
  },
  {
    id: 'electronics-electrical',
    title: 'Electronics & Electrical',
icon: mm1,
    component: AgricultureMenu,
    description: 'Electronic Components, Electrical Fittings, Lighting Solutions, Control Systems, Automation Products',
    itemCount: 5
  },
  {
    id: 'rnd-testing-labs',
    title: 'R&D and Testing Labs',
icon: mm1,
    component: AgricultureMenu,
    description: 'Cleanroom Equipment, Supplies & Accessories, Instrument Calibration & Adjustment, Laser Pointer, Optical Sensors, Autocollimator, Optical and Laser Instruments, Material & Product Testing Labs and Testing Services, Process Tanks, Pressure Vessels & Chemical Reactors, Research and Development (R&D) Work, Scientific Equipment and Scientific Instrument, Stereo Microscope, Biological, Measuring & Metallurgical Microscopes, Testing Equipment and Machines, Measuring Instruments & Equipment, Analyzers, Spectrometers, Chromatographs & Other Analytical Instruments, Laboratory Equipment, Disinfection Chamber and Lab Testing Equipment, Beakers, Test Tubes, Flasks and Other Plastic & Glass Labware, Diagnostic Medical Imaging Equipment and Accessories, Measuring Scales, Balances, Calipers, Tapes and Weighing Instruments',
    itemCount: 16
  },
  {
    id: 'business-audit-services',
    title: 'Business & Audit Services',
icon: mm1,
    component: AgricultureMenu,
    description: 'Audit Services, Financial Consultancy, Business Advisory, Tax Consultancy, Compliance Services',
    itemCount: 5
  },
  {
    id: 'product-rental-leasing',
    title: 'Product Rental & Leasing',
icon: mm1,
    component: AgricultureMenu,
    description: 'Equipment Rental, Vehicle Leasing, Machinery Rental, Office Equipment Leasing, Tool Rental',
    itemCount: 5
  },
  {
    id: 'hand-machine-tools',
    title: 'Hand & Machine Tools',
icon: mm1,
    component: AgricultureMenu,
    description: 'Power Tools, Hand Tools, Cutting Tools, Measuring Tools, Tool Kits',
    itemCount: 5
  },
  {
    id: 'mechanical-parts-spares',
    title: 'Mechanical Parts & Spares',
icon: mm1,
    component: AgricultureMenu,
    description: 'Bearings, Gears, Fasteners, Valves, Pumps',
    itemCount: 5
  },
  {
    id: 'industrial-supplies',
    title: 'Industrial Supplies',
icon: mm1,
    component: AgricultureMenu,
    description: 'Industrial Consumables, Safety Equipment, Lubricants, Adhesives, Packaging Materials',
    itemCount: 5
  },
  {
    id: 'industrial-plants-machinery',
    title: 'Industrial Plants & Machinery',
icon: mm1,
    component: AgricultureMenu,
    description: 'Industrial Machinery, Plant Equipment, Manufacturing Machines, Processing Equipment, Automation Systems',
    itemCount: 5
  },
  {
    id: 'food-beverages',
    title: 'Food & Beverages',
icon: mm1,
    component: AgricultureMenu,
    description: 'Processed Foods, Beverages, Snacks, Dairy Products, Frozen Foods',
    itemCount: 5
  },
  {
    id: 'apparel-garments',
    title: 'Apparel & Garments',
icon: mm1,
    component: AgricultureMenu,
    description: 'Clothing, Uniforms, Workwear, Traditional Garments, Fashion Apparel',
    itemCount: 5
  },
  {
    id: 'packaging-machines-goods',
    title: 'Packaging Machines & Goods',
icon: mm1,
    component: AgricultureMenu,
    description: 'Packaging Machines, Packaging Materials, Sealing Machines, Labeling Machines, Packing Supplies',
    itemCount: 5
  },
  {
    id: 'chemicals-dyes-solvents',
    title: 'Chemicals, Dyes & Solvents',
icon: mm1,
    component: AgricultureMenu,
    description: 'Industrial Chemicals, Dyes, Solvents, Paints, Coatings',
    itemCount: 5
  },
  {
    id: 'lab-instruments-supplies',
    title: 'Lab Instruments & Supplies',
    icon: mm1,
    component: AgricultureMenu,
    description: 'Laboratory Instruments, Lab Consumables, Testing Equipment, Analytical Instruments, Lab Safety Equipment',
    itemCount: 5
  },
  {
    id: 'furniture-supplies',
    title: 'Furniture & Supplies',
    icon: mm1,
    component: AgricultureMenu,
    description: 'Office Furniture, Home Furniture, Modular Furniture, Outdoor Furniture, Furniture Accessories',
    itemCount: 5
  },
  {
    id: 'automobile-parts-spares',
    title: 'Automobile, Parts & Spares',
    icon: mm4,
    component: AgricultureMenu,
    description: 'Auto Parts, Spare Parts, Vehicle Accessories, Engine Components, Transmission Parts',
    itemCount: 5
  },
  {
    id: 'housewares-supplies',
    title: 'Housewares & Supplies',
icon: mm1,
    component: AgricultureMenu,
    description: 'Kitchenware, Home Decor, Cleaning Supplies, Storage Solutions, Household Gadgets',
    itemCount: 5
  },
  {
    id: 'metals-alloys-minerals',
    title: 'Metals, Alloys & Minerals',
icon: mm1,
    component: AgricultureMenu,
    description: 'Metals, Alloys, Minerals, Ores, Scrap Metals',
    itemCount: 5
  },
  {
    id: 'handicrafts-decoratives',
    title: 'Handicrafts & Decoratives',
icon: mm1,
    component: AgricultureMenu,
    description: 'Handicrafts, Decorative Items, Artifacts, Sculptures, Traditional Crafts',
    itemCount: 5
  },
  {
    id: 'kitchen-utensils-appliances',
    title: 'Kitchen Utensils & Appliances',
icon: mm1,
    component: AgricultureMenu,
    description: 'Kitchen Utensils, Appliances, Cookware, Cutlery, Kitchen Gadgets',
    itemCount: 5
  },
  {
    id: 'textiles-yarn-fabrics',
    title: 'Textiles, Yarn & Fabrics',
icon: mm1,
    component: AgricultureMenu,
    description: 'Textiles, Yarns, Fabrics, Upholstery, Technical Textiles',
    itemCount: 5
  },
  {
    id: 'books-stationery',
    title: 'Books & Stationery',
icon: mm1,
    component: AgricultureMenu,
    description: 'Books, Stationery, Office Supplies, Educational Materials, Writing Instruments',
    itemCount: 5
  },
  {
    id: 'cosmetics-personal-care',
    title: 'Cosmetics & Personal Care',
icon: mm1,
    component: AgricultureMenu,
    description: 'Cosmetics, Skincare Products, Haircare Products, Personal Hygiene Products, Beauty Accessories',
    itemCount: 5
  },
  {
    id: 'home-textile-furnishing',
    title: 'Home Textile & Furnishing',
icon: mm1,
    component: AgricultureMenu,
    description: 'Bedding, Curtains, Carpets, Upholstery Fabrics, Home Decor Textiles',
    itemCount: 5
  },
  {
    id: 'drugs-pharmaceuticals',
    title: 'Drugs & Pharmaceuticals',
icon: mm3,
    component: AgricultureMenu,
    description: 'Medicines, Pharmaceutical Products, Vaccines, Medical Supplies, Drug Manufacturing',
    itemCount: 5
  },
  {
    id: 'gems-jewelry-astrology',
    title: 'Gems, Jewelry & Astrology',
icon: mm1,
    component: AgricultureMenu,
    description: 'Gemstones, Jewelry, Astrological Services, Precious Metals, Custom Jewelry',
    itemCount: 5
  },
  {
    id: 'computer-it-solutions',
    title: 'Computer & IT Solutions',
icon: mm1,
    component: AgricultureMenu,
    description: '2D, 3D Graphic Designing, Animation, Visualisation & Creative Designing, Application Development, ERP Solutions, Software Development Services, Computer Software, ERP Packages and Mobile Apps, Routers, Modems, Network Switch, LAN Card and other Networking Products, Laptops, Notebook, Personal Computers, Mainframes and Computer Systems, Android Apps, IOS Apps, CAD, Computer Games and Software Development Services, CAD CAM Design and Consultancy Services, Data Entry, Processing, Conversion & Document Management Services',
    itemCount: 10
  },
  {
    id: 'fashion-accessories-gear',
    title: 'Fashion Accessories & Gear',
icon: mm1,
    component: AgricultureMenu,
    description: 'Fashion Accessories, Belts, Wallets, Sunglasses, Watches',
    itemCount: 5
  },
  {
    id: 'herbal-ayurvedic-product',
    title: 'Herbal & Ayurvedic Product',
icon: mm1,
    component: AgricultureMenu,
    description: 'Herbal Products, Ayurvedic Medicines, Natural Supplements, Wellness Products, Organic Cosmetics',
    itemCount: 5
  },
  {
    id: 'security-systems-services',
    title: 'Security Systems & Services',
icon: mm1,
    component: AgricultureMenu,
    description: 'CCTV Systems, Access Control Systems, Fire Alarms, Security Services, Surveillance Equipment',
    itemCount: 5
  },
  {
    id: 'sports-goods-toys-games',
    title: 'Sports Goods, Toys & Games',
icon: mm1,
    component: AgricultureMenu,
    description: 'Sports Equipment, Toys, Board Games, Outdoor Games, Fitness Gear',
    itemCount: 5
  },
  {
    id: 'telecom-equipment-goods',
    title: 'Telecom Equipment & Goods',
icon: mm1,
    component: AgricultureMenu,
    description: 'Telecom Devices, Communication Equipment, Networking Gear, Telecom Accessories, Wireless Devices',
    itemCount: 5
  },
  {
    id: 'paper-paper-products',
    title: 'Paper & Paper Products',
icon: mm1,
    component: AgricultureMenu,
    description: 'Paper Products, Stationery, Packaging Paper, Craft Paper, Printing Paper',
    itemCount: 5
  },
  {
    id: 'bags-belts-wallets',
    title: 'Bags, Belts & Wallets',
icon: mm1,
    component: AgricultureMenu,
    description: 'Bags, Belts, Wallets, Backpacks, Travel Accessories',
    itemCount: 5
  },
  {
    id: 'media-pr-publishing',
    title: 'Media, PR & Publishing',
icon: mm1,
    component: AgricultureMenu,
    description: 'Media Services, Public Relations, Publishing Services, Advertising, Content Creation',
    itemCount: 5
  },
  {
    id: 'marble-granite-stones',
    title: 'Marble, Granite & Stones',
icon: mm1,
    component: AgricultureMenu,
    description: 'Marble, Granite, Natural Stones, Tiles, Stone Crafts',
    itemCount: 5
  },
  {
    id: 'event-planner-organizer',
    title: 'Event Planner & Organizer',
icon: mm1,
    component: AgricultureMenu,
    description: 'Event Planning, Wedding Planning, Corporate Events, Party Organizers, Event Management',
    itemCount: 5
  },
  {
    id: 'it-telecom-services',
    title: 'IT & Telecom Services',
icon: mm1,
    component: AgricultureMenu,
    description: 'IT Support, Telecom Services, Network Solutions, Cloud Services, IT Consultancy',
    itemCount: 5
  },
  {
    id: 'transportation-logistics',
    title: 'Transportation & Logistics',
icon: mm1,
    component: AgricultureMenu,
    description: 'Logistics Services, Freight Transport, Warehousing, Supply Chain Management, Courier Services',
    itemCount: 5
  },
  {
    id: 'financial-legal-services',
    title: 'Financial & Legal Services',
icon: mm1,
    component: AgricultureMenu,
    description: 'Financial Advisory, Legal Consultancy, Insurance Services, Tax Services, Investment Services',
    itemCount: 5
  },
  {
    id: 'education-training',
    title: 'Education & Training',
icon: mm1,
    component: AgricultureMenu,
    description: 'Educational Services, Training Programs, Online Courses, Skill Development, Coaching',
    itemCount: 5
  },
  {
    id: 'travel-tourism-hotels',
    title: 'Travel, Tourism & Hotels',
icon: mm1,
    component: AgricultureMenu,
    description: 'Travel Services, Tour Packages, Hotel Bookings, Travel Consultancy, Tourism Services',
    itemCount: 5
  },
  {
    id: 'call-center-bpo-services',
    title: 'Call Center & BPO Services',
icon: mm1,
    component: AgricultureMenu,
    description: 'Call Center Services, BPO Services, Customer Support, Telemarketing, Data Processing',
    itemCount: 5
  },
  {
    id: 'bicycle-rickshaw-spares',
    title: 'Bicycle, Rickshaw & Spares',
icon: mm1,
    component: AgricultureMenu,
    description: 'Bicycles, Rickshaws, Spare Parts, Accessories, Cycle Repair Services',
    itemCount: 5
  },
  {
    id: 'hospital-diagnostics',
    title: 'Hospital & Diagnostics',
icon: mm1,
    component: AgricultureMenu,
    description: 'Hospital Services, Diagnostic Centers, Medical Testing, Pathology Labs, Healthcare Services',
    itemCount: 5
  },
  {
    id: 'hr-planning-recruitment',
    title: 'HR Planning & Recruitment',
icon: mm1,
    component: AgricultureMenu,
    description: 'Recruitment Services, HR Consultancy, Payroll Services, Talent Management, Employee Training',
    itemCount: 5
  },
  {
    id: 'rail-shipping-aviation',
    title: 'Rail, Shipping & Aviation',
icon: mm1,
    component: AgricultureMenu,
    description: 'Rail Transport, Shipping Services, Aviation Services, Logistics, Cargo Handling',
    itemCount: 5
  },
  {
    id: 'house-keeping-services',
    title: 'House Keeping Services',
icon: mm1,
    component: AgricultureMenu,
    description: 'Cleaning Services, Facility Management, Housekeeping Staff, Janitorial Services, Pest Control',
    itemCount: 5
  },
  {
    id: 'leather-products',
    title: 'Leather Products',
icon: mm1,
    component: AgricultureMenu,
    description: 'Leather Goods, Bags, Shoes, Jackets, Accessories',
    itemCount: 5
  },
  {
    id: 'contractors-freelancers',
    title: 'Contractors & Freelancers',
icon: mm1,
    component: AgricultureMenu,
    description: 'Language Translators & Interpreter, Charity & Non Profit Organizations, Painters & Painting Service Provider, Transport Agents & Bulk Carriers, Photographers & Videographers, Product Packing & Labelling Services, Furniture Making & Carpentry Service',
    itemCount: 7
  },
  {
    id: 'electronics-components',
    title: 'Electronics Components',
icon: mm1,
    component: AgricultureMenu,
    description: 'Electric Circuit Components & Spares, VFD, PLC, HMI & Control Equipments, Sensors & Transducers, Resistors & Other Passive Devices, Diodes & Electronic Active Devices, Process Control Systems & Equipments, Optical, Laser Instruments & Devices, GPS and Navigation Devices, PCB Modules and Circuit Boards, Voltage & Power Stabilizers, Soldering Machines and Accesories, Electrical and Electronic Gadgets, Electrical & Electronic Connectors, Electric Fittings & Components, Relays and Contactors',
    itemCount: 15
  },
  {
    id: 'hospital-clinic-consultation',
    title: 'Hospital, Clinic & Consultation',
icon: mm1,
    component: AgricultureMenu,
    description: 'Medical Surgery & Treatment Centres, Medical Consultants & Clinics, Pharma & Bioanalytical Services, Herbal & Ayurvedic Medical Services, Diagnostic Imaging & Pathology Labs',
    itemCount: 5
  }
  
];

const MegaMenu: React.FC = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [vendorProducts, setVendorProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await categoryAPI.getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchData();
  }, []);

  const handleMouseEnter = (categoryId: string) => {
    setActiveCategory(categoryId);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
    setIsHovering(false);
  };

  const handleCategoryClick = (categoryId: string) => {
    // Navigate to category page
    router.push(`/categories/${categoryId}`);
  };

  return (
    <div className="relative">
      <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover thousands of products from verified suppliers across India's top business categories
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-8">
            {menuData.map((category) => {
              const CategoryComponent = category.component;
              const isActive = activeCategory === category.id;

              // Fetch vendor products by category
              useEffect(() => {
                if (activeCategory) {
                  const fetchVendorProducts = async () => {
                    try {
                      const productsData = await productAPI.getProductsByCategory(Number(activeCategory));
                      setVendorProducts(productsData.content);
                    } catch (error) {
                      console.error('Error fetching vendor products:', error);
                    }
                  };
                  fetchVendorProducts();
                }
              }, [activeCategory]);

              return (
                <div
                  key={category.id}
                  className="group relative h-full"
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Category Button */}
                  <button 
                    onClick={() => handleCategoryClick(category.id)}
                    className={`flex flex-col items-center justify-between w-full h-full min-h-[160px] sm:min-h-[180px] md:min-h-[200px] p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 ${isActive ? 'border-indigo-200 shadow-lg' : 'hover:border-indigo-200'} group`}
                  >
                    <div className="flex flex-col items-center space-y-3 w-full flex-1 justify-center">
                      {/* Icon */}
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full flex items-center justify-center group-hover:from-indigo-100 group-hover:to-blue-100 transition-all duration-300">
                          <Image
                            src={category.icon}
                            alt={category.title}
                            width={48}
                            height={48}
                            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full animate-pulse" />
                        )}
                      </div>
                      
                      {/* Title */}
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 leading-tight mb-1">
                          {category.title}
                        </h3>
                        {category.description && (
                          <p className="text-xs text-gray-500 mt-1 group-hover:text-indigo-500 transition-colors duration-300 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
                            {category.description}
                          </p>
                        )}
                        {category.itemCount && (
                          <span className="inline-block mt-2 text-xs text-indigo-600 font-medium">
                            {category.itemCount}+ items
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Chevron - Always at bottom */}
                    <div className="flex-shrink-0 mt-2">
                      <ChevronDownIcon className={`w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-all duration-300 ${isActive ? 'rotate-180' : 'group-hover:rotate-180'}`} />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* View All Categories Link - Hide when any category is active */}
          {!activeCategory && (
            <div className="text-center mt-12">
              <a
                href="/categories"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                View All Categories
                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          )}

          {/* Mega Menu Dropdown - Positioned directly under cards */}
          {activeCategory && (
            <div 
              className="w-full bg-white border border-gray-200 rounded-xl shadow-xl mt-8"
              onMouseEnter={() => handleMouseEnter(activeCategory)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-w-7xl mx-auto px-4">
                <div className="p-6 md:p-8">
                  {(() => {
                    const category = menuData.find(cat => cat.id === activeCategory);
                    if (!category) return null;
                    const CategoryComponent = category.component;

                    return (
                      <>
                        {/* Category Header */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">{category.title}</h3>
                            {category.description && (
                              <p className="text-sm md:text-base text-gray-600 mt-1">{category.description}</p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm md:text-base text-gray-500">View All</span>
                            <ChevronDownIcon className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                          </div>
                        </div>

                        {/* Category Content */}
                        <div className="min-h-[400px] md:min-h-[450px] overflow-visible">
                          <CategoryComponent />
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MegaMenu;
