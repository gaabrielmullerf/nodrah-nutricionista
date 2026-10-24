(() => {
  'use strict';

  // Configuração: os dados editáveis ficam em js/config.js, carregado antes deste arquivo.
  const config = window.PROFESSIONAL_CONFIG || {};

  // Preenche elementos cujo data-config corresponde a uma chave da configuração.
  document.querySelectorAll('[data-config]').forEach(el => {
    const value = config[el.dataset.config];
    if (typeof value === 'string' && value.trim()) el.textContent = value;
  });

  // Menu mobile: referências ao botão e ao painel de navegação.
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#nav');

  // Mantém o estado visual e os atributos de acessibilidade sincronizados.
  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    nav.classList.remove('open');
  }

  // Alterna a abertura do menu ao tocar ou ativar o botão pelo teclado.
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('open', open);
  });

  // Fecha ao navegar, pressionar Escape, clicar fora ou voltar à largura desktop.
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.header')) closeMenu();
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);

  // Agendamento: aceita um número internacional configurado ou usa o modal demonstrativo.
  const dialog = document.querySelector('#booking-dialog');
  const number = String(config.whatsapp || '').replace(/\D/g, '');
  const ready = /^\d{10,15}$/.test(number);

  // Conecta todos os CTAs. Links válidos abrem o WhatsApp; botões recebem ação equivalente.
  document.querySelectorAll('[data-book]').forEach(el => {
    if (ready && el.tagName === 'A') {
      el.href = `https://wa.me/${number}?text=${encodeURIComponent(config.message || '')}`;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    }
    el.addEventListener('click', e => {
      if (ready) {
        if (el.tagName !== 'A') window.open(`https://wa.me/${number}?text=${encodeURIComponent(config.message || '')}`, '_blank', 'noopener,noreferrer');
        return;
      }
      e.preventDefault();
      closeMenu();
      dialog.showModal();
    });
  });

  // Atualiza a indicação abaixo do CTA quando existe contato configurado.
  if (ready) document.querySelector('.booking-note').textContent = 'Converse pelo WhatsApp para consultar a disponibilidade.';

  // Fecha o modal pelos controles internos ou por clique na área externa.
  document.querySelectorAll('.dialog-close, #dialog-ok').forEach(el => el.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', e => {
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  });

  // Instagram: exibe somente uma URL HTTPS do domínio instagram.com.
  try {
    const url = new URL(config.instagram);
    if (url.protocol === 'https:' && /(^|\.)instagram\.com$/.test(url.hostname)) {
      const link = document.querySelector('#social-link');
      link.href = url.href;
      link.hidden = false;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.querySelector('#social-placeholder').hidden = true;
    }
  } catch {
    /* Sem rede social configurada. */
  }

  // Entradas sutis: respeita movimento reduzido e mantém conteúdo visível sem suporte ao observador.
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('waiting');
        observer.unobserve(entry.target);
      }
    }), {
      threshold: 0.08
    });
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('waiting');
      observer.observe(el);
    });
  }
})();
