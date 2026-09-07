/* ============================================================
   PHIN Outbreak System -- Main JavaScript
   ============================================================ */

// -- Toast System ----------------------------------------------
(function () {
  const icons = {
    success: '<i class="fa-solid fa-circle-check toast-icon" style="color:#10B981"></i>',
    danger:  '<i class="fa-solid fa-circle-xmark  toast-icon" style="color:#EF4444"></i>',
    warning: '<i class="fa-solid fa-triangle-exclamation toast-icon" style="color:#F59E0B"></i>',
    info:    '<i class="fa-solid fa-circle-info   toast-icon" style="color:#3B82F6"></i>',
  };

  function makeContainer() {
    let c = document.querySelector('.toast-container');
    if (!c) {
      c = document.createElement('div');
      c.className = 'toast-container';
      document.body.appendChild(c);
    }
    return c;
  }

  window.showToast = function (message, type = 'info', duration = 4000) {
    const container = makeContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      ${icons[type] || icons.info}
      <span>${message}</span>
      <button class="toast-close" onclick="dismissToast(this.parentElement)">&#x2715;</button>
    `;
    container.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => dismissToast(toast), duration);
    }
    return toast;
  };

  window.dismissToast = function (toast) {
    if (!toast) return;
    toast.style.animation = 'slideOutRight .3s ease forwards';
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };

  // Auto-convert flash messages to toasts on page load
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-flash-message]').forEach(el => {
      const msg  = el.dataset.flashMessage;
      const type = el.dataset.flashCategory || 'info';
      showToast(msg, type);
      el.remove();
    });
  });
})();

// -- Confirm Delete --------------------------------------------
function confirmDelete(formId, entityName) {
  if (confirm(`Are you sure you want to delete this ${entityName || 'item'}? This action cannot be undone.`)) {
    document.getElementById(formId).submit();
  }
}

// -- AOS Init --------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 500, easing: 'ease-out-cubic', once: true, offset: 40 });
  }

  // Sidebar active link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '/' && currentPath.startsWith(href)) {
      link.classList.add('active');
    } else if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // Dashboard only: animated counter
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    if (isNaN(target)) return;
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 25);
  });
});

// -- Mobile Sidebar Toggle -------------------------------------
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
}
