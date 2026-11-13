import { initMonitoring } from "./monitoring";

/**
 * Side-effect импорт в main.tsx: модули выполняются раньше тела main.tsx,
 * а роутер создаётся при импорте App — мониторинг должен подняться до него
 */
initMonitoring();
