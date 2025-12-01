'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CustomerIntelligenceTablesProps {
  title?: string
  height?: number
}

// Proposition 1 columns (smallest - 14 columns)
const proposition1Columns = [
  { key: 'sno', header: 'S.No.', group: 'Customer Information', width: 50 },
  { key: 'customerName', header: 'Customer / Plant / Organization Name', group: 'Customer Information', width: 180 },
  { key: 'parentGroup', header: 'Parent Group / Holding Company', group: 'Customer Information', width: 160 },
  { key: 'country', header: 'Country', group: 'Customer Information', width: 100 },
  { key: 'city', header: 'City / Industrial Cluster', group: 'Customer Information', width: 140 },
  { key: 'coreIndustry', header: 'Core Industry (Manufacturing / Oil & Gas / Energy & Power / F&B / Maritime & Offshore / Others)', group: 'Customer Information', width: 200 },
  { key: 'facilityType', header: 'Facility Type (refinery, power plant, factory, desalination, offshore platform, shipyard, etc.)', group: 'Customer Information', width: 200 },
  { key: 'installedCT', header: 'Installed Cooling Tower Base (no. of towers / cells / capacity )', group: 'Customer Information', width: 180 },
  { key: 'keyContact', header: 'Key Contact Person', group: 'Contact Details', width: 140 },
  { key: 'designation', header: 'Designation / Department', group: 'Contact Details', width: 140 },
  { key: 'email', header: 'Email Address', group: 'Contact Details', width: 160 },
  { key: 'phone', header: 'Phone/ WhatsApp Number', group: 'Contact Details', width: 140 },
  { key: 'linkedin', header: 'LinkedIn Profile', group: 'Contact Details', width: 120 },
  { key: 'website', header: 'Website URL', group: 'Contact Details', width: 120 },
]

// Proposition 2 columns (mid-sized - 17 columns)
const proposition2Columns = [
  { key: 'sno', header: 'S.No.', group: 'Customer Information', width: 50 },
  { key: 'customerName', header: 'Customer / Plant / Organization Name', group: 'Customer Information', width: 180 },
  { key: 'parentGroup', header: 'Parent Group / Holding Company', group: 'Customer Information', width: 160 },
  { key: 'country', header: 'Country', group: 'Customer Information', width: 100 },
  { key: 'city', header: 'City / Industrial Cluster', group: 'Customer Information', width: 140 },
  { key: 'coreIndustry', header: 'Core Industry (Manufacturing / Oil & Gas / Energy & Power / F&B / Maritime & Offshore / Others)', group: 'Customer Information', width: 200 },
  { key: 'facilityType', header: 'Facility Type (refinery, power plant, factory, desalination, offshore platform, shipyard, etc.)', group: 'Customer Information', width: 200 },
  { key: 'installedCT', header: 'Installed Cooling Tower Base (no. of towers / cells / capacity )', group: 'Customer Information', width: 180 },
  { key: 'keyContact', header: 'Key Contact Person', group: 'Contact Details', width: 140 },
  { key: 'designation', header: 'Designation / Department', group: 'Contact Details', width: 140 },
  { key: 'email', header: 'Email Address', group: 'Contact Details', width: 160 },
  { key: 'phone', header: 'Phone/WhatsApp Number', group: 'Contact Details', width: 140 },
  { key: 'linkedin', header: 'LinkedIn Profile', group: 'Contact Details', width: 120 },
  { key: 'website', header: 'Website URL', group: 'Contact Details', width: 120 },
  { key: 'priorityLevel', header: 'Priority Level for CT Upgrade / Service (Low / Medium / High)', group: 'Opportunity & Project Status', width: 160 },
  { key: 'opportunitySize', header: 'Expected Opportunity Size (small / medium / large, or spend range )', group: 'Opportunity & Project Status', width: 160 },
  { key: 'plannedProjects', header: 'Planned Projects / Triggers (capacity expansion, retrofit, regulatory, efficiency drive)', group: 'Opportunity & Project Status', width: 180 },
]

// Proposition 3 columns (largest - 26 columns)
const proposition3Columns = [
  { key: 'sno', header: 'S.No.', group: 'Customer Information', width: 50 },
  { key: 'customerName', header: 'Customer / Plant / Organization Name', group: 'Customer Information', width: 180 },
  { key: 'parentGroup', header: 'Parent Group / Holding Company', group: 'Customer Information', width: 160 },
  { key: 'country', header: 'Country', group: 'Customer Information', width: 100 },
  { key: 'city', header: 'City / Industrial Cluster', group: 'Customer Information', width: 140 },
  { key: 'coreIndustry', header: 'Core Industry (Manufacturing / Oil & Gas / Energy & Power / F&B / Maritime & Offshore / Others)', group: 'Customer Information', width: 200 },
  { key: 'facilityType', header: 'Facility Type (refinery, power plant, factory, desalination, offshore platform, shipyard, etc.)', group: 'Customer Information', width: 200 },
  { key: 'installedCT', header: 'Installed Cooling Tower Base (no. of towers / cells / capacity )', group: 'Customer Information', width: 180 },
  { key: 'keyContact', header: 'Key Contact Person', group: 'Contact Details', width: 140 },
  { key: 'designation', header: 'Designation / Department', group: 'Contact Details', width: 140 },
  { key: 'email', header: 'Email Address', group: 'Contact Details', width: 160 },
  { key: 'phone', header: 'Phone/WhatsApp Number', group: 'Contact Details', width: 140 },
  { key: 'linkedin', header: 'LinkedIn Profile', group: 'Contact Details', width: 120 },
  { key: 'website', header: 'Website URL', group: 'Contact Details', width: 120 },
  { key: 'primaryNeedFocus', header: 'Primary Need Focus (Products / Services / Both)', group: 'Needs & Pain Points', width: 160 },
  { key: 'keyProductNeeds', header: 'Key Product Needs (CT components, maintenance & cleaning equipment)', group: 'Needs & Pain Points', width: 180 },
  { key: 'keyServiceNeeds', header: 'Key Service Needs (installation, AMC, cleaning, refurbishment, treatment, etc.)', group: 'Needs & Pain Points', width: 180 },
  { key: 'decisionMakers', header: 'Decision Makers (maintenance manager, utility head, plant manager, procurement, etc.)', group: 'Purchasing Behaviour', width: 180 },
  { key: 'currentSupplier', header: 'Current Cooling Tower Supplier Setup (OEM / local distributor / multi vendor / in house)', group: 'Purchasing Behaviour', width: 180 },
  { key: 'maintenanceModel', header: 'Current Maintenance Model (in-house / outsourced / mixed)', group: 'Purchasing Behaviour', width: 160 },
  { key: 'buyingModel', header: 'Buying / Contracting Model (spot purchase / AMC / long-term service contract / turnkey)', group: 'Purchasing Behaviour', width: 180 },
  { key: 'priorityLevel', header: 'Priority Level for CT Upgrade / Service (Low / Medium / High)', group: 'Opportunity & Project Status', width: 160 },
  { key: 'opportunitySize', header: 'Expected Opportunity Size (small / medium / large, or spend range )', group: 'Opportunity & Project Status', width: 160 },
  { key: 'plannedProjects', header: 'Planned Projects / Triggers (capacity expansion, retrofit, regulatory, efficiency drive)', group: 'Opportunity & Project Status', width: 180 },
  { key: 'benchmarkingSummary', header: 'Customer Benchmarking Summary (Potential / Customers/ Peer)', group: 'CMI Insights', width: 180 },
  { key: 'additionalComments', header: 'Additional Comments/ Notes by CMI Team / Group', group: 'CMI Insights', width: 180 },
]

// Sample data rows with realistic Middle East Cooling Tower market data
const sampleData = [
  {
    sno: 1,
    customerName: 'Saudi Aramco - Ras Tanura Refinery',
    parentGroup: 'Saudi Aramco',
    country: 'Saudi Arabia',
    city: 'Ras Tanura',
    coreIndustry: 'Oil & Gas',
    facilityType: 'Refinery',
    installedCT: '12 towers / 48 cells / 85,000 GPM',
    keyContact: 'Ahmed Al-Rashid',
    designation: 'Maintenance Manager',
    email: 'a.alrashid@aramco.com',
    phone: '+966 13 876 5432',
    linkedin: 'linkedin.com/in/ahmedalrashid',
    website: 'www.aramco.com',
    priorityLevel: 'High',
    opportunitySize: 'Large ($500K-1M)',
    plannedProjects: 'Retrofit & efficiency upgrade planned Q2 2025',
    primaryNeedFocus: 'Both',
    keyProductNeeds: 'Fill media, drift eliminators, motors & fan assemblies',
    keyServiceNeeds: 'AMC, cleaning, refurbishment',
    decisionMakers: 'Plant Manager, Procurement Head',
    currentSupplier: 'Multi-vendor (SPX, Evapco)',
    maintenanceModel: 'Mixed',
    buyingModel: 'Long-term service contract',
    benchmarkingSummary: 'High Potential - Major expansion planned',
    additionalComments: 'Key strategic account, strong relationship with procurement team',
  },
  {
    sno: 2,
    customerName: 'ADNOC Refining - Ruwais',
    parentGroup: 'ADNOC Group',
    country: 'UAE',
    city: 'Ruwais Industrial City',
    coreIndustry: 'Oil & Gas',
    facilityType: 'Refinery',
    installedCT: '8 towers / 32 cells / 62,000 GPM',
    keyContact: 'Mohammed Al-Hashimi',
    designation: 'Utilities Head',
    email: 'm.alhashimi@adnoc.ae',
    phone: '+971 2 602 8000',
    linkedin: 'linkedin.com/in/malhashimi',
    website: 'www.adnoc.ae',
    priorityLevel: 'High',
    opportunitySize: 'Large ($300K-500K)',
    plannedProjects: 'Capacity expansion 2025',
    primaryNeedFocus: 'Products',
    keyProductNeeds: 'Structural panels, spray nozzles, inlet louvers',
    keyServiceNeeds: 'Installation, commissioning',
    decisionMakers: 'Utility Head, Engineering Manager',
    currentSupplier: 'OEM (Hamon)',
    maintenanceModel: 'In-house',
    buyingModel: 'Spot purchase + AMC',
    benchmarkingSummary: 'High Potential - Budget approved',
    additionalComments: 'Prefers European suppliers, quality-focused',
  },
  {
    sno: 3,
    customerName: 'Qatar Petroleum - Mesaieed Industrial',
    parentGroup: 'QatarEnergy',
    country: 'Qatar',
    city: 'Mesaieed',
    coreIndustry: 'Oil & Gas',
    facilityType: 'Petrochemical Complex',
    installedCT: '6 towers / 24 cells / 45,000 GPM',
    keyContact: 'Khalid Al-Thani',
    designation: 'Senior Maintenance Engineer',
    email: 'k.althani@qp.com.qa',
    phone: '+974 4013 2000',
    linkedin: 'linkedin.com/in/khalidthani',
    website: 'www.qatarenergy.qa',
    priorityLevel: 'Medium',
    opportunitySize: 'Medium ($100K-300K)',
    plannedProjects: 'Regulatory compliance upgrade',
    primaryNeedFocus: 'Services',
    keyProductNeeds: 'Drift eliminators, water distribution systems',
    keyServiceNeeds: 'CT cleaning, water treatment',
    decisionMakers: 'Maintenance Manager, HSE Head',
    currentSupplier: 'Local distributor',
    maintenanceModel: 'Outsourced',
    buyingModel: 'AMC',
    benchmarkingSummary: 'Medium Potential - Service-focused',
    additionalComments: 'Strong focus on environmental compliance',
  },
  {
    sno: 4,
    customerName: 'Kuwait National Petroleum Company',
    parentGroup: 'KNPC',
    country: 'Kuwait',
    city: 'Mina Al-Ahmadi',
    coreIndustry: 'Oil & Gas',
    facilityType: 'Refinery',
    installedCT: '10 towers / 40 cells / 72,000 GPM',
    keyContact: 'Fahad Al-Sabah',
    designation: 'Plant Manager',
    email: 'f.alsabah@knpc.com',
    phone: '+965 2326 1000',
    linkedin: 'linkedin.com/in/fahadsabah',
    website: 'www.knpc.com',
    priorityLevel: 'High',
    opportunitySize: 'Large ($500K+)',
    plannedProjects: 'Full CT system replacement 2025-2026',
    primaryNeedFocus: 'Both',
    keyProductNeeds: 'Complete CT components package',
    keyServiceNeeds: 'Turnkey installation, AMC',
    decisionMakers: 'Plant Manager, VP Operations',
    currentSupplier: 'OEM (Baltimore Aircoil)',
    maintenanceModel: 'Mixed',
    buyingModel: 'Turnkey',
    benchmarkingSummary: 'High Potential - Major project',
    additionalComments: 'RFQ expected Q1 2025, requires local partner',
  },
  {
    sno: 5,
    customerName: 'DUBAL Aluminium Smelter',
    parentGroup: 'Emirates Global Aluminium',
    country: 'UAE',
    city: 'Dubai - Jebel Ali',
    coreIndustry: 'Manufacturing',
    facilityType: 'Aluminium Smelter',
    installedCT: '15 towers / 60 cells / 95,000 GPM',
    keyContact: 'Rashid Al-Mulla',
    designation: 'Utilities Manager',
    email: 'r.almulla@ega.ae',
    phone: '+971 4 802 4000',
    linkedin: 'linkedin.com/in/rashidmulla',
    website: 'www.ega.ae',
    priorityLevel: 'High',
    opportunitySize: 'Large ($400K-600K)',
    plannedProjects: 'Efficiency drive - energy optimization',
    primaryNeedFocus: 'Products',
    keyProductNeeds: 'High-efficiency fill media, motors & fan assemblies',
    keyServiceNeeds: 'Performance audit, optimization',
    decisionMakers: 'Utilities Manager, Energy Manager',
    currentSupplier: 'Multi-vendor',
    maintenanceModel: 'In-house',
    buyingModel: 'Spot purchase',
    benchmarkingSummary: 'High Potential - Energy efficiency focus',
    additionalComments: 'Interested in energy-saving solutions, ROI-driven',
  },
  {
    sno: 6,
    customerName: 'Oman LNG - Qalhat',
    parentGroup: 'Oman LNG LLC',
    country: 'Oman',
    city: 'Qalhat - Sur',
    coreIndustry: 'Oil & Gas',
    facilityType: 'LNG Plant',
    installedCT: '4 towers / 16 cells / 35,000 GPM',
    keyContact: 'Said Al-Busaidi',
    designation: 'Technical Services Manager',
    email: 's.albusaidi@omanlng.co.om',
    phone: '+968 2554 6000',
    linkedin: 'linkedin.com/in/saidbusaidi',
    website: 'www.omanlng.co.om',
    priorityLevel: 'Medium',
    opportunitySize: 'Medium ($150K-250K)',
    plannedProjects: 'Scheduled maintenance overhaul',
    primaryNeedFocus: 'Both',
    keyProductNeeds: 'Fill media replacement, spray nozzles',
    keyServiceNeeds: 'Cleaning, inspection, refurbishment',
    decisionMakers: 'Technical Services Manager, Procurement',
    currentSupplier: 'OEM (Marley)',
    maintenanceModel: 'Outsourced',
    buyingModel: 'AMC',
    benchmarkingSummary: 'Medium Potential - Steady business',
    additionalComments: 'Long-term relationship, prefers proven suppliers',
  },
  {
    sno: 7,
    customerName: 'SABIC - Jubail Industrial Complex',
    parentGroup: 'Saudi Basic Industries Corp',
    country: 'Saudi Arabia',
    city: 'Jubail',
    coreIndustry: 'Manufacturing',
    facilityType: 'Petrochemical Plant',
    installedCT: '18 towers / 72 cells / 120,000 GPM',
    keyContact: 'Ibrahim Al-Qahtani',
    designation: 'Reliability Engineer',
    email: 'i.alqahtani@sabic.com',
    phone: '+966 13 359 1000',
    linkedin: 'linkedin.com/in/ibrahimqahtani',
    website: 'www.sabic.com',
    priorityLevel: 'High',
    opportunitySize: 'Large ($600K-800K)',
    plannedProjects: 'Reliability improvement program',
    primaryNeedFocus: 'Both',
    keyProductNeeds: 'All CT components - full replacement',
    keyServiceNeeds: 'AMC, predictive maintenance',
    decisionMakers: 'Reliability Engineer, Operations Director',
    currentSupplier: 'Multi-vendor',
    maintenanceModel: 'Mixed',
    buyingModel: 'Long-term service contract',
    benchmarkingSummary: 'High Potential - Strategic account',
    additionalComments: 'Vision 2030 aligned, investing heavily in infrastructure',
  },
  {
    sno: 8,
    customerName: 'Bahrain Steel Company',
    parentGroup: 'Bahrain Steel BSC',
    country: 'Bahrain',
    city: 'Hidd Industrial Area',
    coreIndustry: 'Manufacturing',
    facilityType: 'Steel Mill',
    installedCT: '5 towers / 20 cells / 38,000 GPM',
    keyContact: 'Hassan Al-Khalifa',
    designation: 'Plant Engineering Head',
    email: 'h.alkhalifa@bahrainsteel.com',
    phone: '+973 1773 1000',
    linkedin: 'linkedin.com/in/hassankhalifa',
    website: 'www.bahrainsteel.com',
    priorityLevel: 'Medium',
    opportunitySize: 'Medium ($80K-150K)',
    plannedProjects: 'Annual maintenance contract renewal',
    primaryNeedFocus: 'Services',
    keyProductNeeds: 'Spare parts inventory',
    keyServiceNeeds: 'Cleaning, routine maintenance',
    decisionMakers: 'Plant Engineering Head',
    currentSupplier: 'Local distributor',
    maintenanceModel: 'Outsourced',
    buyingModel: 'AMC',
    benchmarkingSummary: 'Medium Potential - Recurring revenue',
    additionalComments: 'Cost-conscious, prefers bundled service packages',
  },
  {
    sno: 9,
    customerName: 'DEWA - Jebel Ali Power Station',
    parentGroup: 'Dubai Electricity & Water Authority',
    country: 'UAE',
    city: 'Dubai - Jebel Ali',
    coreIndustry: 'Energy & Power',
    facilityType: 'Power Plant',
    installedCT: '20 towers / 80 cells / 150,000 GPM',
    keyContact: 'Omar Al-Shamsi',
    designation: 'Mechanical Maintenance Manager',
    email: 'o.alshamsi@dewa.gov.ae',
    phone: '+971 4 601 9999',
    linkedin: 'linkedin.com/in/omarshamsi',
    website: 'www.dewa.gov.ae',
    priorityLevel: 'High',
    opportunitySize: 'Large ($700K-1M)',
    plannedProjects: 'Sustainability upgrade - water conservation',
    primaryNeedFocus: 'Both',
    keyProductNeeds: 'High-efficiency drift eliminators, fill media',
    keyServiceNeeds: 'Water treatment, performance optimization',
    decisionMakers: 'Division Head, Sustainability Director',
    currentSupplier: 'OEM (SPX Cooling)',
    maintenanceModel: 'In-house',
    buyingModel: 'Spot purchase + service contract',
    benchmarkingSummary: 'High Potential - Government priority',
    additionalComments: 'Strong sustainability mandate, green procurement policy',
  },
  {
    sno: 10,
    customerName: 'Ma\'aden Aluminium - Ras Al Khair',
    parentGroup: 'Saudi Arabian Mining Company',
    country: 'Saudi Arabia',
    city: 'Ras Al Khair',
    coreIndustry: 'Manufacturing',
    facilityType: 'Aluminium Smelter',
    installedCT: '14 towers / 56 cells / 88,000 GPM',
    keyContact: 'Abdulaziz Al-Dosari',
    designation: 'Utilities Superintendent',
    email: 'a.aldosari@maaden.com.sa',
    phone: '+966 13 821 0000',
    linkedin: 'linkedin.com/in/abdulazizaldosari',
    website: 'www.maaden.com.sa',
    priorityLevel: 'High',
    opportunitySize: 'Large ($450K-650K)',
    plannedProjects: 'Capacity expansion Phase 2',
    primaryNeedFocus: 'Products',
    keyProductNeeds: 'New CT installation components',
    keyServiceNeeds: 'Installation, commissioning, training',
    decisionMakers: 'Utilities Superintendent, Project Manager',
    currentSupplier: 'OEM (Evapco)',
    maintenanceModel: 'In-house',
    buyingModel: 'Turnkey',
    benchmarkingSummary: 'High Potential - Expansion project',
    additionalComments: 'Greenfield project, budget allocated',
  },
  {
    sno: 11,
    customerName: 'Emirates Steel Industries',
    parentGroup: 'Emirates Steel Arkan',
    country: 'UAE',
    city: 'Abu Dhabi - Mussafah',
    coreIndustry: 'Manufacturing',
    facilityType: 'Steel Mill',
    installedCT: '7 towers / 28 cells / 52,000 GPM',
    keyContact: 'Youssef Al-Nuaimi',
    designation: 'Maintenance Director',
    email: 'y.alnuaimi@emiratessteel.com',
    phone: '+971 2 509 7000',
    linkedin: 'linkedin.com/in/youssefnuaimi',
    website: 'www.emiratessteel.com',
    priorityLevel: 'Medium',
    opportunitySize: 'Medium ($200K-350K)',
    plannedProjects: 'Retrofit for water efficiency',
    primaryNeedFocus: 'Both',
    keyProductNeeds: 'Water distribution systems, nozzles',
    keyServiceNeeds: 'Water audit, treatment services',
    decisionMakers: 'Maintenance Director, Environmental Manager',
    currentSupplier: 'Multi-vendor',
    maintenanceModel: 'Mixed',
    buyingModel: 'AMC',
    benchmarkingSummary: 'Medium Potential - Water conservation focus',
    additionalComments: 'Strong environmental compliance requirements',
  },
  {
    sno: 12,
    customerName: 'Qatar Aluminium (Qatalum)',
    parentGroup: 'Qatar Aluminium Ltd',
    country: 'Qatar',
    city: 'Mesaieed Industrial',
    coreIndustry: 'Manufacturing',
    facilityType: 'Aluminium Smelter',
    installedCT: '12 towers / 48 cells / 82,000 GPM',
    keyContact: 'Nasser Al-Attiyah',
    designation: 'Technical Manager',
    email: 'n.alattiyah@qatalum.com',
    phone: '+974 4422 8000',
    linkedin: 'linkedin.com/in/nasserattiyah',
    website: 'www.qatalum.com',
    priorityLevel: 'Medium',
    opportunitySize: 'Medium ($180K-280K)',
    plannedProjects: 'Scheduled turnaround maintenance',
    primaryNeedFocus: 'Products',
    keyProductNeeds: 'Fill media, structural components',
    keyServiceNeeds: 'Inspection, refurbishment',
    decisionMakers: 'Technical Manager, Procurement Manager',
    currentSupplier: 'OEM (Hamon)',
    maintenanceModel: 'In-house',
    buyingModel: 'Spot purchase',
    benchmarkingSummary: 'Medium Potential - Regular maintenance cycle',
    additionalComments: 'Prefers OEM parts, quality over cost',
  },
  {
    sno: 13,
    customerName: 'Sohar Aluminium',
    parentGroup: 'Sohar Aluminium LLC',
    country: 'Oman',
    city: 'Sohar Industrial Port',
    coreIndustry: 'Manufacturing',
    facilityType: 'Aluminium Smelter',
    installedCT: '9 towers / 36 cells / 65,000 GPM',
    keyContact: 'Salim Al-Rawahi',
    designation: 'Operations Manager',
    email: 's.alrawahi@soharaluminium.com',
    phone: '+968 2685 0000',
    linkedin: 'linkedin.com/in/salimrawahi',
    website: 'www.soharaluminium.com',
    priorityLevel: 'Medium',
    opportunitySize: 'Medium ($120K-200K)',
    plannedProjects: 'Energy efficiency improvement',
    primaryNeedFocus: 'Products',
    keyProductNeeds: 'High-efficiency motors, fan assemblies',
    keyServiceNeeds: 'Performance assessment',
    decisionMakers: 'Operations Manager, Energy Manager',
    currentSupplier: 'Local distributor',
    maintenanceModel: 'Mixed',
    buyingModel: 'Spot purchase',
    benchmarkingSummary: 'Medium Potential - Efficiency focus',
    additionalComments: 'Energy cost reduction is key driver',
  },
  {
    sno: 14,
    customerName: 'TAQA - Jebel Ali Power',
    parentGroup: 'Abu Dhabi National Energy Co',
    country: 'UAE',
    city: 'Abu Dhabi',
    coreIndustry: 'Energy & Power',
    facilityType: 'Power & Desalination Plant',
    installedCT: '16 towers / 64 cells / 110,000 GPM',
    keyContact: 'Khaled Al-Muhairi',
    designation: 'Asset Manager',
    email: 'k.almuhairi@taqa.com',
    phone: '+971 2 691 4000',
    linkedin: 'linkedin.com/in/khaledmuhairi',
    website: 'www.taqa.com',
    priorityLevel: 'High',
    opportunitySize: 'Large ($350K-500K)',
    plannedProjects: 'Asset life extension program',
    primaryNeedFocus: 'Both',
    keyProductNeeds: 'Structural panels, basins, grating',
    keyServiceNeeds: 'Condition assessment, refurbishment',
    decisionMakers: 'Asset Manager, VP Operations',
    currentSupplier: 'OEM (Marley)',
    maintenanceModel: 'Outsourced',
    buyingModel: 'Long-term service contract',
    benchmarkingSummary: 'High Potential - Life extension project',
    additionalComments: 'Looking for strategic maintenance partner',
  },
  {
    sno: 15,
    customerName: 'Borouge - Ruwais Complex',
    parentGroup: 'Borouge PLC',
    country: 'UAE',
    city: 'Ruwais',
    coreIndustry: 'Manufacturing',
    facilityType: 'Petrochemical Plant',
    installedCT: '11 towers / 44 cells / 78,000 GPM',
    keyContact: 'Ahmad Al-Kaabi',
    designation: 'Maintenance Planning Manager',
    email: 'a.alkaabi@borouge.com',
    phone: '+971 2 607 0000',
    linkedin: 'linkedin.com/in/ahmadkaabi',
    website: 'www.borouge.com',
    priorityLevel: 'High',
    opportunitySize: 'Large ($400K-550K)',
    plannedProjects: 'Borouge 4 expansion - new CT required',
    primaryNeedFocus: 'Both',
    keyProductNeeds: 'Complete CT system for new capacity',
    keyServiceNeeds: 'Design, installation, commissioning',
    decisionMakers: 'Project Director, Procurement Director',
    currentSupplier: 'OEM (SPX)',
    maintenanceModel: 'In-house',
    buyingModel: 'Turnkey',
    benchmarkingSummary: 'High Potential - Major expansion',
    additionalComments: 'Multi-billion dollar expansion, CT scope significant',
  },
]

// Group colors for visual distinction
const groupColors: Record<string, { bg: string; header: string }> = {
  'Customer Information': { bg: 'bg-amber-50', header: 'bg-amber-100' },
  'Contact Details': { bg: 'bg-sky-50', header: 'bg-sky-100' },
  'Needs & Pain Points': { bg: 'bg-green-50', header: 'bg-green-100' },
  'Purchasing Behaviour': { bg: 'bg-purple-50', header: 'bg-purple-100' },
  'Opportunity & Project Status': { bg: 'bg-indigo-50', header: 'bg-indigo-100' },
  'CMI Insights': { bg: 'bg-rose-50', header: 'bg-rose-100' },
}

interface TableSectionProps {
  title: string
  columns: typeof proposition1Columns
  data: typeof sampleData
  isOpen: boolean
  onToggle: () => void
}

function TableSection({ title, columns, data, isOpen, onToggle }: TableSectionProps) {
  // Calculate group spans for header
  const groups: { name: string; span: number }[] = []
  columns.forEach((col) => {
    const lastGroup = groups[groups.length - 1]
    if (lastGroup && lastGroup.name === col.group) {
      lastGroup.span++
    } else {
      groups.push({ name: col.group, span: 1 })
    }
  })

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Section Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {/* Table Content */}
      {isOpen && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse" style={{ minWidth: columns.reduce((acc, col) => acc + col.width, 0) }}>
            {/* Group Header Row */}
            <thead>
              <tr>
                {groups.map((group, idx) => {
                  const colors = groupColors[group.name] || { bg: 'bg-gray-50', header: 'bg-gray-100' }
                  return (
                    <th
                      key={idx}
                      colSpan={group.span}
                      className={`${colors.header} border border-gray-300 px-2 py-2 text-center font-semibold text-gray-700`}
                    >
                      {group.name}
                    </th>
                  )
                })}
              </tr>
              {/* Column Header Row */}
              <tr>
                {columns.map((col, idx) => {
                  const colors = groupColors[col.group] || { bg: 'bg-gray-50', header: 'bg-gray-100' }
                  return (
                    <th
                      key={idx}
                      className={`${colors.bg} border border-gray-300 px-2 py-2 text-left font-medium text-gray-600`}
                      style={{ minWidth: col.width, maxWidth: col.width }}
                    >
                      {col.header}
                    </th>
                  )
                })}
              </tr>
            </thead>
            {/* Data Rows */}
            <tbody>
              {data.map((row, rowIdx) => (
                <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className="border border-gray-200 px-2 py-2 text-gray-700"
                      style={{ minWidth: col.width, maxWidth: col.width }}
                    >
                      {row[col.key as keyof typeof row]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default function CustomerIntelligenceTables({ title, height }: CustomerIntelligenceTablesProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    proposition1: true,
    proposition2: false,
    proposition3: false,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
      )}

      <div className="space-y-4">
        <TableSection
          title="Proposition 1"
          columns={proposition1Columns}
          data={sampleData}
          isOpen={openSections.proposition1}
          onToggle={() => toggleSection('proposition1')}
        />

        <TableSection
          title="Proposition 2"
          columns={proposition2Columns}
          data={sampleData}
          isOpen={openSections.proposition2}
          onToggle={() => toggleSection('proposition2')}
        />

        <TableSection
          title="Proposition 3"
          columns={proposition3Columns}
          data={sampleData}
          isOpen={openSections.proposition3}
          onToggle={() => toggleSection('proposition3')}
        />
      </div>
    </div>
  )
}
