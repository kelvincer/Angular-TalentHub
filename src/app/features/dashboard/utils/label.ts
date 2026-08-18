import { Modality, VacancyStatus } from "../models/Vacancy";
import { Status } from "../models/Application";
import { InterviewStatus, InterviewType } from "../models/Interview";

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
  ACCEPTED: 'Aceptado',
  REJECTED: 'Rechazado',
};

export const INTERVIEW_TYPE_LABELS: Record<InterviewType, string> = {
  FONO: 'Telefónica',
  TECNICA: 'Técnica',
  RRHH: 'RRHH',
  FINAL: 'Final',
};

export const INTERVIEW_STATUS_LABELS: Record<InterviewStatus, string> = {
  PENDING: 'Pendiente',
  DONE: 'Realizada',
  CANCELLED: 'Cancelada',
};

export function applicationBadge(status: Status): string {
  switch (status) {
    case 'PENDING':
      return 'badge-info';
    case 'REVIEWED':
      return 'badge-warning';
    case 'INTERVIEW':
      return 'badge-secondary';
    case 'ACCEPTED':
      return 'badge-success';
    case 'REJECTED':
      return 'badge-error';
    default:
      return 'badge-ghost';
  }
}

export function interviewBadge(status: InterviewStatus): string {
  switch (status) {
    case 'PENDING':
      return 'badge-info';
    case 'DONE':
      return 'badge-success';
    case 'CANCELLED':
      return 'badge-ghost';
    default:
      return 'badge-ghost';
  }
}