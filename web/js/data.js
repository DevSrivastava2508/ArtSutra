/**
 * GigFinance Web - Core Data Layer & Storage Engine
 */

export const OCCUPATIONS = [
  {
    id: 'delivery',
    title: 'Food & Grocery Delivery Boy / Partner',
    shortTitle: 'Delivery Boy',
    icon: '🛵',
    description: 'Swiggy, Zomato, Zepto, Blinkit, BigBasket',
    color: '#FC8019',
    badgeBg: 'rgba(252, 128, 25, 0.12)',
    platforms: ['Swiggy', 'Zomato', 'Zepto', 'Blinkit'],
    popularExpenses: ['Fuel & Petrol', 'Bike/Vehicle Maintenance', 'Mobile Data & Phone Bill', 'Food & Chai on Shift'],
  },
  {
    id: 'freelancer',
    title: 'Freelancer / Digital Specialist',
    shortTitle: 'Freelancer',
    icon: '💻',
    description: 'Tech, Web Dev, Graphic Design, Video Editing, Writing',
    color: '#8B5CF6',
    badgeBg: 'rgba(139, 92, 246, 0.12)',
    platforms: ['Freelancing / Tech', 'Upwork', 'Fiverr', 'Direct Clients'],
    popularExpenses: ['Mobile Data & Phone Bill', 'Software & Cloud Subscriptions', 'Food & Chai on Shift'],
  },
  {
    id: 'driver',
    title: 'Cab & Auto Ride Driver',
    shortTitle: 'Cab / Auto Driver',
    icon: '🚗',
    description: 'Uber, Ola, Rapido, InDrive, BluSmart',
    color: '#2563EB',
    badgeBg: 'rgba(37, 99, 235, 0.12)',
    platforms: ['Uber', 'Ola', 'Rapido'],
    popularExpenses: ['Fuel & Petrol', 'Toll & Parking Fees', 'Vehicle & Health Insurance', 'Bike/Vehicle Maintenance'],
  },
  {
    id: 'services',
    title: 'Home & Professional Services',
    shortTitle: 'Home Services Pro',
    icon: '🛠️',
    description: 'Urban Company, Electrician, Plumber, AC Repair, Salon',
    color: '#00B074',
    badgeBg: 'rgba(0, 176, 116, 0.12)',
    platforms: ['Urban Company', 'Local Service Contracts'],
    popularExpenses: ['Tools & Raw Materials', 'Fuel & Petrol', 'Vehicle & Health Insurance'],
  },
  {
    id: 'logistics',
    title: 'Logistics & Courier Delivery',
    shortTitle: 'Logistics Courier',
    icon: '📦',
    description: 'Porter, Shadowfax, Dunzo, Amazon Flex, Delhivery',
    color: '#F59E0B',
    badgeBg: 'rgba(245, 158, 11, 0.12)',
    platforms: ['Porter', 'Shadowfax', 'Amazon Flex'],
    popularExpenses: ['Fuel & Petrol', 'Toll & Parking Fees', 'Bike/Vehicle Maintenance'],
  },
  {
    id: 'other',
    title: 'Other / Any Custom Occupation',
    shortTitle: 'Custom Occupation',
    icon: '✍️',
    description: 'Type any occupation: Delivery boy, Freelancer, Tutor, Photographer, etc.',
    color: '#64748B',
    badgeBg: 'rgba(100, 116, 139, 0.12)',
    platforms: ['Other Gigs'],
    popularExpenses: ['Miscellaneous Expense', 'Mobile Data & Phone Bill'],
  },
];

export const DEMO_PROFILES = [
  {
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    occupationId: 'delivery',
    customOccupation: '',
    occupationTitle: 'Delivery Boy',
    city: 'Bengaluru',
    dailyTarget: 2200,
  },
  {
    name: 'Pooja Verma',
    phone: '+91 98111 22334',
    occupationId: 'freelancer',
    customOccupation: 'Freelance Web & UI Designer',
    occupationTitle: 'Freelance Web & UI Designer',
    city: 'Pune',
    dailyTarget: 3500,
  },
  {
    name: 'Harpreet Singh',
    phone: '+91 97123 45678',
    occupationId: 'driver',
    customOccupation: '',
    occupationTitle: 'Cab / Auto Driver',
    city: 'Delhi NCR',
    dailyTarget: 3000,
  },
];

export const GIG_PLATFORMS = [
  { id: 'swiggy', name: 'Swiggy', icon: '🍔', color: '#FC8019', badgeBg: 'rgba(252, 128, 25, 0.12)' },
  { id: 'zomato', name: 'Zomato', icon: '🍕', color: '#E23744', badgeBg: 'rgba(226, 55, 68, 0.12)' },
  { id: 'uber', name: 'Uber', icon: '🚗', color: '#111827', badgeBg: 'rgba(17, 24, 39, 0.12)' },
  { id: 'zepto', name: 'Zepto', icon: '⚡', color: '#8800EC', badgeBg: 'rgba(136, 0, 236, 0.12)' },
  { id: 'blinkit', name: 'Blinkit', icon: '🛒', color: '#F8CB46', badgeBg: 'rgba(248, 203, 70, 0.18)' },
  { id: 'urban_company', name: 'Urban Company', icon: '🛠️', color: '#00B074', badgeBg: 'rgba(0, 176, 116, 0.12)' },
  { id: 'freelancing', name: 'Freelancing / Tech', icon: '💻', color: '#2563EB', badgeBg: 'rgba(37, 99, 235, 0.12)' },
  { id: 'other_income', name: 'Other Gigs', icon: '💼', color: '#64748B', badgeBg: 'rgba(100, 116, 139, 0.12)' },
];

export const EXPENSE_CATEGORIES = [
  { id: 'fuel', name: 'Fuel & Petrol', icon: '⛽', color: '#DC2626' },
  { id: 'food', name: 'Food & Chai on Shift', icon: '🍛', color: '#EA580C' },
  { id: 'maintenance', name: 'Bike/Vehicle Maintenance', icon: '🔧', color: '#D97706' },
  { id: 'mobile', name: 'Mobile Data & Phone Bill', icon: '📱', color: '#4F46E5' },
  { id: 'toll_parking', name: 'Toll & Parking Fees', icon: '🅿️', color: '#0891B2' },
  { id: 'insurance', name: 'Vehicle & Health Insurance', icon: '🛡️', color: '#059669' },
  { id: 'other_expense', name: 'Miscellaneous Expense', icon: '🛒', color: '#64748B' },
];

export const SEED_TRANSACTIONS = [
  {
    id: 'tx-101',
    type: 'income',
    title: 'Swiggy Dinner Shifts',
    category: 'Swiggy',
    platform: 'swiggy',
    amount: 4500,
    date: '2026-09-22',
    icon: '🍔',
    notes: 'Completed 28 deliveries with surge bonus',
  },
  {
    id: 'tx-102',
    type: 'expense',
    title: 'Shell Petrol Pump Refuel',
    category: 'Fuel & Petrol',
    platform: null,
    amount: 1400,
    date: '2026-09-22',
    icon: '⛽',
    notes: 'Tank full for week shifts (13.5L)',
  },
  {
    id: 'tx-103',
    type: 'income',
    title: 'Uber Weekend Rides',
    category: 'Uber',
    platform: 'uber',
    amount: 3800,
    date: '2026-09-21',
    icon: '🚗',
    notes: 'Airport round trips and city peaks',
  },
  {
    id: 'tx-104',
    type: 'expense',
    title: 'Dhaba Lunch & Evening Chai',
    category: 'Food & Chai on Shift',
    platform: null,
    amount: 450,
    date: '2026-09-21',
    icon: '🍛',
    notes: 'Lunch combo and tea breaks with peers',
  },
  {
    id: 'tx-105',
    type: 'income',
    title: 'Zepto Morning Batch Deliveries',
    category: 'Zepto',
    platform: 'zepto',
    amount: 2200,
    date: '2026-09-20',
    icon: '⚡',
    notes: '6am-11am quick grocery slot',
  },
  {
    id: 'tx-106',
    type: 'expense',
    title: 'Bike Engine Oil & Brake Pad Service',
    category: 'Bike/Vehicle Maintenance',
    platform: null,
    amount: 750,
    date: '2026-09-19',
    icon: '🔧',
    notes: 'Regular 3000km oil flush at local garage',
  },
  {
    id: 'tx-107',
    type: 'expense',
    title: 'Jio 5G Unlimited 84 Days Recharge',
    category: 'Mobile Data & Phone Bill',
    platform: null,
    amount: 399,
    date: '2026-09-18',
    icon: '📱',
    notes: 'Essential for GPS map tracking & delivery app',
  },
  {
    id: 'tx-108',
    type: 'income',
    title: 'Zomato Lunch Rush Hours',
    category: 'Zomato',
    platform: 'zomato',
    amount: 2950,
    date: '2026-09-17',
    icon: '🍕',
    notes: 'Rain incentive + customer tips',
  },
  {
    id: 'tx-109',
    type: 'income',
    title: 'Freelance Web Design & Logo Fix',
    category: 'Freelancing / Tech',
    platform: 'freelancing',
    amount: 3500,
    date: '2026-09-16',
    icon: '💻',
    notes: 'Direct client payment via UPI',
  },
  {
    id: 'tx-110',
    type: 'expense',
    title: 'Commercial Flyover Toll & Mall Parking',
    category: 'Toll & Parking Fees',
    platform: null,
    amount: 180,
    date: '2026-09-16',
    icon: '🅿️',
    notes: 'Waiting parking for pickup orders',
  },
];

const STORAGE_KEY = 'gigfinance_web_data_v1';
const GOAL_STORAGE_KEY = 'gigfinance_web_goal_v1';
const PROFILE_STORAGE_KEY = 'gigfinance_user_profile_v1';
const USERS_REGISTRY_KEY = 'gigfinance_users_registry_v1';

/**
 * User Profile & Persistent Registry Storage
 */
export function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(USERS_REGISTRY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn('Registered users read error:', err);
  }
  // Default seed accounts
  return [
    {
      id: 'usr-1',
      name: 'Ramesh Kumar',
      phone: '+91 98765 43210',
      city: 'Bengaluru',
      occupationId: 'delivery',
      customOccupation: '',
      occupationTitle: 'Delivery Boy',
      dailyTarget: 2200,
    },
    {
      id: 'usr-2',
      name: 'Pooja Verma',
      phone: '+91 98111 22334',
      city: 'Pune',
      occupationId: 'freelancer',
      customOccupation: 'Freelance Web & UI Designer',
      occupationTitle: 'Freelance Web & UI Designer',
      dailyTarget: 3500,
    },
    {
      id: 'usr-3',
      name: 'Harpreet Singh',
      phone: '+91 97123 45678',
      city: 'Delhi NCR',
      occupationId: 'driver',
      customOccupation: '',
      occupationTitle: 'Cab / Auto Driver',
      dailyTarget: 3000,
    },
  ];
}

export function saveRegisteredUser(profile) {
  try {
    const users = getRegisteredUsers();
    const cleanPhone = (profile.phone || '').replace(/\s+/g, '');
    const cleanName = (profile.name || '').trim().toLowerCase();

    const existingIndex = users.findIndex((u) => {
      const uPhone = (u.phone || '').replace(/\s+/g, '');
      const uName = (u.name || '').trim().toLowerCase();
      return (cleanPhone && uPhone === cleanPhone) || (cleanName && uName === cleanName);
    });

    const userRecord = {
      id: profile.id || `usr-${Date.now()}`,
      ...profile,
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...userRecord };
    } else {
      users.unshift(userRecord);
    }

    localStorage.setItem(USERS_REGISTRY_KEY, JSON.stringify(users));
    return userRecord;
  } catch (err) {
    console.error('Error saving to user registry:', err);
    return profile;
  }
}

export function findRegisteredUser(query) {
  if (!query) return null;
  const qClean = query.replace(/\s+/g, '').toLowerCase();
  const users = getRegisteredUsers();
  return users.find((u) => {
    const phoneClean = (u.phone || '').replace(/\s+/g, '').toLowerCase();
    const nameClean = (u.name || '').replace(/\s+/g, '').toLowerCase();
    return phoneClean.includes(qClean) || nameClean.includes(qClean);
  }) || null;
}

export function getUserProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Profile read error:', err);
  }
  return null;
}

export function saveUserProfile(profile) {
  try {
    const data = {
      ...profile,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data));
    saveRegisteredUser(data);
    return data;
  } catch (err) {
    console.error('Profile save error:', err);
    return profile;
  }
}

export function clearUserProfile() {
  try {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  } catch (err) {
    console.error('Logout error:', err);
  }
}

/**
 * Storage Helpers
 */
export function getStoredTransactions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('LocalStorage load error, using default seed data:', err);
  }
  return [...SEED_TRANSACTIONS];
}

export function saveTransactions(transactions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (err) {
    console.error('LocalStorage save error:', err);
  }
}

export function resetToSeedData() {
  localStorage.removeItem(STORAGE_KEY);
  return [...SEED_TRANSACTIONS];
}

/**
 * Daily Goal Tracking
 */
export function getDailyGoal() {
  try {
    const goal = localStorage.getItem(GOAL_STORAGE_KEY);
    return goal ? Number(goal) : 2000;
  } catch (e) {
    return 2000;
  }
}

export function saveDailyGoal(target) {
  try {
    localStorage.setItem(GOAL_STORAGE_KEY, String(target));
  } catch (e) {
    console.error(e);
  }
}

/**
 * Financial Calculation Helpers
 */
export function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return '₹' + num.toLocaleString('en-IN');
}

export function calculateSummary(transactions) {
  let totalEarnings = 0;
  let totalExpenses = 0;

  transactions.forEach((tx) => {
    const amt = Number(tx.amount) || 0;
    if (tx.type === 'income') {
      totalEarnings += amt;
    } else if (tx.type === 'expense') {
      totalExpenses += amt;
    }
  });

  const netIncome = totalEarnings - totalExpenses;
  const savingsRate = totalEarnings > 0 ? Math.round((netIncome / totalEarnings) * 100) : 0;
  const emergencyReserveTarget = Math.round(totalExpenses * 3); // 3 months of expense runway

  return {
    totalEarnings,
    totalExpenses,
    netIncome,
    savingsRate,
    emergencyReserveTarget,
    transactionCount: transactions.length,
  };
}

export function getExpenseBreakdown(transactions) {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const total = expenses.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const map = {};
  expenses.forEach((t) => {
    const cat = t.category || 'Other';
    if (!map[cat]) {
      const match = EXPENSE_CATEGORIES.find((c) => c.name === cat);
      map[cat] = {
        name: cat,
        amount: 0,
        icon: t.icon || (match ? match.icon : '💸'),
        color: match ? match.color : '#64748B',
      };
    }
    map[cat].amount += Number(t.amount) || 0;
  });

  return Object.values(map)
    .map((item) => ({
      ...item,
      percentage: total > 0 ? Math.round((item.amount / total) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function getPlatformBreakdown(transactions) {
  const incomes = transactions.filter((t) => t.type === 'income');
  const total = incomes.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const map = {};
  incomes.forEach((t) => {
    const name = t.category || t.title || 'Other';
    if (!map[name]) {
      const match = GIG_PLATFORMS.find((p) => p.name === name || p.id === t.platform);
      map[name] = {
        name,
        amount: 0,
        icon: t.icon || (match ? match.icon : '💰'),
        color: match ? match.color : '#2563EB',
      };
    }
    map[name].amount += Number(t.amount) || 0;
  });

  return Object.values(map)
    .map((item) => ({
      ...item,
      percentage: total > 0 ? Math.round((item.amount / total) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function exportToCSV(transactions) {
  const headers = ['ID', 'Type', 'Title / Platform', 'Category', 'Amount (INR)', 'Date', 'Notes'];
  const rows = transactions.map((t) => [
    t.id,
    t.type.toUpperCase(),
    `"${(t.title || '').replace(/"/g, '""')}"`,
    `"${(t.category || '').replace(/"/g, '""')}"`,
    t.amount,
    t.date,
    `"${(t.notes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `GigFinance_Report_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
