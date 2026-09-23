/**
 * GigFinance Web - Main Application Controller
 */

import {
  OCCUPATIONS,
  DEMO_PROFILES,
  GIG_PLATFORMS,
  EXPENSE_CATEGORIES,
  getRegisteredUsers,
  findRegisteredUser,
  getUserProfile,
  saveUserProfile,
  clearUserProfile,
  getStoredTransactions,
  saveTransactions,
  resetToSeedData,
  formatCurrency,
  calculateSummary,
  getExpenseBreakdown,
  getPlatformBreakdown,
  exportToCSV,
  getDailyGoal,
  saveDailyGoal,
} from './data.js';

import { renderTrendChart, renderDonutChart } from './charts.js';

// Application State
let currentUser = getUserProfile();
let transactions = getStoredTransactions();
let dailyGoal = getDailyGoal();
let activeFilter = 'all';
let searchQuery = '';
let currentModalType = 'income';
let selectedCategory = '';

// Auth / Registration & Onboarding State
let selectedOccupationId = 'delivery';
let editSelectedOccId = 'delivery';
let tempProfile = {
  name: '',
  phone: '',
  city: '',
};

// DOM Elements
const authView = document.getElementById('authView');
const dashboardView = document.getElementById('dashboardView');
const userProfileMenuWrap = document.getElementById('userProfileMenuWrap');
const userProfileBtn = document.getElementById('userProfileBtn');
const userDropdownMenu = document.getElementById('userDropdownMenu');
const userAvatarIcon = document.getElementById('userAvatarIcon');
const navUserName = document.getElementById('navUserName');
const navUserOccupation = document.getElementById('navUserOccupation');

const bannerGreeting = document.getElementById('bannerGreeting');
const bannerOccIcon = document.getElementById('bannerOccIcon');
const bannerOccSubtitle = document.getElementById('bannerOccSubtitle');

const netSavingsEl = document.getElementById('netSavingsVal');
const netSavingsSubEl = document.getElementById('netSavingsSub');
const totalInflowEl = document.getElementById('totalInflowVal');
const totalOutflowEl = document.getElementById('totalOutflowVal');
const emergencyTargetEl = document.getElementById('emergencyTargetVal');
const txCountBadgeEl = document.getElementById('txCountBadge');

const goalTargetLabel = document.getElementById('goalTargetLabel');
const goalCurrentLabel = document.getElementById('goalCurrentLabel');
const goalProgressBar = document.getElementById('goalProgressBar');

const platformChipsWrap = document.getElementById('platformChipsWrap');
const expenseLegendList = document.getElementById('expenseLegendList');
const txTableBody = document.getElementById('txTableBody');
const searchInput = document.getElementById('ledgerSearchInput');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupEventListeners();
  renderOccupationCards();
  checkAuthAndRender();
});

/**
 * Check Authentication State
 */
function checkAuthAndRender() {
  currentUser = getUserProfile();

  if (currentUser && currentUser.name) {
    // User is logged in -> Show Dashboard
    authView.style.display = 'none';
    dashboardView.style.display = 'block';
    userProfileMenuWrap.style.display = 'block';

    const occObj = OCCUPATIONS.find((o) => o.id === currentUser.occupationId) || OCCUPATIONS[0];
    const occTitle = currentUser.customOccupation || occObj.shortTitle || occObj.title;

    // Update Navbar Profile
    navUserName.textContent = currentUser.name;
    navUserOccupation.textContent = occTitle;
    userAvatarIcon.textContent = occObj.icon;

    // Update Banner Greeting
    if (bannerGreeting) {
      bannerGreeting.textContent = `Welcome back, ${currentUser.name}! 🎯`;
    }
    if (bannerOccIcon) {
      bannerOccIcon.textContent = occObj.icon;
    }
    if (bannerOccSubtitle) {
      bannerOccSubtitle.textContent = `Tracking shifts as ${occTitle} in ${currentUser.city || 'India'}`;
    }

    renderDashboard();
  } else {
    // User is logged out -> Show Auth View
    authView.style.display = 'flex';
    dashboardView.style.display = 'none';
    userProfileMenuWrap.style.display = 'none';

    // Reset 2-Step wizard to Step 1
    const step1 = document.getElementById('authStep1Container');
    const step2 = document.getElementById('authStep2Container');
    const ind1 = document.getElementById('authStep1Indicator');
    const ind2 = document.getElementById('authStep2Indicator');
    if (step1) step1.style.display = 'block';
    if (step2) step2.style.display = 'none';
    if (ind1) {
      ind1.classList.add('active');
      ind1.classList.remove('completed');
    }
    if (ind2) ind2.classList.remove('active');

    renderSavedAccounts();
  }
}

/**
 * Render Saved / Remembered Accounts on this device
 */
function renderSavedAccounts() {
  const grid = document.getElementById('savedAccountsGrid');
  if (!grid) return;
  const users = getRegisteredUsers();
  if (!users || users.length === 0) {
    grid.innerHTML = '<div style="font-size:12px; color:var(--text-secondary); padding: 8px;">No accounts stored on this device yet.</div>';
    return;
  }

  grid.innerHTML = users.slice(0, 4).map((u) => {
    const occObj = OCCUPATIONS.find((o) => o.id === u.occupationId) || OCCUPATIONS[0];
    const roleTitle = u.customOccupation || u.occupationTitle || occObj.shortTitle;
    return `
      <div class="saved-account-card" onclick="window.selectSavedAccount('${u.id}')">
        <div class="saved-account-info">
          <span class="saved-account-icon">${occObj.icon}</span>
          <div>
            <div class="saved-account-name">${u.name}</div>
            <div class="saved-account-sub">${roleTitle} • ${u.city || 'India'}</div>
          </div>
        </div>
        <button type="button" class="btn btn-outline" style="padding: 4px 10px; font-size: 11.5px; border-radius: 8px;">
          Log In ➔
        </button>
      </div>
    `;
  }).join('');
}

window.selectSavedAccount = (userId) => {
  const users = getRegisteredUsers();
  const found = users.find((u) => u.id === userId);
  if (found) {
    const occObj = OCCUPATIONS.find((o) => o.id === found.occupationId) || OCCUPATIONS[0];
    saveUserProfile({
      ...found,
      occupationTitle: found.customOccupation || found.occupationTitle || occObj.shortTitle,
      isLoggedIn: true,
    });
    if (found.dailyTarget) {
      dailyGoal = found.dailyTarget;
      saveDailyGoal(dailyGoal);
    }
    checkAuthAndRender();
    showToast(`Welcome back, ${found.name}! (${found.customOccupation || occObj.shortTitle}) 🎯`);
  }
};

/**
 * Render Occupation Cards on Auth Form
 */
function renderOccupationCards() {
  const grid = document.getElementById('occupationsGrid');
  if (!grid) return;

  grid.innerHTML = OCCUPATIONS.map(
    (occ) => `
    <div
      class="occupation-card ${occ.id === selectedOccupationId ? 'selected' : ''}"
      onclick="window.selectOccupation('${occ.id}')"
    >
      <div class="occ-check">✓</div>
      <div class="occ-top">
        <span class="occ-icon">${occ.icon}</span>
        <div>
          <div class="occ-title">${occ.title}</div>
          <span style="font-size:10.5px; font-weight:700; color:var(--primary);">${occ.shortTitle}</span>
        </div>
      </div>
      <div class="occ-desc">${occ.description}</div>
    </div>
  `
  ).join('');

  // Toggle custom input field
  const customWrap = document.getElementById('customOccupationWrap');
  if (customWrap) {
    customWrap.style.display = selectedOccupationId === 'other' ? 'block' : 'none';
  }
}

window.selectOccupation = (id) => {
  selectedOccupationId = id;
  renderOccupationCards();
};

/**
 * Render Edit Occupation Cards inside Edit Modal
 */
function renderEditOccupationCards() {
  const grid = document.getElementById('editOccupationsGrid');
  if (!grid) return;

  grid.innerHTML = OCCUPATIONS.map(
    (occ) => `
    <div
      class="occupation-card ${occ.id === editSelectedOccId ? 'selected' : ''}"
      onclick="window.selectEditOccupation('${occ.id}')"
    >
      <div class="occ-check">✓</div>
      <div class="occ-top">
        <span class="occ-icon">${occ.icon}</span>
        <div>
          <div class="occ-title">${occ.title}</div>
          <span style="font-size:10.5px; font-weight:700; color:var(--primary);">${occ.shortTitle}</span>
        </div>
      </div>
      <div class="occ-desc">${occ.description}</div>
    </div>
  `
  ).join('');

  const editCustomWrap = document.getElementById('editCustomOccWrap');
  if (editCustomWrap) {
    editCustomWrap.style.display = editSelectedOccId === 'other' ? 'block' : 'none';
  }
}

window.selectEditOccupation = (id) => {
  editSelectedOccId = id;
  renderEditOccupationCards();
};

/**
 * Quick 1-Click Demo Profiles
 */
window.quickDemoLogin = (occupationId) => {
  const demo = DEMO_PROFILES.find((p) => p.occupationId === occupationId) || DEMO_PROFILES[0];
  const occ = OCCUPATIONS.find((o) => o.id === demo.occupationId);

  const profile = {
    name: demo.name,
    phone: demo.phone,
    city: demo.city,
    occupationId: demo.occupationId,
    customOccupation: demo.customOccupation,
    occupationTitle: demo.customOccupation || (occ ? occ.title : 'Gig Worker'),
    dailyTarget: demo.dailyTarget,
    isLoggedIn: true,
  };

  saveUserProfile(profile);
  dailyGoal = demo.dailyTarget;
  saveDailyGoal(dailyGoal);

  checkAuthAndRender();
  showToast(`Logged in as ${profile.name} (${occ.shortTitle})! 🚀`);
};

/**
 * Master Dashboard Render
 */
function renderDashboard() {
  const summary = calculateSummary(transactions);

  // Update Top Metric Cards
  netSavingsEl.textContent = formatCurrency(summary.netIncome);
  netSavingsSubEl.textContent = `${summary.savingsRate}% of gig revenue saved`;
  totalInflowEl.textContent = formatCurrency(summary.totalEarnings);
  totalOutflowEl.textContent = formatCurrency(summary.totalExpenses);
  emergencyTargetEl.textContent = formatCurrency(summary.emergencyReserveTarget);
  txCountBadgeEl.textContent = `${summary.transactionCount} entries`;

  // Update Daily Target Progress
  updateDailyGoalUI();

  // Render Native SVG Charts
  renderTrendChart('trendChartContainer', transactions);

  const expenseBreakdown = getExpenseBreakdown(transactions);
  renderDonutChart(
    'donutChartContainer',
    expenseBreakdown,
    formatCurrency(summary.totalExpenses),
    'Total Outflow'
  );

  // Render Breakdown Legend
  renderExpenseLegend(expenseBreakdown);

  // Render Platform Chips
  renderPlatformChips();

  // Render Ledger Table
  renderLedger();

  // Update Calculator defaults
  calculateFuelCosts();
}

/**
 * Render Daily Goal
 */
function updateDailyGoalUI() {
  const todayStr = new Date().toISOString().slice(0, 10);
  const todaysEarnings = transactions
    .filter((t) => t.type === 'income' && t.date === todayStr)
    .reduce((s, t) => s + Number(t.amount || 0), 0);

  const percent = Math.min(Math.round((todaysEarnings / dailyGoal) * 100), 100);
  goalTargetLabel.textContent = formatCurrency(dailyGoal);
  goalCurrentLabel.textContent = `${formatCurrency(todaysEarnings)} (${percent}%)`;
  goalProgressBar.style.width = `${percent}%`;
}

/**
 * Render Platform Inflow Chips
 */
function renderPlatformChips() {
  const breakdown = getPlatformBreakdown(transactions);
  if (!platformChipsWrap) return;

  if (breakdown.length === 0) {
    platformChipsWrap.innerHTML = `<span style="font-size:12px; color:var(--text-muted);">No income logged yet.</span>`;
    return;
  }

  platformChipsWrap.innerHTML = breakdown
    .map(
      (p) => `
      <div class="platform-chip">
        <span>${p.icon}</span>
        <strong>${p.name}</strong>
        <span style="color:var(--income); font-weight:700;">${formatCurrency(p.amount)}</span>
        <span style="font-size:10px; color:var(--text-muted);">(${p.percentage}%)</span>
      </div>
    `
    )
    .join('');
}

/**
 * Render Expense Legend
 */
function renderExpenseLegend(items) {
  if (!expenseLegendList) return;

  if (items.length === 0) {
    expenseLegendList.innerHTML = `<span style="font-size:12px; color:var(--text-muted);">No expenses recorded.</span>`;
    return;
  }

  expenseLegendList.innerHTML = items
    .slice(0, 4)
    .map(
      (item) => `
      <div class="breakdown-row">
        <div class="breakdown-header-line">
          <div class="item-badge-wrap">
            <span>${item.icon}</span>
            <span>${item.name}</span>
          </div>
          <span style="font-weight:700; color:var(--expense);">${formatCurrency(item.amount)} <small style="color:var(--text-muted); font-weight:normal;">(${item.percentage}%)</small></span>
        </div>
        <div class="progress-track" style="height:6px; background:var(--bg-surface-alt);">
          <div class="progress-bar-fill" style="width:${item.percentage}%; background:${item.color};"></div>
        </div>
      </div>
    `
    )
    .join('');
}

/**
 * Render Transaction Ledger Table
 */
function renderLedger() {
  if (!txTableBody) return;

  const query = searchQuery.toLowerCase().trim();
  const filtered = transactions.filter((t) => {
    if (activeFilter !== 'all' && t.type !== activeFilter) return false;
    if (query) {
      const matchTitle = (t.title || '').toLowerCase().includes(query);
      const matchCat = (t.category || '').toLowerCase().includes(query);
      const matchNote = (t.notes || '').toLowerCase().includes(query);
      if (!matchTitle && !matchCat && !matchNote) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    txTableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary);">
          <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
          <strong>No matching transactions found</strong>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Try adjusting your search filter or add a new entry.</p>
        </td>
      </tr>
    `;
    return;
  }

  txTableBody.innerHTML = filtered
    .map((tx) => {
      const isInc = tx.type === 'income';
      const badgeClass = isInc ? 'badge-tag tag-green' : 'badge-tag tag-red';
      const iconBoxBg = isInc ? 'var(--income-bg)' : 'var(--expense-bg)';
      const amountColor = isInc ? 'var(--income)' : 'var(--expense)';
      const sign = isInc ? '+ ' : '− ';

      return `
      <tr>
        <td>
          <div class="tx-title-col">
            <div class="tx-icon-box" style="background:${iconBoxBg};">
              ${tx.icon || (isInc ? '💰' : '💸')}
            </div>
            <div>
              <div class="tx-primary-name">${escapeHtml(tx.title || tx.category)}</div>
              <div class="tx-note-sub">${escapeHtml(tx.notes || 'No notes added')}</div>
            </div>
          </div>
        </td>
        <td>
          <span style="font-size: 12px; font-weight: 600; color: var(--text-secondary);">
            ${escapeHtml(tx.category)}
          </span>
        </td>
        <td>
          <span class="${badgeClass}">
            ${isInc ? 'INFLOW' : 'OUTFLOW'}
          </span>
        </td>
        <td>
          <span style="font-size: 12.5px; color: var(--text-secondary);">
            ${tx.date}
          </span>
        </td>
        <td>
          <span class="tx-amount-badge" style="color: ${amountColor};">
            ${sign}${formatCurrency(tx.amount)}
          </span>
        </td>
        <td style="text-align: right;">
          <button class="btn-delete" title="Delete transaction" onclick="window.deleteTx('${tx.id}')">
            🗑️
          </button>
        </td>
      </tr>
    `;
    })
    .join('');
}

/**
 * Event Listeners Setup
 */
function setupEventListeners() {
  // Theme Toggle
  document.getElementById('themeToggleBtn')?.addEventListener('click', toggleTheme);

  // Step 1: Proceed to Step 2 (Select / Add Occupation)
  const btnGoToStep2 = document.getElementById('btnGoToStep2');
  if (btnGoToStep2) {
    btnGoToStep2.addEventListener('click', () => {
      const fullName = document.getElementById('authFullName')?.value.trim();
      const phone = document.getElementById('authPhone')?.value.trim();
      const city = document.getElementById('authCity')?.value.trim() || 'India';

      if (!fullName) {
        alert('Please enter your full name to proceed.');
        document.getElementById('authFullName')?.focus();
        return;
      }
      if (!phone) {
        alert('Please enter your mobile phone number.');
        document.getElementById('authPhone')?.focus();
        return;
      }

      tempProfile = { name: fullName, phone, city };

      // Update Step 2 Header summary
      const userSummaryEl = document.getElementById('step2UserSummary');
      if (userSummaryEl) {
        userSummaryEl.textContent = `${fullName} • ${phone} (${city})`;
      }

      // Flip views to Step 2
      document.getElementById('authStep1Container').style.display = 'none';
      document.getElementById('authStep2Container').style.display = 'block';

      // Update Stepper indicators
      const ind1 = document.getElementById('authStep1Indicator');
      const ind2 = document.getElementById('authStep2Indicator');
      if (ind1) {
        ind1.classList.remove('active');
        ind1.classList.add('completed');
      }
      if (ind2) ind2.classList.add('active');

      renderOccupationCards();
    });
  }

  // Step 2: Back to Step 1
  const backToStep1Handler = () => {
    document.getElementById('authStep1Container').style.display = 'block';
    document.getElementById('authStep2Container').style.display = 'none';

    const ind1 = document.getElementById('authStep1Indicator');
    const ind2 = document.getElementById('authStep2Indicator');
    if (ind1) {
      ind1.classList.add('active');
      ind1.classList.remove('completed');
    }
    if (ind2) ind2.classList.remove('active');
  };

  document.getElementById('btnBackToStep1')?.addEventListener('click', backToStep1Handler);
  document.getElementById('btnBackToStep1Secondary')?.addEventListener('click', backToStep1Handler);

  // Step 2: Save Occupation & Open Dashboard
  document.getElementById('btnCompleteProfile')?.addEventListener('click', () => {
    const occObj = OCCUPATIONS.find((o) => o.id === selectedOccupationId) || OCCUPATIONS[0];
    const customOcc = document.getElementById('authCustomOcc')?.value.trim();
    const dailyGoalVal = Number(document.getElementById('authDailyGoal')?.value || 2000);

    const finalOccTitle = (selectedOccupationId === 'other' && customOcc)
      ? customOcc
      : (customOcc || occObj.shortTitle || occObj.title);

    const profile = {
      name: tempProfile.name || 'Gig Worker',
      phone: tempProfile.phone || '+91 98765 43210',
      city: tempProfile.city || 'India',
      occupationId: selectedOccupationId,
      customOccupation: customOcc || '',
      occupationTitle: finalOccTitle,
      dailyTarget: dailyGoalVal,
      isLoggedIn: true,
    };

    saveUserProfile(profile);
    dailyGoal = dailyGoalVal;
    saveDailyGoal(dailyGoal);

    checkAuthAndRender();
    showToast(`Occupation saved! Welcome, ${profile.name} (${finalOccTitle})! 🚀`);
  });

  // Step 1 Tabs: Create Profile vs Returning User Sign In
  const tabRegisterBtn = document.getElementById('tabRegisterBtn');
  const tabLoginBtn = document.getElementById('tabLoginBtn');
  const registerFormWrap = document.getElementById('registerFormWrap');
  const loginFormWrap = document.getElementById('loginFormWrap');

  if (tabRegisterBtn && tabLoginBtn) {
    tabRegisterBtn.addEventListener('click', () => {
      tabRegisterBtn.classList.add('active');
      tabLoginBtn.classList.remove('active');
      if (registerFormWrap) registerFormWrap.style.display = 'block';
      if (loginFormWrap) loginFormWrap.style.display = 'none';
    });

    tabLoginBtn.addEventListener('click', () => {
      tabLoginBtn.classList.add('active');
      tabRegisterBtn.classList.remove('active');
      if (registerFormWrap) registerFormWrap.style.display = 'none';
      if (loginFormWrap) loginFormWrap.style.display = 'block';
      renderSavedAccounts();
    });
  }

  // Returning User Direct Sign In
  document.getElementById('btnLoginDirect')?.addEventListener('click', () => {
    const query = document.getElementById('loginSearchInput')?.value.trim();
    if (!query) {
      alert('Please enter your mobile number or name to sign in, or click one of the saved accounts above.');
      return;
    }

    const found = findRegisteredUser(query);
    if (found) {
      const occObj = OCCUPATIONS.find((o) => o.id === found.occupationId) || OCCUPATIONS[0];
      saveUserProfile({
        ...found,
        occupationTitle: found.customOccupation || found.occupationTitle || occObj.shortTitle,
        isLoggedIn: true,
      });
      if (found.dailyTarget) {
        dailyGoal = found.dailyTarget;
        saveDailyGoal(dailyGoal);
      }
      checkAuthAndRender();
      showToast(`Welcome back, ${found.name}! (${found.customOccupation || occObj.shortTitle}) 🎉`);
    } else {
      alert(`No profile found matching "${query}". Please click "Create New Profile" to register your details and occupation.`);
    }
  });

  // Banner Change Occupation button
  document.getElementById('bannerChangeOccBtn')?.addEventListener('click', () => {
    openEditProfileModal();
  });

  // Navbar Profile Dropdown
  userProfileBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdownMenu?.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    userDropdownMenu?.classList.remove('show');
  });

  // Edit Profile Menu Option
  document.getElementById('editProfileMenuBtn')?.addEventListener('click', () => {
    userDropdownMenu?.classList.remove('show');
    openEditProfileModal();
  });

  // Switch Role Menu Option
  document.getElementById('switchProfileMenuBtn')?.addEventListener('click', () => {
    userDropdownMenu?.classList.remove('show');
    openEditProfileModal();
  });

  // Logout Menu Option
  document.getElementById('logoutMenuBtn')?.addEventListener('click', () => {
    userDropdownMenu?.classList.remove('show');
    if (confirm('Are you sure you want to sign out? Your financial records will remain saved on this device.')) {
      clearUserProfile();
      checkAuthAndRender();
      showToast('Signed out successfully.');
    }
  });

  // Edit Profile Form Submission
  const editProfileForm = document.getElementById('editProfileForm');
  if (editProfileForm) {
    editProfileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedName = document.getElementById('editProfileName')?.value.trim();
      const updatedPhone = document.getElementById('editProfilePhone')?.value.trim();
      const updatedCity = document.getElementById('editProfileCity')?.value.trim();
      const updatedCustomOcc = document.getElementById('editCustomOccInput')?.value.trim();

      const occObj = OCCUPATIONS.find((o) => o.id === editSelectedOccId);

      const updatedProfile = {
        ...currentUser,
        name: updatedName || currentUser.name,
        phone: updatedPhone || currentUser.phone,
        city: updatedCity || currentUser.city,
        occupationId: editSelectedOccId,
        customOccupation: editSelectedOccId === 'other' ? updatedCustomOcc : '',
        occupationTitle: (editSelectedOccId === 'other' && updatedCustomOcc) ? updatedCustomOcc : (occObj ? occObj.title : 'Gig Worker'),
      };

      saveUserProfile(updatedProfile);
      closeEditProfileModal();
      checkAuthAndRender();
      showToast('Profile & Occupation updated successfully! ✨');
    });
  }

  document.getElementById('closeEditProfileBtn')?.addEventListener('click', closeEditProfileModal);
  document.getElementById('cancelEditProfileBtn')?.addEventListener('click', closeEditProfileModal);

  // Filter Pills (All / Inflow / Outflow)
  document.querySelectorAll('.filter-pill').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-pill').forEach((b) => b.classList.remove('active'));
      e.target.classList.add('active');
      activeFilter = e.target.dataset.filter;
      renderLedger();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderLedger();
    });
  }

  // Export CSV
  document.getElementById('exportCsvBtn')?.addEventListener('click', () => {
    exportToCSV(transactions);
    showToast('Exported transaction ledger as CSV! 📥');
  });

  // Reset Demo Data
  document.getElementById('resetDataBtn')?.addEventListener('click', () => {
    if (confirm('Reset transactions and daily target back to initial demo data?')) {
      transactions = resetToSeedData();
      saveTransactions(transactions);
      dailyGoal = 2000;
      saveDailyGoal(dailyGoal);
      renderDashboard();
      showToast('Sample demo data restored! 🔄');
    }
  });

  // Modal Open Buttons
  document.getElementById('openAddIncomeBtn')?.addEventListener('click', () => openModal('income'));
  document.getElementById('openAddExpenseBtn')?.addEventListener('click', () => openModal('expense'));
  document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
  document.getElementById('cancelModalBtn')?.addEventListener('click', closeModal);

  // Modal Background click
  document.getElementById('addModalBackdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'addModalBackdrop') closeModal();
  });
  document.getElementById('editProfileModalBackdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'editProfileModalBackdrop') closeEditProfileModal();
  });

  // Modal Save
  document.getElementById('saveModalBtn')?.addEventListener('click', saveNewTransaction);

  // Edit Goal Button
  document.getElementById('editGoalBtn')?.addEventListener('click', () => {
    const val = prompt('Enter your daily earnings target in ₹:', String(dailyGoal));
    if (val && !isNaN(Number(val)) && Number(val) > 0) {
      dailyGoal = Number(val);
      saveDailyGoal(dailyGoal);
      updateDailyGoalUI();
      showToast(`Daily shift target updated to ${formatCurrency(dailyGoal)}! 🎯`);
    }
  });

  // Fuel Calculator Inputs
  ['fuelDistInput', 'fuelMileageInput', 'petrolPriceInput'].forEach((id) => {
    document.getElementById(id)?.addEventListener('input', calculateFuelCosts);
  });

  // Global window delete handler
  window.deleteTx = (id) => {
    if (confirm('Remove this transaction record?')) {
      transactions = transactions.filter((t) => t.id !== id);
      saveTransactions(transactions);
      renderDashboard();
      showToast('Transaction deleted.');
    }
  };
}

/**
 * Open Edit Profile & Occupation Modal
 */
function openEditProfileModal() {
  if (!currentUser) return;

  const nameInput = document.getElementById('editProfileName');
  const phoneInput = document.getElementById('editProfilePhone');
  const cityInput = document.getElementById('editProfileCity');
  const customOccInput = document.getElementById('editCustomOccInput');

  if (nameInput) nameInput.value = currentUser.name || '';
  if (phoneInput) phoneInput.value = currentUser.phone || '';
  if (cityInput) cityInput.value = currentUser.city || '';
  if (customOccInput) customOccInput.value = currentUser.customOccupation || '';

  editSelectedOccId = currentUser.occupationId || 'delivery';
  renderEditOccupationCards();

  const backdrop = document.getElementById('editProfileModalBackdrop');
  if (backdrop) backdrop.classList.add('show');
}

function closeEditProfileModal() {
  const backdrop = document.getElementById('editProfileModalBackdrop');
  if (backdrop) backdrop.classList.remove('show');
}

/**
 * Fuel Mileage Calculator
 */
function calculateFuelCosts() {
  const dist = Number(document.getElementById('fuelDistInput')?.value || 85);
  const mileage = Number(document.getElementById('fuelMileageInput')?.value || 45);
  const price = Number(document.getElementById('petrolPriceInput')?.value || 103);

  if (mileage > 0) {
    const litresNeeded = dist / mileage;
    const totalCost = Math.round(litresNeeded * price);
    const costPerKm = (totalCost / dist).toFixed(2);

    const costEl = document.getElementById('calcFuelCost');
    const perKmEl = document.getElementById('calcCostPerKm');
    if (costEl) costEl.textContent = formatCurrency(totalCost);
    if (perKmEl) perKmEl.textContent = `₹${costPerKm}/km`;
  }
}

/**
 * Add Transaction Modal Logic
 */
function openModal(type) {
  currentModalType = type;
  const isInc = type === 'income';
  const categories = isInc ? GIG_PLATFORMS : EXPENSE_CATEGORIES;
  selectedCategory = categories[0]?.name || '';

  const modalHeadline = document.getElementById('modalHeadline');
  const modalTypeBadge = document.getElementById('modalTypeBadge');
  const catLabel = document.getElementById('modalCatLabel');
  const saveBtn = document.getElementById('saveModalBtn');

  if (modalHeadline) modalHeadline.textContent = isInc ? 'Log Gig Earnings' : 'Record Work Expense';
  if (modalTypeBadge) {
    modalTypeBadge.className = isInc ? 'badge-tag tag-green' : 'badge-tag tag-red';
    modalTypeBadge.textContent = isInc ? '+ INFLOW' : '− OUTFLOW';
  }
  if (catLabel) catLabel.textContent = isInc ? 'Gig Platform / Source' : 'Expense Category';

  if (saveBtn) {
    saveBtn.textContent = isInc ? 'Save Earnings' : 'Save Expense';
    saveBtn.className = isInc ? 'btn btn-income' : 'btn btn-expense';
  }

  const amtInput = document.getElementById('modalAmountInput');
  const titleInput = document.getElementById('modalTitleInput');
  const notesInput = document.getElementById('modalNotesInput');
  const dateInput = document.getElementById('modalDateInput');

  if (amtInput) amtInput.value = '';
  if (titleInput) titleInput.value = '';
  if (notesInput) notesInput.value = '';
  if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);

  renderModalChips(categories);

  const backdrop = document.getElementById('addModalBackdrop');
  if (backdrop) backdrop.classList.add('show');
}

function renderModalChips(categories) {
  const container = document.getElementById('modalChipsGrid');
  if (!container) return;

  container.innerHTML = categories
    .map(
      (c) => `
      <button type="button" class="modal-chip-btn ${c.name === selectedCategory ? 'selected' : ''}" onclick="window.selectModalCategory('${c.name}')">
        <span>${c.icon}</span>
        <span>${c.name}</span>
      </button>
    `
    )
    .join('');
}

window.selectModalCategory = (catName) => {
  selectedCategory = catName;
  const isInc = currentModalType === 'income';
  const categories = isInc ? GIG_PLATFORMS : EXPENSE_CATEGORIES;
  renderModalChips(categories);
};

function closeModal() {
  const backdrop = document.getElementById('addModalBackdrop');
  if (backdrop) backdrop.classList.remove('show');
}

function saveNewTransaction() {
  const amtVal = parseFloat(document.getElementById('modalAmountInput')?.value);
  if (!amtVal || isNaN(amtVal) || amtVal <= 0) {
    alert('Please enter a valid amount greater than ₹0.');
    return;
  }

  const isInc = currentModalType === 'income';
  const categories = isInc ? GIG_PLATFORMS : EXPENSE_CATEGORIES;
  const matched = categories.find((c) => c.name === selectedCategory);

  const customTitle = document.getElementById('modalTitleInput')?.value.trim();
  const notes = document.getElementById('modalNotesInput')?.value.trim();
  const date = document.getElementById('modalDateInput')?.value || new Date().toISOString().slice(0, 10);

  const newTx = {
    id: 'tx-' + Date.now(),
    type: currentModalType,
    title: customTitle || selectedCategory,
    category: selectedCategory,
    platform: isInc && matched ? matched.id : null,
    amount: amtVal,
    date: date,
    icon: matched ? matched.icon : isInc ? '💰' : '💸',
    notes: notes,
  };

  transactions.unshift(newTx);
  saveTransactions(transactions);
  closeModal();
  renderDashboard();
  showToast(`Added ${formatCurrency(amtVal)} ${isInc ? 'earnings' : 'expense'}! ✨`);
}

/**
 * Toast Notice
 */
function showToast(message) {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/**
 * Theme Engine
 */
function initTheme() {
  const saved = localStorage.getItem('gigfinance_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('gigfinance_theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggleBtn');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
