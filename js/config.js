/* Edite somente este objeto para configurar dados e contatos verificados. */

// Configuração central. Use somente dados reais e verificados na versão final.
window.PROFESSIONAL_CONFIG = Object.freeze({

  // Identidade e localização: aplicadas aos elementos com data-config no HTML.
  brand: 'HELENA VASCONCELOS',
  city: 'Brasília — DF',
  address: 'A definir na versão da profissional',
  hours: 'A consultar após configurar o contato',

  // Contato: vazio mantém a experiência demonstrativa. Informe país, DDD e número real.
  whatsapp: '', // Código do país + DDD + número, somente dígitos. Ex.: formato 55 + DDD + número real.

  // Texto inicial da conversa; será codificado automaticamente para a URL do WhatsApp.
  message: 'Olá! Gostaria de saber mais sobre o acompanhamento nutricional.',

  // Perfil autorizado. Deixe vazio para manter a indicação de redes sociais pendentes.
  instagram: '' // URL https://www.instagram.com/ do perfil autorizado.
});
