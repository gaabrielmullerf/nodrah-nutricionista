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

  // Mede as seções retidas ao redimensionar. A sobreposição acompanha a rolagem via CSS.
  // Se o conteúdo superar a tela (mobile/zoom), deixa mostrar tudo antes de reter.
  const hero = document.querySelector('.hero');
  const connection = document.querySelector('.connection-section');
  const videoLayer = document.querySelector('.video-layer');
  const layers = [...document.querySelectorAll('.section-layer')];
  const header = document.querySelector('.header');
  function updateHeroInset() {
    const viewportHeight = window.innerHeight;
    const top = Math.min(header.offsetHeight, viewportHeight - hero.offsetHeight);
    hero.style.setProperty('--hero-sticky-top', `${top}px`);
    const connectionTop = Math.min(header.offsetHeight, viewportHeight - connection.offsetHeight);
    connection.style.setProperty('--connection-sticky-top', `${connectionTop}px`);
    const videoTop = Math.min(header.offsetHeight, viewportHeight - videoLayer.offsetHeight);
    videoLayer.style.setProperty('--video-layer-top', `${videoTop}px`);
  }
  updateHeroInset();
  if ('ResizeObserver' in window) {
    const heroObserver = new ResizeObserver(updateHeroInset);
    heroObserver.observe(hero);
    heroObserver.observe(connection);
    heroObserver.observe(videoLayer);
    heroObserver.observe(header);
  }
  window.addEventListener('resize', updateHeroInset, { passive: true });

  // Controle da faixa: permite interromper a rolagem automática a qualquer momento.
  const valuesStrip = document.querySelector('.values-strip');
  const valuesPause = document.querySelector('.values-pause');
  valuesPause.addEventListener('click', () => {
    const paused = valuesStrip.classList.toggle('is-paused');
    valuesPause.setAttribute('aria-pressed', String(paused));
    valuesPause.setAttribute('aria-label', paused ? 'Retomar rolagem da faixa' : 'Pausar rolagem da faixa');
    valuesPause.textContent = paused ? 'Retomar' : 'Pausar';
  });

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

  // Considera também a seção seguinte, que pode estar cobrindo a camada sticky.
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const reveals = [...document.querySelectorAll('.reveal')];
  const panels = [connection, ...layers];
  let revealTimer;
  let revealFrame;
  function updateReveals(allowEntry) {
    const viewport = window.innerHeight;
    const upperEdge = header.getBoundingClientRect().bottom;
    const bounds = panels.map(panel => panel.getBoundingClientRect());
    reveals.forEach(el => {
      if (motion.matches) {
        el.classList.remove('waiting');
        return;
      }
      const panel = el.closest('.section-layer, .connection-section');
      const index = panels.indexOf(panel);
      const rect = el.getBoundingClientRect();
      const lowerEdge = index >= 0 && bounds[index + 1]
        ? Math.min(viewport, bounds[index + 1].top) : viewport;
      const visible = Math.max(0, Math.min(rect.bottom, lowerEdge) - Math.max(rect.top, upperEdge));
      const needed = Math.min(el.offsetHeight, viewport - upperEdge) * .5;
      const settled = index < 0 || bounds[index].top <= upperEdge + (viewport - upperEdge) * .3;
      if (visible < needed || !settled) el.classList.add('waiting');
      else if (allowEntry) el.classList.remove('waiting');
    });
  }
  function scheduleReveals() {
    if (!revealFrame) revealFrame = requestAnimationFrame(() => {
      updateReveals(false);
      revealFrame = null;
    });
    clearTimeout(revealTimer);
    revealTimer = setTimeout(() => updateReveals(true), 140);
  }
  updateReveals(true);
  window.addEventListener('scroll', scheduleReveals, { passive: true });
  window.addEventListener('resize', scheduleReveals, { passive: true });
  motion.addEventListener('change', () => updateReveals(true));
})();
