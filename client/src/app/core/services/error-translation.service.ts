import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorTranslationService {
  private errorTranslations: { [key: string]: string } = {
    'Email already registered':
      "Cet email appartient déjà à quelqu'un d'autre ",
    'Invalid file type. Allowed types: PNG, JPG, JPEG, PDF':
      'Vous ne pouvez que de fichier de type: PNG, JPG, JPEG, PDF',
  };

  translateError(errorMessage: string): string {
    return (
      this.errorTranslations[errorMessage] ||
      'Une erreur est survenue. Veuillez réessayer.'
    );
  }
}
