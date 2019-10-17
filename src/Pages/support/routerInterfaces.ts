export interface OrganizationHomeMatchProps {
  organizationSlug: string;
}

export interface TournamentHomeMatchProps {
  tournamentSlug: string;
  organizationSlug: string;
}

export interface PhaseHomeMatchProps {
  tournamentSlug: string;
  organizationSlug: string;
  phaseId: string;
}
