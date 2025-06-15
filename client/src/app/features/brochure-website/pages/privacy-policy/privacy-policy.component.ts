import {
  Component,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { FlyingPlusComponent } from '../../../../../assets/svg/templates/flying-plus/flying-plus.component';
import { PrivacyPolicyImageComponent } from '../../../../../assets/svg/templates/privacy-policy-image.component';

type TCondition = 'user' | 'services' | 'sponsorship';

type TConditionButton = {
  condition: TCondition;
  content: string;
};

type TConditions = {
  conditions: string[];
};

type TPrivacyPolicyDynamicContent = {
  [Key in TCondition]: TConditions;
};

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [FlyingPlusComponent, PrivacyPolicyImageComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent {
  conditionButtons: TConditionButton[] = [
    {
      condition: 'user',
      content: 'Conditions générale d’utilisation de VENDIIKO',
    },

    {
      condition: 'services',
      content: 'Conditions Générales de Prestations de Service ',
    },

    {
      condition: 'sponsorship',
      content: 'Conditions Générales de Parrainage',
    },
  ];

  privacyPolicyDynamicContent: TPrivacyPolicyDynamicContent = {
    user: {
      conditions: [
        "1. Introduction Bienvenue sur VENDIIKO, la plateforme de gestion d'entreprise en ligne qui transforme et simplifie la manière dont les entrepreneurs gèrent et développent leurs activités. L'utilisation de VENDIIKO est régie par les présentes Conditions Générales d'Utilisation (CGU).",
        "2. Acceptation des Conditions En accédant ou en utilisant notre plateforme, vous acceptez d'être lié par ces CGU. Si vous n'acceptez pas les termes de ces CGU, vous ne devez pas accéder ou utiliser VENDIIKO.",
        '3. Modification des Conditions VENDIIKO se réserve le droit de modifier ou de remplacer ces CGU à tout moment. Il est de votre responsabilité de consulter régulièrement ces CGU pour vous tenir informé des changements.',
        '4. Comptes Utilisateurs Pour accéder à certaines fonctionnalités de la plateforme, vous devrez créer un compte. Vous vous engagez à fournir des informations exactes et à jour lors de la création de votre compte et à maintenir la sécurité de votre mot de passe.',
        "5. Utilisation de la Plateforme Vous vous engagez à utiliser VENDIIKO uniquement à des fins légales et de manière à ne pas compromettre le fonctionnement de la plateforme, sa disponibilité pour les autres utilisateurs, ou l'intégrité et la sécurité des informations qu'elle contient.",
        "6. Propriété Intellectuelle Tous les droits de propriété intellectuelle relatifs à la plateforme et à son contenu appartiennent à VENDIIKO ou à ses concédants  de licence. Aucun droit n'est transféré à vous, sauf pour une utilisation conforme à ces CGU.",
        "7. Limitation de Responsabilité Dans la mesure permise par la loi, VENDIIKO ne sera pas responsable des dommages indirects, spéciaux, accessoires ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser la plateforme.",
        '8. Politique de Confidentialité Veuillez consulter notre Politique de Confidentialité pour comprendre comment nous collectons, utilisons et partageons vos données personnelles.',
        '9. Résiliation [Nom de la Plateforme] peut résilier ou suspendre votre accès à la plateforme à tout moment, sans préavis, pour toute violation de ces CGU.',
        '10. Droit Applicable et Résolution des Litiges Ces CGU sont régies par les lois du MAROC. Tout litige découlant de ou en relation avec ces CGU sera soumis à la juridiction exclusive des tribunaux du MAROC.',
        '11. Contact Pour toute question relative à ces CGU, veuillez nous contacter à contact@vendiiko.com.',
      ],
    },

    services: {
      conditions: [
        "1. Objet Les présentes Conditions Générales de Prestations de Service (ci-après dénommées 'CGPS') ont pour objet de définir les conditions dans lesquelles VENDIIKO (ci-après dénommée 'le Prestataire') fournit des services de gestion d'entreprise en ligne aux utilisateurs inscrits (ci-après dénommés 'le Client').",
        '2. Services Fournis Le Prestataire propose au Client les services suivants :  gestion de la comptabilité, facturation, gestion de projet, CRM, etc.]. Les détails et les limites de chaque service sont décrits sur le site web de la plateforme ou dans des annexes spécifiques.',
        "3. Accès aux Services L'accès aux services est conditionné par l'inscription du Client sur la plateforme et l'acceptation des présentes CGPS. Le Client est responsable de la confidentialité de ses identifiants de connexion.",
        '4. Tarification et Paiement Les tarifs des services sont indiqués sur la plateforme. Le Prestataire se réserve le droit de modifier les tarifs après en avoir informé le Client. Les paiements sont effectués selon les modalités définies lors de la souscription au service.',
        "5. Obligations du Prestataire Le Prestataire s'engage à fournir les services avec diligence et conformément aux bonnes pratiques, en tenant compte des standards de l'industrie.",
        "6. Obligations du Client Le Client s'engage à utiliser les services conformément aux instructions du Prestataire et à ne pas utiliser la plateforme à des fins illicites.",
        "7. Propriété Intellectuelle Le Prestataire conserve la propriété de tous les droits de propriété intellectuelle relatifs aux services fournis. Le Client obtient un droit d'utilisation non exclusif et non transférable pour utiliser la plateforme et les services associés.",
        '8. Responsabilité La responsabilité du Prestataire en cas de défaillance des services est limitée aux conditions définies dans les présentes CGPS et ne saurait excéder le montant payé par le Client pour les services concernés.',
        '9. Force Majeure Le Prestataire ne sera pas tenu responsable de la non-exécution totale ou partielle de ses obligations, si cette non-exécution est due à un événement de force majeure.',
        "10. Résiliation Les présentes CGPS peuvent être résiliées par l'une ou l'autre des parties sous réserve du respect des conditions de préavis et des modalités définies dans les présentes CGPS.",
        '11. Droit Applicable et Litiges Les présentes CGPS sont soumises au droit du [Pays/Juridiction]. Tout litige relatif à leur interprétation ou à leur exécution sera soumis aux tribunaux compétents du [Pays/Juridiction].',
        "12. Dispositions Générales Si une partie des CGPS est jugée invalide ou inapplicable, les autres dispositions restent en vigueur. Les présentes CGPS constituent l'intégralité de l'accord entre le Client et le Prestataire concernant les services fournis.",
        '13. Contact Pour toute question relative aux présentes CGPS, veuillez contacter [Nom de la Plateforme] à [Adresse Email].',
      ],
    },
    sponsorship: {
      conditions: [
        "1. Introduction Le programme de parrainage de [Nom de la Plateforme] (ci-après dénommé 'le Programme') permet aux utilisateurs inscrits (ci-après dénommés 'le Parrain') de recommander nos services à de nouveaux clients potentiels (ci-après dénommés 'le Filleul') et de recevoir des récompenses pour chaque nouveau client effectivement acquis grâce à leur recommandation.",
        "2. Éligibilité au Programme Pour être éligible au Programme, le Parrain doit être un utilisateur actif avec un compte en règle sur [Nom de la Plateforme]. Le Filleul doit être un nouveau client qui n'a pas précédemment détenu de compte sur la plateforme.",
        "3. Comment Parrainer Le Parrain peut inviter des Filleuls en partageant un lien de parrainage unique fourni par [Nom de la Plateforme]. Le Filleul doit s'inscrire en utilisant ce lien pour que le parrainage soit valide.",
        "4. Récompenses de Parrainage Les récompenses peuvent inclure des remises, des crédits de service, ou d'autres avantages définis par [Nom de la Plateforme]. Les détails des récompenses seront communiqués au Parrain au moment de l'invitation du Filleul.",
        "5. Conditions d'Attribution des Récompenses Les récompenses sont attribuées au Parrain uniquement après que le Filleul a effectué un achat qualifiant ou a satisfait aux critères d'activation définis par [Nom de la Plateforme].",
        "6. Limitations Il peut y avoir des limites au nombre de Filleuls qu'un Parrain peut inviter ou aux récompenses qu'il peut recevoir. Ces limites seront communiquées dans le cadre du Programme.",
        '7. Durée et Modification du Programme [Nom de la Plateforme] se réserve le droit de modifier, suspendre ou terminer le Programme à tout moment, avec ou sans préavis.',
        "8. Fraude et Abus Toute activité frauduleuse ou abusive liée au Programme peut entraîner l'annulation des récompenses et la résiliation du compte du Parrain.",
        '9. Responsabilité [Nom de la Plateforme] ne peut être tenue responsable des pertes ou dommages résultant de la participation au Programme.',
        "10. Acceptation des Conditions La participation au Programme implique l'acceptation de ces conditions générales de parrainage.",
        '11. Contact Pour toute question relative au Programme de parrainage, veuillez contacter [Nom de la Plateforme] à [Adresse Email].',
      ],
    },
  };

  currentCondition: WritableSignal<TCondition> = signal('user');
  currentConditionsContent: Signal<TConditions> = computed(
    () => this.privacyPolicyDynamicContent[this.currentCondition()],
  );
}
