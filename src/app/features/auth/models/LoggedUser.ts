interface LoggedUser {
    email: string,
    password: string,
    role: 'Administrador' | 'Reclutador' | 'Candidato'
}