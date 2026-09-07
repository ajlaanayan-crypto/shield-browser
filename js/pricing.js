/**
 * ShieldBrowser — 6-Tier Pricing Pass Selector & In-App Activation Guide
 * Note: Strictly aligns with user specification: all payment and pass activations
 * are completed natively inside the macOS application.
 */

const PRICING_PLANS = {
  'plan-24hr': {
    id: '24hr',
    title: '24 Hours Pass',
    price: 199,
    duration: '24 Hours (86,400s)',
    tagline: "Emergency 1-day pass for today's critical interview"
  },
  'plan-3days': {
    id: '3days',
    title: '3 Days Sprint',
    price: 349,
    duration: '3 Days (259,200s)',
    tagline: 'Multi-round interview sprint & weekend assessments'
  },
  'plan-7days': {
    id: '7days',
    title: '7 Days Pass',
    price: 499,
    duration: '7 Days (604,800s)',
    tagline: 'Most Popular • Complete job hunting & interview week'
  },
  'plan-1month': {
    id: '1month',
    title: '1 Month Pro',
    price: 999,
    duration: '30 Days',
    tagline: 'Freelancers, remote contractors & confidential daily meetings'
  },
  'plan-3months': {
    id: '3months',
    title: '3 Months Semester',
    price: 1999,
    duration: '90 Days',
    tagline: 'Semester exams, technical bootcamps & job probation'
  },
  'plan-1year': {
    id: '1year',
    title: '1 Year Pass',
    price: 3999,
    duration: '365 Days',
    tagline: 'Annual pro pass (Auto-expiring, no recurring subscription trap)'
  }
};

let currentSelectedPlan = PRICING_PLANS['plan-7days']; // Default

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.pricing-card');
  const proceedBtn = document.getElementById('btn-proceed-in-app');
  const selectedPlanSummary = document.getElementById('selected-plan-summary-text');
  const modal = document.getElementById('in-app-activation-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalPlanTitle = document.getElementById('modal-plan-title');
  const modalPlanPrice = document.getElementById('modal-plan-price');

  // Select-First State Machine
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const planKey = card.getAttribute('data-plan-id');
      if (!PRICING_PLANS[planKey]) return;

      currentSelectedPlan = PRICING_PLANS[planKey];

      // Update card visual state
      cards.forEach(c => {
        c.classList.remove('selected');
        const indicator = c.querySelector('.plan-select-indicator');
        if (indicator) indicator.textContent = 'Select Pass';
      });

      card.classList.add('selected');
      const activeIndicator = card.querySelector('.plan-select-indicator');
      if (activeIndicator) activeIndicator.textContent = 'Selected ✓';

      // Update Summary & Action CTA
      if (selectedPlanSummary) {
        selectedPlanSummary.innerHTML = `Selected Pass: <span class="plan-glow">${currentSelectedPlan.title} (₹${currentSelectedPlan.price})</span> • ${currentSelectedPlan.tagline}`;
      }

      if (proceedBtn) {
        proceedBtn.innerHTML = `<span></span> Activate ${currentSelectedPlan.title} (₹${currentSelectedPlan.price}) in ShieldBrowser App →`;
      }
    });
  });

  // Action Button Click -> Opens In-App Activation Modal
  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => {
      if (modalPlanTitle) modalPlanTitle.textContent = currentSelectedPlan.title;
      if (modalPlanPrice) modalPlanPrice.textContent = `₹${currentSelectedPlan.price}`;
      if (modal) modal.classList.add('open');
    });
  }

  // Close Modal
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      if (modal) modal.classList.remove('open');
    });
  }

  // Close on backdrop click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  }
});
