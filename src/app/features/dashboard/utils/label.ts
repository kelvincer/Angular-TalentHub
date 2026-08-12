import { Modality, VacancyStatus } from "../models/Vacancy";
import { Status } from "../models/Application";

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

export const APPLICATION_STATUS_LABELS: Record<Status, string> = {
  PENDING: 'Pendiente',
  REVIEWED: 'En revisión',
  INTERVIEW: 'Entrevista',
  ACCEPTED: 'Aceptada',
  REJECTED: 'Rechazada',
};