import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-legal-notice',
  imports: [CommonModule],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss',
})
export class LegalNoticeComponent {
  private expandedArticles: { [key: number]: boolean } = {};

  toggleArticle(index: number): void {
    this.expandedArticles[index] = !this.expandedArticles[index];
  }

  isArticleExpanded(index: number): boolean {
    return this.expandedArticles[index] || false;
  }

  getArticleTitle(index: number): string {
    const titles: { [key: number]: string } = {
      1: 'Description du service',
      2: 'Conditions financières',
      3: 'Lancement de la prestation',
      4: 'Facturation',
      5: 'Garantie de remplacement',
      6: "Engagement de l'entreprise",
      7: 'Confidentialité et usage des données',
      8: 'Droit applicable',
      9: 'Acceptation des CGV',
    };
    return titles[index] || '';
  }

  getArticleContent(index: number): string {
    const contents: { [key: number]: string } = {
      1: `
        <div class="space-y-4">
          <p>Consult Collab Recrutement propose un service de mise en relation entre entreprises et freelances qualifiés, basés à l'étranger, disponibles pour un poste en télétravail à temps plein.</p>
          <div class="space-y-2">
            <p class="font-medium">Le service inclut :</p>
            <ol class="list-decimal pl-6 space-y-3">
              <li> <span class="font-bold underline">Analyse des besoins</span> : Identification des critères du poste et des compétences requises</li>
              <li>
              <span class="font-bold underline">Recherche ciblée et présélection</span> :
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>Recherche approfondie dans notre base de données internationale de freelances</li>
                  <li>Présélection et organisation d'un entretien anonyme via Google Meet sous 48 à 72 heures</li>
                </ul>
              </li>
              <li>
                <span class="font-bold underline">Mise en relation</span>
                 :
                <ul class="list-disc pl-6 mt-2 space-y-1">
                  <li>Présentation du freelance sélectionné pour validation par l'entreprise</li>
                  <li>Suivi initial après la mise en relation pour garantir la satisfaction</li>
                </ul>
              </li>
              <li> <span class="font-bold underline">Garantie d'ajustement</span>  : Possibilité de remplacement gratuit dans les 15 jours</li>
            </ol>
          </div>
        </div>
      `,
      2: `
        <ul class="space-y-2">
          <li>Frais de service pour la mise en relation réussie : 1 490 €</li>
          <li>Acompte pour le lancement de la recherche : 447 €</li>
          <li>TVA non applicable (article 293 B du CGI)</li>
          <li>Total : 1 490 €</li>
        </ul>
      `,
      3: `
        <p>Le service commence à réception de l'acompte de 447 €, accompagné de l'acceptation du devis signé.</p>
      `,
      4: `
        <ul class="space-y-2">
          <li>Le paiement de l'acompte de 447 € est requis avant le démarrage de la recherche.</li>
          <li>Une fois la mise en relation réussie confirmée, une facture finale de 1 043 € sera émise</li>
          <li>Le contact du freelance sera communiqué uniquement après réception du paiement intégral.</li>
          <li>Le règlement de la facture finale est exigé sous 7 jours suivant son émission.</li>
        </ul>
      `,
      5: `
        <ul class="space-y-2">
          <li>Si le freelance ne répond pas aux attentes de l'entreprise dans les 15 jours suivant le démarrage, un remplacement gratuit sera proposé.</li>
          <li>Aucun remboursement ne sera accordé</li>
        </ul>
      `,
      6: `
        <ul class="space-y-2">
          <li>L'entreprise contractualise directement avec le freelance pour un montant de 700 € par mois, conformément à l'accord établi lors de la mise en relation.</li>
          <li>Consult Collab Recrutement n'intervient pas dans le cadre du contrat entre l'entreprise et le freelance.</li>
        </ul>
      `,
      7: `
        <ul class="space-y-2">
          <li>Les informations échangées dans le cadre de la prestation sont strictement confidentielles.</li>
          <li>Consult Collab Recrutement s'engage à protéger les données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).</li>
        </ul>
      `,
      8: `
        <ul class="space-y-2">
          <li>Les présentes conditions générales de vente sont régies par le droit français.</li>
          <li>Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence des tribunaux français.</li>
        </ul>
      `,
      9: `
        <p>L'acceptation du devis implique l'adhésion pleine et entière aux présentes conditions générales de vente</p>
      `,
    };
    return contents[index] || '';
  }
}
