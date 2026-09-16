/**
 * NODIGITAL - SOLUÇÕES DE TI & MSP
 * Interatividade, Calculadora de Investimento MSP, Tabs e Modais
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initTabs();
  initCalculator();
  initModal();
  initSearch();
  initSmoothScroll();
});

/* ==========================================================================
   1. NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.ms-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   2. MOBILE DRAWER
   ========================================================================== */
function initMobileDrawer() {
  const openBtn = document.querySelector('.ms-menu-btn');
  const drawer = document.querySelector('.ms-mobile-drawer');
  const closeBtn = document.querySelector('.ms-drawer-close');

  if (!openBtn || !drawer) return;

  const toggleDrawer = (open) => {
    drawer.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  openBtn.addEventListener('click', () => toggleDrawer(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleDrawer(false));

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) toggleDrawer(false);
  });

  // Close when clicking nav links in mobile
  const links = drawer.querySelectorAll('a');
  links.forEach(l => {
    l.addEventListener('click', () => toggleDrawer(false));
  });
}

/* ==========================================================================
   3. SOLUTIONS TABS (Segmentos de Mercado)
   ========================================================================== */
function initTabs() {
  const tabButtons = document.querySelectorAll('.ms-tab-btn');
  const tabPanels = document.querySelectorAll('.ms-tab-panel');

  if (!tabButtons.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      // Update button active state
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panels
      tabPanels.forEach(p => {
        if (p.id === targetId) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   4. CALCULADORA INTERATIVA MSP (Estilo Azure Pricing Calculator)
   ========================================================================== */
function initCalculator() {
  const stationsInput = document.getElementById('calc-stations');
  const serversInput = document.getElementById('calc-servers');
  const firewallInput = document.getElementById('calc-firewall');
  const backupInput = document.getElementById('calc-backup');
  const aiDevInput = document.getElementById('calc-ai');
  const supportRadios = document.querySelectorAll('input[name="calc-support"]');

  const stationsVal = document.getElementById('val-stations');
  const serversVal = document.getElementById('val-servers');

  const sumStations = document.getElementById('sum-stations');
  const sumServers = document.getElementById('sum-servers');
  const sumFirewall = document.getElementById('sum-firewall');
  const sumBackup = document.getElementById('sum-backup');
  const sumAi = document.getElementById('sum-ai');
  const sumSla = document.getElementById('sum-sla');
  const totalPriceEl = document.getElementById('total-price');

  const proposalBtn = document.getElementById('btn-calculator-proposal');

  if (!stationsInput || !serversInput || !totalPriceEl) return;

  function calculate() {
    const stations = parseInt(stationsInput.value, 10) || 1;
    const servers = parseInt(serversInput.value, 10) || 0;
    const hasFirewall = firewallInput ? firewallInput.checked : false;
    const hasBackup = backupInput ? backupInput.checked : false;
    const hasAi = aiDevInput ? aiDevInput.checked : false;

    let is24x7 = false;
    supportRadios.forEach(r => {
      if (r.checked && r.value === '24x7') is24x7 = true;
    });

    // Update displayed values above sliders
    if (stationsVal) stationsVal.textContent = stations;
    if (serversVal) serversVal.textContent = servers;

    // Pricing formulas (MSP Industry Standard B2B Baseline in BRL)
    // - Stations: R$ 85/station (covers helpdesk, antivirus EDR, updates, inventory)
    // - Servers: R$ 320/server (Proxmox / Windows Server / Linux, AD, proactive monitoring)
    // - Firewall OPNSense UTM: R$ 450/month (VPNs, Suricata IDS/IPS, updates, rules)
    // - Cloud Backup Imutável 3-2-1: R$ 380/month (storage, ransomware proofing, drill tests)
    // - IA & Dev Continuous: R$ 850/month (custom automation, workflow bots, AI integration)
    // - 24/7 SLA multiplier: 1.25x

    const costStations = stations * 85;
    const costServers = servers * 320;
    const costFirewall = hasFirewall ? 450 : 0;
    const costBackup = hasBackup ? 380 : 0;
    const costAi = hasAi ? 850 : 0;

    let subtotal = costStations + costServers + costFirewall + costBackup + costAi;
    if (is24x7) {
      subtotal = Math.round(subtotal * 1.25);
    }

    // Minimum MSP engagement base
    if (subtotal < 850) subtotal = 850;

    // Update Summary list
    if (sumStations) sumStations.textContent = `${stations} un (R$ ${costStations.toLocaleString('pt-BR')})`;
    if (sumServers) sumServers.textContent = `${servers} un (R$ ${costServers.toLocaleString('pt-BR')})`;
    if (sumFirewall) sumFirewall.textContent = hasFirewall ? 'Sim (R$ 450)' : 'Não';
    if (sumBackup) sumBackup.textContent = hasBackup ? 'Sim (R$ 380)' : 'Não';
    if (sumAi) sumAi.textContent = hasAi ? 'Sim (R$ 850)' : 'Não';
    if (sumSla) sumSla.textContent = is24x7 ? 'NOC 24x7 (+25%)' : 'Comercial 8x5';

    totalPriceEl.textContent = `R$ ${subtotal.toLocaleString('pt-BR')}`;

    // Highlight option cards
    document.querySelectorAll('.ms-option-card').forEach(card => {
      const input = card.querySelector('input');
      if (input) {
        if (input.type === 'checkbox' || input.type === 'radio') {
          card.classList.toggle('selected', input.checked);
        }
      }
    });

    return {
      stations,
      servers,
      hasFirewall,
      hasBackup,
      hasAi,
      is24x7,
      subtotal
    };
  }

  // Attach event listeners
  [stationsInput, serversInput].forEach(slider => {
    slider.addEventListener('input', calculate);
  });

  [firewallInput, backupInput, aiDevInput].forEach(checkbox => {
    if (checkbox) checkbox.addEventListener('change', calculate);
  });

  supportRadios.forEach(radio => {
    radio.addEventListener('change', calculate);
  });

  // Make option cards clickable anywhere
  document.querySelectorAll('.ms-option-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') {
        const input = card.querySelector('input');
        if (input) {
          if (input.type === 'checkbox') {
            input.checked = !input.checked;
          } else if (input.type === 'radio') {
            input.checked = true;
          }
          calculate();
        }
      }
    });
  });

  // Handle CTA button in calculator
  if (proposalBtn) {
    proposalBtn.addEventListener('click', () => {
      const state = calculate();
      const modal = document.getElementById('contact-modal');
      const notesField = document.getElementById('form-notes');

      if (notesField) {
        notesField.value = `Simulação MSP:\n- Estações de trabalho: ${state.stations}\n- Servidores gerenciados: ${state.servers}\n- Firewall OPNSense UTM: ${state.hasFirewall ? 'Sim' : 'Não'}\n- Backup Nuvem Imutável: ${state.hasBackup ? 'Sim' : 'Não'}\n- Desenvolvimento IA: ${state.hasAi ? 'Sim' : 'Não'}\n- SLA: ${state.is24x7 ? '24x7' : '8x5'}\n- Estimativa Mensal: R$ ${state.subtotal.toLocaleString('pt-BR')}`;
      }

      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  calculate();
}

/* ==========================================================================
   5. MODAL (Contato & Diagnóstico de TI)
   ========================================================================== */
function initModal() {
  const modal = document.getElementById('contact-modal');
  const openButtons = document.querySelectorAll('.open-contact-modal');
  const closeBtn = document.querySelector('.ms-modal__close');
  const contactForm = document.getElementById('msp-contact-form');

  if (!modal) return;

  const openModal = () => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value || '';
      const email = document.getElementById('form-email')?.value || '';
      const phone = document.getElementById('form-phone')?.value || '';
      const company = document.getElementById('form-company')?.value || '';
      const service = document.getElementById('form-service')?.value || 'MSP Completo';
      const notes = document.getElementById('form-notes')?.value || '';

      const msg = `*Novo Contato - Nodigital Tech MSP*%0A%0A` +
        `*Nome:* ${encodeURIComponent(name)}%0A` +
        `*Empresa:* ${encodeURIComponent(company)}%0A` +
        `*E-mail:* ${encodeURIComponent(email)}%0A` +
        `*Telefone/WhatsApp:* ${encodeURIComponent(phone)}%0A` +
        `*Interesse:* ${encodeURIComponent(service)}%0A` +
        `*Detalhes:*%0A${encodeURIComponent(notes)}`;

      // Open WhatsApp with pre-formatted message
      const whatsappUrl = `https://api.whatsapp.com/send?phone=5511999999999&text=${msg}`;
      window.open(whatsappUrl, '_blank');

      alert('Obrigado pelo contato! Você será direcionado ao atendimento especializado da Nodigital.');
      closeModal();
      contactForm.reset();
    });
  }
}

/* ==========================================================================
   6. SEARCH DIALOG / QUICK FILTER
   ========================================================================== */
function initSearch() {
  const searchBtn = document.querySelector('.ms-search-trigger');
  if (!searchBtn) return;

  searchBtn.addEventListener('click', () => {
    const term = prompt('Pesquisar soluções Nodigital (ex: Proxmox, OPNSense, Windows, IA, Backup):');
    if (!term) return;

    const query = term.toLowerCase().trim();
    const cards = document.querySelectorAll('.ms-card, .ms-quick-item, .ms-spotlight');
    let matched = false;

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        if (!matched) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.style.outline = '3px solid #0078D4';
          setTimeout(() => { card.style.outline = ''; }, 3000);
          matched = true;
        }
      }
    });

    if (!matched) {
      alert(`Nenhum item específico encontrado para "${term}". Conheça todas as nossas soluções abaixo!`);
    }
  });
}

/* ==========================================================================
   7. SMOOTH SCROLL FOR IN-PAGE LINKS
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.startsWith('#!')) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
