import { Modality, VacancyStatus } from "../models/Vacancy";

export const MODALITY_LABELS: Record<Modality, string> = {
    PRESENCIAL: 'Presencial',
    REMOTO: 'Remoto',
    HIBRIDO: 'Híbrido',
};

export const VACANCY_STATUS_LABELS: Record<VacancyStatus, string> = {
  ACTIVE: 'Activa',
  PAUSED: 'En pausa',
  CLOSED: 'Cerrada',
};